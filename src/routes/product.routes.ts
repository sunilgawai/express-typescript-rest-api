import { Router } from "express";
import { get, store } from "../controllers";
import { handleMultipartData } from "../middlewares";
const productRouter = Router();

/**
 * Get Products.
 */
productRouter.get('/', get);
/**
 * Store Product.
 */

productRouter.post('/store', handleMultipartData.array('images', 4), store);

export default productRouter;