const express = require('express')
const bodyParser = require('body-parser')

const userRoute = require('./routes/user')
const taskRoute = require('./routes/task')

require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

app.use(express.json())
app.use(userRoute)
app.use(taskRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})