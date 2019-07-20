const { makeDeleteEvent } = require('../../../../src/events/repository')
const { db } = require('../../../helpers')
afterAll(() => db.destroy())

describe('makeDeleteEvent()', () => {
    it('should return a function', () => {
        const deleteEvent = makeDeleteEvent()
        expect(typeof deleteEvent).toBe('function')
    })

    describe('deleteEvent()', () => {
        it('should delete an event in database', async () => {
            const deleteEvent = makeDeleteEvent(db)
            const id = await db('event').insert({ title: 'Delete', at_date: new Date(), description: 'Este evento deve ser deletado' }).returning('id')

            await deleteEvent(id[0])

            const result = await db('event').where({ id: id[0] })
            expect(result.length).toBe(0)

        })

        afterEach(async () => {
            await db('event').truncate()
        })
    })
})