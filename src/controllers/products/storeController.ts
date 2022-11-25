import { NextFunction, Request, Response, RequestHandler } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { CustomErrorHandler } from "../../services";
import { productValidationSchema } from "../../validators";
import { APP_URL } from "../../../config";

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, '/public/uploads')
    },
    filename(req, file, callback) {
        let uniqueName = `${Date.now().toString()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        callback(null, `${file.fieldname}-${uniqueName}`)
    },
})

const handleMultipartData = multer({
    storage: storage,
    limits: { fileSize: 1000000 * 5 }
}).array('images', 4);

const store: RequestHandler = (req: Request, res: Response, next: NextFunction) => {

    handleMultipartData(req, res, async err => {
        if(err) {
            return next(CustomErrorHandler.serverError(err.message));
        }
        // Get FilePath
        const filePath = req.file?.path;
        // Validate the request body.
        const { error } = productValidationSchema.validate(req.body);
        if (error) {
            // If Error Delete File From Storage.
            fs.unlink(`${APP_URL}/${filePath}`, err => {
                if(err) {
                    return next(CustomErrorHandler.serverError());
                }
            })
        }
        return next(error);
        // rootfolder/uploads/filename.png
    })

    // Handling the saving functionalities.

    res.json({name:"ok"})
}

export default store;