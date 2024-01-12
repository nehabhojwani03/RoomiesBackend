const mongoose = require('mongoose');

const GrocerySchema = new mongoose.Schema({

    itemName: {
        type: String,
        required: [true, 'Please enter item']
    },

    quantity: {
        type: Number,
        required: [true, 'Please add quantitiy']
    },

    addedBy: {
        type: String,
        required: [true, 'Please enter name']
    },

    purchasedBy: {
        type: String,
        required: [true, 'Please enter name']
    },

    purchasedAt: {
        type: String,
        required: [true, 'Please enter date when the grocery is purchased']
    }
});

module.exports= mongoose.model('Grocery', GrocerySchema);