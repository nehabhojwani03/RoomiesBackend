const mongoose = require('mongoose');

const ChoresSchema = new mongoose.Schema({
    choresName : {
        type: String,
        required: [true, 'Please enter chores name'],
    },

    description: {
        type: String,
    },

    frequency: {
        type: String,
        enum: ['Daily' , 'Weekly' , 'Monthly'],
        default:'Daily',
    },

    priority: {
        type: String,
        enum: ['High','Medium','Low'],
        default: 'High',
    },

    assignedTo: {
        type: String,
        required: [true, 'Please enter name'],
        default: ""
    },

    completedBy: {
        type: String,
        required: [true, 'Please enter name'],
        default: ""
    },

    completedAt: {
        type: String,
        required: [true, 'Please enter date'],
    },

    reminderSent:{
        type: Boolean,
    }
});

module.exports= mongoose.model('Chores', ChoresSchema);