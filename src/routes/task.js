const express = require('express')
const bodyParser = require('body-parser')

const router = new express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/task', (req, res) => {
    res.send('task route')
})

module.exports = router