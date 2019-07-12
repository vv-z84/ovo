const express = require('express')

const App = express()
const eventsRouter = require('./events/routes')

App.use(express.json())
App.use(eventsRouter)

module.exports = { App }