const mongoose = require('mongoose');

const typingProgressSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
         required:true
    },
    wpm:{
        type:Number,
        required:true,
    },
    accuracy:{
        type:Number,
        required:true,
    },
    consistency:{
        type:Number,
        required:true,
    },
     attempedAt:{
        type:Date,
        default:Date.now
     }
})

module.exports = mongoose.model('TypingProgress', typingProgressSchema);