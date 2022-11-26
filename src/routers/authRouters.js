import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import singUpBodyValidation from "../middlewares/signUpBodyValidationMiddleware.js";

const router = Router();

router.post("/sign-up", singUpBodyValidation, signUp);
router.post("/sign-in", signIn);

export default router;
