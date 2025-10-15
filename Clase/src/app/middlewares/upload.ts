import multer, {FileFilterCallback, Multer, diskStorage} from 'multer';
import { Request } from 'express';

const  validExtensions = ['jpg', 'jpg', 'png'];

// storage = multerStorage
const storage = diskStorage({
    destination: (req, file, cb) => { //cb = es un callback
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => { //cb = es un callback
        const name = new Date().getTime().toString();
        const extension = file.originalname.split('.').pop();
        cb(null, `${name}.${extension}`);
    }
});
const filters = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    console.log(req, file, cb);

    const acceptFile = file.mimetype.startsWith('image');
    cb(null, acceptFile);
    
/*   Ejemplo 1
    const extension = file.originalname.split('.').pop();
    let acceptFile = false;
    if(extension?.toLowerCase() === 'jpg'){
        acceptFile = true;
    }
    cb(null, acceptFile)
*/
/*  Ejmeplo 2
    const extension = file.originalname.split('.').pop();
    const acceptFile = validExtensions.includes(extension?.toLowerCase()!);
    cb(null, acceptFile);

*/
}
export const uploadMiddleware = multer({
    storage
});