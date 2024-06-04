const express = require('express');
const {
  addChores,
  updateChores,
  deleteChores,
  getChoresByName,
  getChoresAssignedBy,
} = require('../controllers/chores');

//function for routing
const router = express.Router();

router.post('/addchores', addChores);
router.put('/updatechores/:id', updateChores);
router.delete('/deletechores/:id', deleteChores);
router.get('/getchores/:name', getChoresByName);
router.get('/getchoresby/:name', getChoresAssignedBy);

module.exports = router;
