import {Router, json} from "express";
import { login , signup } from "./controller";

const router = Router();

router.post('/login', json, login);
router.post('/signup', signup);

export default router;