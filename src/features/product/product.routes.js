// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import ProductController from './product.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';

// 2. Initialize Express router.
const productRouter = express.Router();

const productController = new ProductController();

// All the paths to controller methods.
// localhost/api/products

// localhost:3200/api/products/filter?minPrice=10&maxPrice=20&category=Category1
 
productRouter.get(
  '/items',
  (req, res)=>{
    productController.getAllProducts(req, res)
} 
);
productRouter.get(
  '/items/:id:',
  (req, res)=>{
    productController.getOneProduct(req, res)
} );

productRouter.post(
  '/items',
  upload.single('imageUrl'),
  (req, res)=>{
    productController.addProduct(req, res)
} 
);


productRouter.delete('/items/:id', (req, res, next)=>{
  productController.delete(req, res, next)
});

productRouter.put('/items/:id', (req, res, next)=>{
  productController.put(req, res, next)
});



export default productRouter;
