const { makeCreateEvent } = require('../../../../src/events/repository')
const { Event, mapDbRecordToEvent } = require('../../../../src/events/event')
const db = require('../../../../db')
afterAll(() => db.destroy())

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
            const createEvent = makeCreateEvent(db, Event.validate, mapDbRecordToEvent)
            const event = new Event({ title: 'Teste', date: new Date(2020,1,1), description: 'Testando' })
            const createdEvent = await createEvent(event)
        
            expect(createdEvent.id).toBe(1)
        })
    })
})

