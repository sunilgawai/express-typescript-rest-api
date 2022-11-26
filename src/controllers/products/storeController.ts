import { NextFunction, Request, Response, RequestHandler } from "express";
import { Product } from "../../models";
import { productValidationSchema } from "../../validators";


const store: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    // Validate the request.
    const { error } = productValidationSchema.validate(req.body);
    if (error) {
        return next(error);
    }

    // Multipart form data
    try {
        if (!req.files) {
            return next(new Error("Files Not found"));
        }

        // let paths: File[] = [];
        const { name, price, size, desc, liked, featured } = req.body;

        // Extracting Image Paths to Store.
        let images: string[] = [];
        const files = req.files;

        const array = { ...files };
        const temp = JSON.stringify(array);
        const pathsArray = JSON.parse(temp);

        for (const key in pathsArray) {
            if (Object.prototype.hasOwnProperty.call(pathsArray, key)) {
                const element = pathsArray[key];
                images.push(element['path'])
                console.log('path', element['path'])
            }
        }

        // Saving in the database.
        let product = new Product({
            name,
            price,
            size,
            desc,
            images,
            liked,
            featured
        })

        let result = await product.save();



        res.json({ name, price, size, desc, liked, featured, result })
    } catch (error) {
        return next(error);
    }

    // Handling the saving functionalities.
    // const { name, price, size, desc, liked, featured } = req.body;
    // const images = req.files;
    // res.json({ name, price, size, desc, images, liked, featured })
}

export default store;