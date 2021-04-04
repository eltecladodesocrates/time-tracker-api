const express = require('express')
const bodyParser = require('body-parser')

const userRoute = require('./routes/user')
const taskRoute = require('./routes/task')

require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRoute)
app.use(taskRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('606940ee0049d56d6ade77b7')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)
    const user = await User.findById('60694015b7a11a6d1d134062')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}   

main()