const { App } = require('./src/app')

App.get('/', (req, res) => {
    res.send('ok')
})

App.listen(3000, 'localhost', () => {
    console.log('works')
})