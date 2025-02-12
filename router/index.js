const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')
const orderController = require('../controllers/orderController')

// Routes for Product
router.get('/products', productController.index)
router.get('/products/:id', productController.show)
router.post('/products', productController.store)
router.put('/products/:id', productController.update)
router.delete('/products/:id', productController.delete)

// Routes for Order
router.get('/orders', orderController.index)
router.get('/orders/:id', orderController.show)
router.post('/orders', orderController.store)
router.delete('/orders/:id', orderController.delete)

module.exports = router