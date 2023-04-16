const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },


    text: {
        type: String,
        required: [true, 'Please add some text'],

    },
}, {
    timestamps: true
}) 

module.exports = mongoose.model('Post', postSchema)