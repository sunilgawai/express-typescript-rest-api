import { Router } from "express";
import { store } from "../controllers";
import { handleMultipartData } from "../middlewares";
const productRouter = Router();

/**
 * Store Product.
 */

productRouter.post('/store', handleMultipartData.array('images', 4), store);

export default productRouter;