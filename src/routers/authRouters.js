import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import singUpBodyValidation from "../middlewares/signUpBodyValidationMiddleware.js";

const router = Router();

router.post("/sign-up", singUpBodyValidation, signUp);

export default router;
