module.exports = {
    makeCreateEvent: (db) => async ({ title, date, description }) => {
        const result = await db('event')
            .returning(['id', 'title', 'at_date', 'description'])
            .insert({ title, at_date: date, description })

        return result[0]
    },
    makeListEvents: (db) => () => {
        return db('event')
            .select()
    }
}