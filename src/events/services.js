const { parseISO, isBefore, isValid } = require('date-fns')

const validateEventDate = (date) => {
    const parsedDate = parseISO(date)

    if(!isValid(parsedDate))
        return { error: true, value: date }

    if(isBefore(parsedDate, new Date()))
        return { error: true, value: date }
        
    return { error: false, value: date }
}

const makeAddEvent = (createEvent, validateEventDate) => ({ title, date, description }) => {
    const { error, value } = validateEventDate(date)

    if(error)
        return { error, value }

    const createdEvent = createEvent({ title, date, description })

    if(createdEvent)
        return { error: false, value: createdEvent }
}

module.exports = { validateEventDate, makeAddEvent }