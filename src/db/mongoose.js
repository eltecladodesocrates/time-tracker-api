const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://dbRP:13anguloX@cluster0.hray9.mongodb.net/time-tracker-API', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

