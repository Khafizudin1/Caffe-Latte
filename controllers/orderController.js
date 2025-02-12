const Order = require('../models/Order')
const Product = require('../models/Product')

module.exports = {
  // Get all orders
  index: async (req, res) => {
    try {
      const orders = await Order.find().populate('product')
      if (orders.length > 0) {
        res.status(200).json({
          status: true,
          data: orders,
          method: req.method,
          url: req.url
        })
      } else {
        res.json({
          status: false,
          message: "Data pesanan masih kosong"
        })
      }
    } catch (error) {
      res.status(400).json({ success: false })
    }
  },

  // Get a single order
  show: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate('product')
      res.json({
        status: true,
        data: order,
        method: req.method,
        url: req.url,
        message: "Data pesanan berhasil didapatkan"
      })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  },

  // Create a new order
  store: async (req, res) => {
    try {
      const { product, quantity } = req.body

      const selectedProduct = await Product.findById(product)
      if (!selectedProduct) {
        return res.status(404).json({ status: false, message: "Produk tidak ditemukan" })
      }

      if (selectedProduct.stock < quantity) {
        return res.status(400).json({ status: false, message: "Stok tidak cukup" })
      }

      const totalPrice = selectedProduct.price * quantity

      const order = await Order.create({ product, quantity, totalPrice })

      // Kurangi stok produk setelah pesanan dibuat
      selectedProduct.stock -= quantity
      await selectedProduct.save()

      res.status(200).json({
        status: true,
        data: order,
        method: req.method,
        url: req.url,
        message: "Pesanan berhasil dibuat"
      })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  },

  // Delete an order
  delete: async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id)
      res.json({
        status: true,
        method: req.method,
        url: req.url,
        message: "Pesanan berhasil dihapus"
      })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  }
}
