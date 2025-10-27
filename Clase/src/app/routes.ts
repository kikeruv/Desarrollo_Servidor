import { Router, json } from 'express';

import authRoutes from './auth/router'
import userRouter from './users/router'
import chatRoutes from './chat/routes'

const router = Router();

router.use(json());
router.use('/auth', authRoutes);
router.use('/user', userRouter);
router.use('/chat', chatRoutes)

export default router;
