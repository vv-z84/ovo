module.exports = {
    makeCreateEvent: (db) => async ({ title, date, description }) => {
        const result = await db('event')
            .returning(['id', 'title', 'at_date', 'description'])
            .insert({ title, at_date: date, description })

        return result[0]
    },
    makeListEvents: (db) => async () => {
        return await db('event')
            .select()
    },
    makeListEventsFor: (db) => async (day) => {
        return await db('event')
            .select()
            .where('at_date', day)
    }
}