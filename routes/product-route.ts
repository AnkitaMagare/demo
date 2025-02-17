import { Router } from "express";
import { createProduct, getAllProduct, getProductById, updateProduct, deleteProduct } from '../controllers/product-controller'
import { authMiddleware } from "../middlewares/auth-middleware";

const route = Router();

route.post('/', authMiddleware, createProduct);
route.get('/', authMiddleware, getAllProduct);
route.get('/:id', authMiddleware, getProductById);
route.put('/:id', authMiddleware, updateProduct);
route.delete('/:id', authMiddleware, deleteProduct);






export default route;