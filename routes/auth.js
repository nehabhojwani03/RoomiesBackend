const express = require('express');
const { 
    register, 
    login, 
    updateDetails
} = require('../controllers/auth');


//function for routing
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/updateDetails', updateDetails);

module.exports= router;