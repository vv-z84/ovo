const { parseISO, isBefore, isValid, isToday } = require('date-fns')
const errors = require('../error')

const validateEventDate = (date) => {
    const parsedDate = parseISO(date)

    if(!isValid(parsedDate))
        return { valid: false, error: new errors.InvalidDateError() }

    if(isToday(parsedDate))
        return { valid: false, error: new errors.DateIsTodayError}
    
    if(isBefore(parsedDate, new Date()))
        return { valid: false, error: new errors.DateHasAlreadyPassedError() }
        
    return { valid: true }
}

const makeAddEvent = (createEvent, validateEventDate) => async ({ title, date, description }) => {
    const { valid, error } = validateEventDate(date)
    if(!valid)
        return { error, value: null }

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