import multer, { diskStorage, FileFilterCallback } from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..') + '/public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
const fileFilter = (req: any, file: { mimetype: string; }, cb: (arg0: null, arg1: boolean) => void) => {
    if (
        file.mimetype === 'text/csv'
    ) {
        cb(null, true);
    } else {
        return cb(null, false);
    }
};
const uploads = multer({ storage: storage, fileFilter: fileFilter })

export {uploads}