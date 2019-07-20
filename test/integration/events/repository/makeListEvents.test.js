const { makeListEvents, makeListEventsFor } = require('../../../../src/events/repository')
const db = require('../../../../db')

afterAll(() => db.destroy())
describe('makeListEvents()', () => {
    it('should return a function', () => {
        const listEvents = makeListEvents()

        expect(typeof listEvents).toBe('function')
    })

    describe('listEvents()', () => {
        beforeEach(async () => {
            await db('event').insert({ title: 'Um evento', at_date: '2050-01-30', description: 'Um evento de teste' })
        })
        afterEach(async () => {
            await db('event').truncate()
        })

        it('should get a list of events', async () => {
            const listEvents = makeListEvents(db)
            const events = await listEvents()

            expect(Array.isArray(events)).toBe(true)
            expect(events.length).toBe(1)
            expect(events[0].title).toBe('Um evento')
            expect(events[0].at_date.getDate()).toBe(30) // ????
            expect(events[0].at_date.getMonth()).toBe(0) // ?????
            expect(events[0].at_date.getFullYear()).toBe(2050)
            expect(events[0].description).toBe('Um evento de teste')
        })
    })
})

describe('makeListEventsFor()', () => {
    describe('listEventsFor()', () => {
        beforeEach(async () => {
            await db('event').insert(
                [{ title: 'Um evento', at_date: '2050-01-30', description: 'Um evento de teste' },
                 { title: 'Outro evento', at_date: new Date(), description: 'Outro evento de teste' },])
        })
        afterEach(async () => {
            await db('event').truncate()
        })

        it('should get a list with one event', async () => {
            const listEventsFor = makeListEventsFor(db)
            const events = await listEventsFor(new Date())

            expect(Array.isArray(events)).toBe(true)
            expect(events.length).toBe(1)
            expect(events[0].title).toBe('Outro evento')
            expect(events[0].at_date.getDate()).toBe((new Date()).getDate()) // ????
            expect(events[0].at_date.getMonth()).toBe((new Date()).getMonth()) // ?????
            expect(events[0].at_date.getFullYear()).toBe((new Date()).getFullYear())
            expect(events[0].description).toBe('Outro evento de teste')
        })
    })
})