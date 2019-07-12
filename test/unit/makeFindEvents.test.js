const { makeFindEvents } = require('../../src/events/services')

it('makeFindEvents()', async () => {
    const listEvents = () => {
        return [{ id: 123, title: 'Title', date: new Date(), description: 'Description' }]
    }  
    const findEvents = makeFindEvents(listEvents)
    
    const { error, value } = await findEvents()
    expect(error).toBe(false)
    expect(Array.isArray(value)).toBe(true)
    expect(value[0].id).toBe(123) 
})