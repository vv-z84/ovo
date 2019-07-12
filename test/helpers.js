const db = require('../db')

const seedEventsTable = () => {
    return db('event')
        .returning('id')
        .insert([
            { title: 'Evento 1', at_date: '2018-01-01', description: 'O evento 1' },
            { title: 'Evento 2', at_date: new Date(), description: 'O evento 2' }])
}

const clearEventsTable = () => {
    return db('event')
        .truncate()
}

module.exports = { seedEventsTable, clearEventsTable, db }