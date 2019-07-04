const { makeCreateEvent } = require('../src/repository')
const db = require('../db')

describe('makeCreateEvent()', () => {
    it('should return a function', () => {
        const createEvent = makeCreateEvent()

        expect(typeof createEvent).toBe('function')
    })

    describe('createEvent()', () => {
        afterEach(async () => {
            await db('event').truncate()
        })

        it('should persist an event in database', async () => {
            const createEvent = makeCreateEvent(db)
            const event = { title: 'Teste', date: '2020-01-01', description: 'Testando' }
            const createdEvent = await createEvent(event)
        
            expect(createdEvent[0]).toBe(1)
        })
    })
})