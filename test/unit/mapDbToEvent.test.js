const { mapDbRecordToEvent, Event } = require('../../src/events/event')

describe('mapDbRecordToEvent()', () => {
    it('should return an object of class Event', () => {
        const sample = { id: 1, title: 'The Title', at_date: new Date(), description: 'Description' }
        const event = mapDbRecordToEvent(sample)

        expect(event).toBeInstanceOf(Event)
        expect(event.id).toBe(sample.id)
        expect(event.description).toBe(sample.description)
        expect(event.date.valueOf()).toBe(sample.at_date.valueOf())
    })
})