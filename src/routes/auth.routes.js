import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { validateLogin } from "../middlewares/validateLogin";
import {
  validateRegister,
  checkDuplicateUser,
} from "../middlewares/validateRegister";

import { verifyToken } from '../middlewares/validateJwt'

const router = Router();

router.post(
  "/register",
  [validateRegister, checkDuplicateUser],
  authController.register
);
router.post("/login", validateLogin, authController.login);

router.get("/who", verifyToken, authController.who);

export default router;
