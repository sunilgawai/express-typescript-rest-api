import { NextFunction, Request, Response, RequestHandler } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { CustomErrorHandler } from "../../services";
import { productValidationSchema } from "../../validators";
import { rootUrl } from "../../../config";

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, `public/uploads/`)
    },
    filename(req, file, callback) {
        let uniqueName = `${Date.now().toString()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        callback(null, `${file.fieldname}-${uniqueName}`)
    },
})

const handleMultipartData = multer({
    storage: storage,
    limits: { fileSize: 1000000 * 5 }
}).array('images')

const store: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    console.log(req.files);
    // Multipart form data
    try {
        handleMultipartData(req, res, async err => {
            if (err) {
                return next(CustomErrorHandler.serverError(err.message));
            }
            const filePath = req.file?.path;

            // Request Validation.
            const { error } = productValidationSchema.validate(req.body);
            if (error) {
                // Delete the uploaded file
                fs.unlink(`${rootUrl}/${filePath}`, (err) => {
                    if (err) {
                        return next(
                            CustomErrorHandler.serverError(err.message)
                        );
                    }
                });
                return next(error);
                // rootfolder/uploads/filename.png
            }
        })
    } catch (error) {
        return next(error);
    }
    
    // Handling the saving functionalities.
    const { name, price, size, desc, liked, featured } = req.body;
    const images = req.files;
    res.json({ name, price, size, desc, images, liked, featured })
}

export default store;