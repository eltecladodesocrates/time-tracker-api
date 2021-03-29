const express = require('express')
const bodyParser = require('body-parser')

const Task = require('../models/task')

const router = new express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/task', async (req, res) => {
    try {
        tasks = await Task.find()
        res.send(tasks)
    } catch (e) {
        res.send(e)
    }
})

router.post('/task', async (req, res) => {

    const task = new Task({
        name: req.body.name
    })
    try {
        await task.save()
        res.send(task)
    } catch (e) {
        res.send(e)
    }
    
})

module.exports = router