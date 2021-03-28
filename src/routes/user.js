const express = require('express')
const bodyParser = require('body-parser')

const router = new express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/user', (req, res) => {
    res.send('users route')
})

module.exports = router