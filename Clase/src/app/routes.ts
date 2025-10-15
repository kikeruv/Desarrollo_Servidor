import { Router, json } from 'express';

import authRoutes from './auth/router'
import userRouter from './users/router'

const router = Router();

router.use(json());
router.use('/auth', authRoutes);
router.use('/user', userRouter);

export default router;
