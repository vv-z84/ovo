const { makeAddEvent } = require('../../src/events/services')
const { Event } = require('../../src/events/event')

describe('makeAddEvent()', () => {
    it('should return a function', () => {
        const addEvent = makeAddEvent()
        expect(typeof addEvent).toBe('function')
    })

    describe('addEvent()', () => {
        it('should create an event when date is valid', async () => {
            const createEventMock = jest.fn(({ title, date, description }) => {
                return new Event({ id: 123, title, date, description })
            })

            const validateEventDateMock = jest.fn((date) => {
                return { valid: true }
            })

            const addEvent = makeAddEvent(createEventMock, validateEventDateMock)
            const { error, value } = await addEvent({ title: 'Teste', date: '2010-01-01', description: 'Testando'})

            expect(error).toBe(false)
            expect(value.id).toBe(123)
        })

        it('should not create an event when missing title', async () => {
            const createEventMock = jest.fn(({ title, date, description }) => {
                return new Event({ id: 123, title, date, description })
            })

            const validateEventDateMock = jest.fn((date) => {
                return { valid: true }
            })

            const addEvent = makeAddEvent(createEventMock, validateEventDateMock)
            const { error, value } = await addEvent({ title: '', date: '2010-01-01', description: 'Testando'})

            expect(error instanceof Error).toBe(true)
            expect(value).toBe(null)
        })

        it('should not create an event when missing description', async () => {
            const createEventMock = jest.fn(({ title, date, description }) => {
                return new Event({ id: 123, title, date, description })
            })

            const validateEventDateMock = jest.fn((date) => {
                return { valid: true  }
            })

            const addEvent = makeAddEvent(createEventMock, validateEventDateMock)
            const { error, value } = await addEvent({ title: 'Teste', date: '2010-01-01', description: ''})

            expect(error instanceof Error).toBe(true)
            expect(value).toBe(null)
        })
    })    
})
