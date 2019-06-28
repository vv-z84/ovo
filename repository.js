module.exports = {
    makeCreateEvent: (db) => ({ title, date, description }) => {
        return { id: 123, title, date, description }
    }
}