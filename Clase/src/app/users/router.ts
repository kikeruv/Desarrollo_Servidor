import { Router } from "express";
import {getUser, uploadProfilePic} from "./controller"
import {authMiddleware} from "../middlewares/auth"
// import { uploadProfilePic } from "./controller";
import { uploadMiddleware } from './../middlewares/upload'

const router = Router();

// se puede documentar con un archivo config.yml
/** 
 * @swagger
 * /users:
 *  get:
 *    tags: [users]
 *    description: listar usuarios
 *    parameters:
 *      - in: query
 *        name: token
 *        description: auth user token
 *        schema:
 *         type: string
 *    responses: 
 *      200:
 *        description: success
 *      401:
 *        description: missing token
 * 
 * /users/profilepic:
 *  post:
 *    tags: [users]
 *    description: adjuntar imagen de perfil
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              image:
 *                type: string
 *                format: binary
 *                description: imagen de perfil a subir
 *    responses:
 *      200:
 *        description: imagen subida exitosamente
 *      400:
 *        description: error al subir la imagen
 *      401:
 *        description: token inválido o faltante
*/

router.get('', authMiddleware, getUser);
// Puede ser un post o un put
router.post('profile',uploadMiddleware.single('imagen'), uploadProfilePic)

export default router;