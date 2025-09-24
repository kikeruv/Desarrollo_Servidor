import { Router } from "express";
import {getUser} from "./controller"
import {authMiddleware} from "../middlewares/auth"

const router = Router();

/**
 * @swagger
 * /users:
 *  get:
 *      description: Listar usuarios
 *      params:
 * 
 *      reponse:
 *          200:
 *              description: sucess
 *          401:
 *              description: missing token
 * 
 */

router.get('', authMiddleware, getUser);

export default router;