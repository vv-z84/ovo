const getEvents = (findEvents) => async () => {
    const events = await findEvents()

    return events
}

const getEventsFor = (findTodayEvents) => async () => {
    const events = await findTodayEvents()
    return events
}

module.exports = { getEvents, getEventsFor }