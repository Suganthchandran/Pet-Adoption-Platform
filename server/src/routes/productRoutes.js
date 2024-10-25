const express = require('express');
const productController = require('../controllers/productController');
const upload = require('../middleware/multer.js')

const ProductRouter = express.Router();

ProductRouter.post('/', upload.single('image'), productController.createProduct);
ProductRouter.get('/', productController.getAllProducts);
ProductRouter.get('/:id', productController.getProductById);
ProductRouter.put('/:id', productController.updateProduct);
ProductRouter.delete('/:id', productController.deleteProduct);

module.exports = ProductRouter;
