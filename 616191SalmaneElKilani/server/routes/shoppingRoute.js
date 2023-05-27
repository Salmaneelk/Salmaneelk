const express = require('express');
const shoppingController = require('../controllers/shoppingController');

const router = express.Router();

router.get('/', shoppingController.getAll);
router.post('/', shoppingController.addItem);
router.get('/increase/:id', shoppingController.increaseQuantity);
router.get('/decrease/:id', shoppingController.decreaseQuantity);
router.post('/palce-order', shoppingController.placeOrder);



module.exports = router;