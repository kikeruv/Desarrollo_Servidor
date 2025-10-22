import { Request } from "express"
import multer ,{ FileFilterCallback } from "multer"
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from 'multer-s3'


// Conexion con le cliente
const s3 = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCES_KEY || '',
        secretAccessKey: process.env.S3_SECRET_KEY || '',
    }
});

const storage = multerS3({
    //s3: s3 es iagual a 
    s3,
    bucket: 'ITESO', // Se pone el nombre de nuestro bucket 
    metadata: (req, file, cb) =>{
        cb(null, {...file})
    }, 
    acl: 'public-read', // Se pone solo si el objeto y el bucket son publicas 
    key: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    cb(null, file.mimetype.startsWith('image/'));
}

export const uploadS3 = multer({
    storage,
    fileFilter
})