const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
    // sec: {
    //     type: Number,
    //     default: 0
    // },
    // min: {
    //     type: Number,
    //     default: 0
    // },
    // hrs: {
    //     type: Number,
    //     default: 0
    // },
    // start: {
    //     type: String,
    // },
    // end: {
    //     type: String
    // },
    // color: {
    //     type: String
    // },
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId
    // }
    
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task