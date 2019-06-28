const { format, addDays } = require('date-fns')
const { makeAddEvent } = require('./services')

describe('addEvent()', () => {
    let addEvent

    beforeEach(() => {
        addEvent = makeAddEvent(({ title, date, description }) => {
            const tomorrow = format(addDays(new Date(), 1), 'YYYY-MM-DD')
            
            expect(title).toBe('Teste')
            expect(date).toBe(format(tomorrow, 'YYYY-MM-DD'))
            expect(description).toBe('Testando')

            return { error: false, value: { id: 81238, title, date, description }}
        })
    })

    it('should add events', () => {
        const tomorrow = format(addDays(new Date(), 1), 'YYYY-MM-DD')
        const event = { title: 'Teste', date: tomorrow, description: 'Testando' }
        const { error, value } = addEvent(event)

        expect(error).toBe(false)
        expect(value.id).toBe(81238)
    })
    
    it('should not add events for today', () => {
        const today = format(new Date(), 'YYYY-MM-DD')
        const { error, value } = addEvent({ title: 'Teste', date: today, description: 'Testando' })
    
        expect(error).toBe(true)
        expect(value.id).toBeUndefined()
    })

    it('should not add events for before today', () => {
        const date = '2010-01-01'
        const { error, value } = addEvent({ title: 'Teste', date: date, description: 'Testando' })
    
        expect(error).toBe(true)
        expect(value.id).toBeUndefined()
    })

    it('should not add events with invalid dates', () => {
        const invalidDate = '1234-56-78'
        const { error, value } = addEvent({ title: 'Teste', date: invalidDate, description: 'Testando' })
    
        expect(error).toBe(true)
        expect(value.id).toBeUndefined() 
    })
})

