const express = require('express')
const router = express.Router()
const {
    makeAddEvent,
    makeFindEvents,
    makeFindTodayEvents,
    validateEventDate
} = require('./services')
const {
    makeListEvents,
    makeListEventsFor,
    makeCreateEvent
} = require('./repository')
const database = require('../../db')

router.get('/events', (req, res, next) => {
    if(req.query.type && req.query.type === 'today') {
        const findTodayEvents = makeFindTodayEvents(makeListEventsFor(database))
        findTodayEvents()
            .then(result => {
                const { error, value } = result
                if(error)
                    next(error)

                res.send(value)
            })
    }
    else {
        const findEvents = makeFindEvents(makeListEvents(database))
        findEvents()
            .then(result => {
                const { error, value } = result
                if(error)
                    next(error)

                res.send(value)
            })
    }
})

router.post('/events', (req, res, next) => {
    const { title, date, description } = req.body
    const addEvent = makeAddEvent(makeCreateEvent(database), validateEventDate)

    addEvent({ title, date, description })
        .then(result => {
            const { error, value } = result

            if(error)
                next(error)

            res.status(201).send(value)
        })
})

router.delete('/events/:id', (req, res, next) => {
    const id = req.params.id

    deleteEvent(id)
        .then(result => {
            const { error, value } = result

            if(error)
                next(error)

            res.status(200).send()
        })
})

module.exports = router