const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter username'],
        unique: true,
    },

    name: {
        type: String,
        required: [true, 'Please enter your name']
    },

    email: {
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please use a valid URL with HTTP or HTTPS',
        ],
        required: [true, 'Please enter your email address'],
        unique: true,
    },

    phoneno: {
        type: Number,
        required: [true, 'Please enter your phone number'],
        maxlength: [10, 'Enter 10 numbers only'],
        unique: true
    },

    profilePicture: {
        type: String,
        default: 'no-photo.png'
     },

     bio: {
        type: String,
     },

     interest:[{
        type: String,
        required: [true, 'Please enter your interest']
     }],

     personalityTraits:[{
        type: Array,
        required: [true, 'Please enter your personality traits']
     }],

     lifestyleHabits: [{
        type: Array,
        required: [true, 'Please enter your lifestyle habits']
     }],

    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: 8,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }


});

module.exports= mongoose.model('User', UserSchema);