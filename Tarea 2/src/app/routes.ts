import { Router, json } from "express";
import chatRouter from "./chat/router"

const router = Router();

router.use(json());
router.use('/chat', chatRouter);

export default router;