const { makeAddEvent } = require('../../src/events/services')

describe('makeAddEvent()', () => {
    it('should return a function', () => {
        const addEvent = makeAddEvent()
        expect(typeof addEvent).toBe('function')
    })

    describe('addEvent()', () => {
        it('should create an event when date is valid', async () => {
            const createEventMock = jest.fn(({ title, date, description }) => {
                return { id: 123, title, date, description }
            })

            const validateEventDateMock = jest.fn((date) => {
                return { error: false, value: date }
            })

            const addEvent = makeAddEvent(createEventMock, validateEventDateMock)
            const { error, value } = await addEvent({ title: 'Teste', date: '2010-01-01', description: 'Testando'})

            expect(error).toBe(false)
            expect(value.id).toBe(123)
        })
    })    
})
