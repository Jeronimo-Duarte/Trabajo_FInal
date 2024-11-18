const mongoose = require('mongoose');
const Producto = require('../models/ProductosModel.js')


exports.getProducto = async(req, res)=> {
    try{
        const productos = await Producto.find()
        res.json(productos)
    }catch(err){
        res.status(500).json({message: err.message})
    }
}