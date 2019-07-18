const { parseISO, isBefore, isValid } = require('date-fns')

const validateEventDate = (date) => {
    const parsedDate = parseISO(date)

    if(!isValid(parsedDate))
        return { error: true, value: date }

    if(isBefore(parsedDate, new Date()))
        return { error: true, value: date }
        
    return { error: false, value: date }
}

const makeAddEvent = (createEvent, validateEventDate) => async ({ title, date, description }) => {
    const { error, value } = validateEventDate(date)

    if(error)
        return { error, value }

    const createdEvent = await createEvent({ title, date, description })

    if(createdEvent)
        return { error: false, value: createdEvent }
}

const makeFindTodayEvents = (listEventsFor) => async () => {
    const todayEvents = await listEventsFor(new Date())
    
    return { error: false, value: todayEvents }
}

const makeFindEvents = (listEvents) => async () => {
    const events = await listEvents()
    
    return { error: false, value: events }
}

const makeDeleteEvent = (deleteEvent) => async (id) => {
    if(id === undefined || Number.isNaN(id))
        return { error: true, value: null }
        
    const result = await deleteEvent(id)

    return { error: false, value: result }
}

module.exports = { validateEventDate, makeAddEvent, makeFindTodayEvents, makeFindEvents, makeDeleteEvent }