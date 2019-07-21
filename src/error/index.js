class AppError extends Error {
    constructor(code, message) {
        super(message)
        this.code = code
        Error.captureStackTrace(this)
    }
}

class InvalidDateError extends AppError {
    constructor() {
        super('ERR_INVALID_DATE', 'The date is not valid')
    }
}

class DateIsTodayError extends AppError {
    constructor() {
        super('ERR_DATE_IS_TODAY', 'The date of the event can\'t be today.')
    }
}

class DateHasAlreadyPassedError extends AppError {
    constructor() {
        super('ERR_DATE_HAS_ALREADY_PASSED', 'The date of the event has already passed.')
    }
}

module.exports = { AppError, InvalidDateError, DateIsTodayError, DateHasAlreadyPassedError }