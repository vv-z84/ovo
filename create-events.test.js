const { makeCreateEvent } = require('./repository')

it('should create createEvent()', () => {
    const createEvent = makeCreateEvent()
    const event = { title: 'Teste', date: '2020-01-01', description: 'Testando' }
    const createdEvent = createEvent(event)

    expect(createdEvent.id).toBeDefined()
})