const { format } = require('date-fns')
const { validateEventDate } = require('../src/events/services')

describe('validateEventDate()', () => {
    it('should not accept today date', () => {
        const today = format(new Date(), 'yyyy-MM-dd')
        const { error, value } = validateEventDate(today)

        expect(error).toBe(true)
        expect(value).toBe(today)
    })

    it('should not accept dates before today', () => {
        const date = '2018-01-01'
        const { error, value } = validateEventDate(date)

        expect(error).toBe(true)
        expect(value).toBe(date)
    })

    it('should not accept invalid dates', () => {
        const date = '9876-54-32'
        const { error, value } = validateEventDate(date)

        expect(error).toBe(true)
        expect(value).toBe(date)
    })
})

