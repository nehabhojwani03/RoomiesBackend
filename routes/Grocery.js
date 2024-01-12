const express= require('express');
const { 
    addGroceryItem, 
    updateGroceryList, 
    deleteGroceryItem, 
    getGroceryItem
} = require('../controllers/Grocery');

//FUnction for routing
const router = express.Router();

router.post('/addgroceryitem', addGroceryItem);
router.put('/updategrocerylist/:id', updateGroceryList);
router.delete('/deletegroceryitem/:id', deleteGroceryItem);
router.get('/getgroceryItem', getGroceryItem);


module.exports= router;