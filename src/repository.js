module.exports = {
    makeCreateEvent: (db) => ({ title, date, description }) => {
        return db('event')
            .returning('id')
            .insert({ title, at_date: date, description })
    },
    makeListEvents: (db) => () => {
        return db('event')
            .select()
    }
}