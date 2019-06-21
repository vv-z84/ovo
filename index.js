const App = require('express')()

App.get('/', (req, res) => {
    res.send('ok')
})

App.listen(3000, 'localhost', () => {
    console.log('works')
})