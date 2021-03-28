const express = require('express')
const bodyParser = require('body-parser')

const userRoute = require('./routes/user')
const taskRoute = require('./routes/task')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(userRoute)
app.use(taskRoute)

app.get('/', (req, res) => {
    res.send('home')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})