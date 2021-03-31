const express = require('express')
const bodyParser = require('body-parser')

const Task = require('../models/task')

const router = new express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/tasks', async (req, res) => {
    try {
        tasks = await Task.find()
        res.send(tasks)
    } catch (e) {
        res.send(e)
    }
})

router.get('/task:id', async (req, res) => {

    try {
        task = await Task.findById()
        res.send(task)
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

router.patch('/task/:id', async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.send({ error: 'Inavlid updates!' })
    }
    try {
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.send(e)
    }

})

router.delete('/task/:id', async (req, res) => {

    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        res.send(task)
    } catch (e) {
        res.send(e)
    }

})

module.exports = router