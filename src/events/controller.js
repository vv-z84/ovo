const getEvents = (findEvents) => async () => {
    const events = await findEvents()

    return events
}

const getEventsFor = (listEvents) => async (day) => {
    const events = await listEvents(day)
    return events
}

module.exports = { getEvents, getEventsFor }