const { parseISO, isBefore, isValid, isToday } = require('date-fns')
const { Event } = require('./event')
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

// {} -> Event 
const makeAddEvent = (createEvent, validateEventDate) => async (event) => {
    try {
        const { valid, error } = validateEventDate(date)

        if(!valid) throw error

        const createdEvent = await createEvent(event)
        return { error: false, value: createdEvent }
    }
    catch(err) {
        return { error: err }
    }
}

const makeFindTodayEvents = (listEventsFor) => async () => {
    const todayEvents = await listEventsFor(new Date())
    
    return { error: false, value: todayEvents }
}

const makeFindEvents = (listEvents) => async () => {
    const events = await listEvents()
    
    return { error: false, value: events }
}

const makeDeleteEvent = (deleteEvent) => async (event) => {
    const result = await deleteEvent(event)

    return { error: false, value: result }
}

module.exports = { validateEventDate, makeAddEvent, makeFindTodayEvents, makeFindEvents, makeDeleteEvent }