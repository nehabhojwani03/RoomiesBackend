const express = require('express');
const { 
    addChores,
     updateChores, 
     deleteChores, 
     getChores
} = require('../controllers/chores');

//function for routing
const router = express.Router();

router.post('/addchores', addChores);
router.put('/updatechores/:id', updateChores);
router.delete('/deletechores/:id', deleteChores);
router.get('/getchores', getChores);


module.exports=router;