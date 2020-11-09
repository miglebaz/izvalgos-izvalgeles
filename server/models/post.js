const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const postSchema = new mongoose.Schema({
    title: {
        type: String, 
        trim: true,
        min: 2,
        max: 150,
        required: true
    }, 
    slug: {
        type: String, 
        unique: true,
        index: true,
        lowercase: true,
        min: 2,
        max: 150,
        required: true
    },
    content: {
        type: {},
        required: true, 
        min: 10,
        max: 200000,
    },
    user: {
        type: String, 
        default: 'Nežinomas'
    }
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema)


