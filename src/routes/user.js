const express = require('express')
const bodyParser = require('body-parser')

const User = require('../models/user')

const router = new express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

router.post('/user', async (req, res) => {

    const user = new User(req.body)
    try {
        await user.save()
        res.send(user)
    } catch (e) {
        res.send(e)
    }

})

router.patch('/user/:id', async (req, res) => {

    const user = req.body
    try {
        await User.findByIdAndUpdate(req.params.id, user)
        res.send(user)
    } catch (e) {
        res.send(e)
    }

})

router.delete('/user/:id', async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.send(user)
    } catch (e) {
        res.send(e)
    }

})

module.exports = router