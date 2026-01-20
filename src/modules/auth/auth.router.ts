import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";

import { RegisterSchema, LoginSchema } from "./auth.schema";
import * as authController from "./auth.controller";

const router = Router();

router.post("/register", validate(RegisterSchema), authController.register);
router.post("/login", validate(LoginSchema), authController.login);

export default router;
