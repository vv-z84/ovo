module.exports = {
    makeCreateEvent: (knex) => ({ title, date, description }) => {
        return Promise.resolve({ id: 123, title, date, description })
    }
}