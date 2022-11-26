import { Request, Response, NextFunction, RequestHandler} from "express";
import { Product } from "../../models";

const get: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find().select('-__v -createdAt -updatedAt');
        res.json({products});
    } catch (error) {
        
    }
}

export default get;