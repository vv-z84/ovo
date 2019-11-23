module.exports = {
    makeCreateEvent: (db, validateEvent, mapToEvent) => async (event) => {
        const { valid, errors } = validateEvent(event)

        if(valid) {
            const { title, date, description } = event
            const result = await db('event')
                .returning(['id', 'title', 'at_date', 'description'])
                .insert({ title, at_date: date, description })

            return mapToEvent(result[0])
        }
        throw new Error(errors[0].message)
    },
    makeListEvents: (db) => async () => {
        return await db('event')
            .select()
    },
    makeListEventsFor: (db) => async (day) => {
        return await db('event')
            .select()
            .where('at_date', day)
    },
    makeDeleteEvent: (db) => async (event) => {
        return await db('event').where('id', event.id).delete()
    }
}