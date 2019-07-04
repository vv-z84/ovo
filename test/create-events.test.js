const { makeCreateEvent } = require('../src/repository')

describe('makeCreateEvent()', () => {
    it('should create createEvent()', async () => {
        const createEvent = makeCreateEvent()
        const event = { title: 'Teste', date: '2020-01-01', description: 'Testando' }
        const createdEvent = await createEvent(event)
    
        expect(createdEvent.id).toBeDefined()
    })
})