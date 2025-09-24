import {Request, Response} from 'express';
import {authMiddleware} from '../middlewares/auth'

const router = Router();

router.get('', authMiddleware ,getUsers);

export default router;