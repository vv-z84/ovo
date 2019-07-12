const { App } = require('../../../src/app')
const request = require('supertest')(App)
const { seedEventsTable, clearEventsTable, db } = require('../../helpers')

describe('GET /events', () => {
    beforeEach(async () => {
        await seedEventsTable()

    })

    afterEach(async () => {
        await clearEventsTable()
    })

    afterAll(() => {
        db.destroy()
    })

    it('should return a list of events', async () => {
        const response = await request.get('/events').expect(200)
        expect(response.body.length).toBe(2)
    })

    it('should return a list of events for today', async () => {
        const response = await request.get('/events?type=today').expect(200)
        expect(response.body.length).toBe(1)
    })
})