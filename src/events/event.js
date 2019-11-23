const { attributes } = require('structure')

const Event = attributes({
    id: Number,
    title: { type: String, empty: false },
    date: Date,
    description: String
})(class Event {})

const mapDbRecordToEvent = ({ id, title, at_date, description }) => new Event({ id, title, date: at_date, description })

module.exports = { Event: Event, mapDbRecordToEvent }
