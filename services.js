const { parse, isBefore } = require('date-fns')

const validateEventDate = (date) => {
    const parsedDate = parse(date, new Date())

    if(isBefore(parsedDate, new Date()))
        return { error: true, value: date }
    return { error: false, value: date }
}

const makeAddEvent = (createEvent) => ({ title, date, description }) => {
    const { error, value } = validateEventDate(date)

    if(error)
        return { error, value }

    return createEvent({ title, date, description })
}

module.exports.makeAddEvent = makeAddEvent