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



export default handleMultipartData;