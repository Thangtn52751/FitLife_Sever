const express = require('express');
const router = express.Router();

const {
  createBMI,
  getBMIByUser,
  deleteBMI
} = require('../controllers/bmiController');

router.post('/', createBMI);
router.get('/user/:userId', getBMIByUser);
router.delete('/:id', deleteBMI);

module.exports = router;
