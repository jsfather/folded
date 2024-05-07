const express = require('express');
const {getCosts, getCost, createCost, deleteCost, updateCost} = require('../controllers/costController');

const router = express.Router();

router.get('/', getCosts)

router.get('/:id', getCost)

router.post('/', createCost)

router.delete('/:id', deleteCost)

router.patch('/:id', updateCost)

module.exports = router