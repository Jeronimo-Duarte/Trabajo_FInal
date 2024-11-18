const express = require('express')
const router = express.Router()
const productosController = require('../controllers/productosControllers.js')

router.get('/' , productosController.getProducto)


module.exports= router