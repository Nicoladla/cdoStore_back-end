import { Router } from "express";
import {
  deleteFromCart,
  getMyCart,
  postOnCart,
} from "../controllers/myCartController.js";
import { productExistsValidation } from "../middlewares/productExistsValidationMiddleware.js";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";

const router = Router();

router.post(
  "/my-cart/:productId",
  tokenValidation,
  productExistsValidation,
  postOnCart
);

router.delete(
  "/my-cart/:productId",
  tokenValidation,
  productExistsValidation,
  productInOnCartValidation,
  deleteFromCart
);

router.get("/my-cart", tokenValidation, getMyCart);

export default router;
