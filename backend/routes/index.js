const express = require('express');
const controller = require('../controllers/orders.controller');

var router = express.Router();

router.route('/orders')
  .get(controller.getOrders)

module.exports = router;
