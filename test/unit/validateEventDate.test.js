const { format } = require('date-fns')
const { validateEventDate } = require('../../src/events/services')

describe('validateEventDate()', () => {
    it('should not accept today date', () => {
        const today = format(new Date(), 'yyyy-MM-dd')
        const { valid, error } = validateEventDate(today)

        expect(valid).toBe(false)
        expect(error.code).toBe('ERR_DATE_IS_TODAY')
    })

    it('should not accept dates before today', () => {
        const date = '2018-01-01'
        const { valid, error } = validateEventDate(date)

        expect(valid).toBe(false)
        expect(error.code).toBe('ERR_DATE_HAS_ALREADY_PASSED')
    })

    it('should not accept invalid dates', () => {
        const date = '9876-54-32'
        const { valid, error } = validateEventDate(date)

        expect(valid).toBe(false)
        expect(error.code).toBe('ERR_INVALID_DATE')
    })
})

