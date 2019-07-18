const { makeDeleteEvent } = require('../../src/events/services')

describe('makeDeleteEvent()', () => {
    it('should return a function', () => {
        const deleteEvent = makeDeleteEvent()
        expect(typeof deleteEvent).toBe('function')
    })

    describe('deleteEvent()', () => {
        it('it should return error and value', async () => {
            const deleteEvent = makeDeleteEvent(() => true)
            const { error, value } = await deleteEvent(1)

            expect(error).toBe(false)
            expect(value).toBe(true)
        })
    })
})