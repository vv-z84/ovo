const { makeAddEvent } = require('../../src/events/services')

describe('makeAddEvent()', () => {
    it('should return a function', () => {
        const addEvent = makeAddEvent()
        expect(typeof addEvent).toBe('function')
    })

    describe('addEvent()', () => {
        it('should create an event when date is valid', () => {
            const createEventMock = jest.fn(({ title, date, description }) => {
                return { id: 123, title, date, description }
            })

            const validateEventDateMock = jest.fn((date) => {
                return { error: false, value: date }
            })

            const addEvent = makeAddEvent(createEventMock, validateEventDateMock)
            const { error, value } = addEvent({ title: 'Teste', date: '2010-01-01', description: 'Testando'})

            expect(error).toBe(false)
            expect(value.id).toBe(123)
        })

        it('should not call createEvent if the date is invalid', () => {
            const createEventMock = jest.fn(({ title, date, description }) => {
                return { id: 456, title, date, description }
            })

            const validateEventDateMock = jest.fn((date) => {
                return { error: true, value: date }
            })

            const addEvent = makeAddEvent(createEventMock, validateEventDateMock)

            addEvent({ title: 'Teste', date: '2010-01-01', description: 'Testando'})
            expect(createEventMock).not.toBeCalled()
        })
    })    
})
