// routes/productRoutes.js

const express = require('express');
const { createProductValidators } = require('../validators/productValidators');
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');


const router = express.Router();

// Ruta para obtener todos los productos
router.get('/', productController.getAllProducts);

// Ruta para obtener un producto por su ID
router.get('/:id', userController.authenticate, productController.getProductById);

// Ruta para crear un nuevo producto
router.post('/', userController.authenticate, createProductValidators, productController.createProduct);

// Ruta para actualizar un producto por su ID
router.put('/:id', productController.updateProductById);

// Ruta para eliminar un producto por su ID
router.delete('/:id', productController.deleteProductById);

module.exports = router;
