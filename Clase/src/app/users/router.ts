import { Router } from "express";
import {getUser, uploadProfilePic} from "./controller"
import {authMiddleware} from "../middlewares/auth"
// import { uploadProfilePic } from "./controller";
import { uploadMiddleware } from './../middlewares/upload'

const router = Router();

router.get('', authMiddleware, getUser);
// Puede ser un post o un put
router.post('profile',uploadMiddleware.single('imagen'), uploadProfilePic)

export default router;