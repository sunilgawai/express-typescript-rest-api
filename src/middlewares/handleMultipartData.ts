import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'public/uploads/')
    },
    filename(req, file, callback) {
        let uniqueName = `${Date.now().toString()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        callback(null, `${file.fieldname}-${uniqueName}`)
    },
})

const handleMultipartData = multer({
    storage: storage,
    limits: { fileSize: 1000000 * 5 }
})

/**
 * Error Handler Middleware for Multipart data,
 * Some how not working for me.
 */

// handleMultipartData(req, res, async err => {
//     if (err) {
//         return next(CustomErrorHandler.serverError(err.message));
//     }
//     const filePath = req.file?.path;

//     // Request Validation.
//     const { error } = productValidationSchema.validate(req.body);
//     if (error) {
//         // Delete the uploaded file
//         fs.unlink(`${rootUrl}/${filePath}`, (err) => {
//             if (err) {
//                 return next(
//                     CustomErrorHandler.serverError(err.message)
//                 );
//             }
//         });
//         return next(error);
//         // rootfolder/uploads/filename.png
//     }
// })

export default handleMultipartData;