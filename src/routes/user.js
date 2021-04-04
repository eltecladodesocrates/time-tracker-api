const express = require('express')
const bodyParser = require('body-parser')

const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

router.post('/user', async (req, res) => {

    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.send(e)
    }

})

router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.send(e)
    }
})

router.post('/user/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/user/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/user/me', auth, async (req, res) => {
    res.send(req.user)
})



router.patch('/user/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation) {
        return res.send({ error: 'Invalid updates' })
    }
    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.send(e)
    }

})

router.delete('/user/me', auth, async (req, res) => {

    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }

})

module.exports = router