const { App } = require('../../../src/app')
const request = require('supertest')(App)
const { clearEventsTable, db } = require('../../helpers')

describe('GET /events', () => {
    afterEach(async () => {
        await clearEventsTable()
    })

    afterAll(() => {
        db.destroy()
    })

    it('should create an event', async () => {
        await request
            .post('/events')
            .send({ title: 'Post Teste', date: '2100-01-01', description: 'Testando Post' })
            .expect(201)
    })
})