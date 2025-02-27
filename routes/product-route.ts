import { Router } from "express";
import { createProduct, getAllProduct, getProductById, updateProduct, deleteProduct } from '../controllers/product-controller'
import { authMiddleware } from "../middlewares/auth-middleware";
import { validateProductId } from "../validators/product-validators";
import { validateRequest } from "../middlewares/validate-request";

const route = Router();

route.post('/', authMiddleware, createProduct);
route.get('/', authMiddleware, getAllProduct);
route.get('/:id', authMiddleware,validateProductId, validateRequest,getProductById);
route.put('/:id', authMiddleware, validateProductId,validateRequest,updateProduct);
route.delete('/:id', authMiddleware, validateProductId, validateRequest, deleteProduct);






export default route;