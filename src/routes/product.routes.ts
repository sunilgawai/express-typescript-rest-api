import { Router } from "express";
import { store } from "../controllers";
const productRouter = Router();

/**
 * Store Product.
 */

productRouter.post('/store', store);

export default productRouter;