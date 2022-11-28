import { Router } from "express";
import {
  deleteFromCart,
  getMyCart,
  postOnCart,
} from "../controllers/myCartController.js";
import { productExistsValidation } from "../middlewares/productExistsValidationMiddleware.js";
import { productHasStock } from "../middlewares/productHasStockMiddlware.js";
import { productIsOnCartValidation } from "../middlewares/productIsOnCartValidationMiddleware.js";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";

const router = Router();

router.post(
  "/my-cart/:productId",
  tokenValidation,
  productExistsValidation,
  productHasStock,
  productIsOnCartValidation,
  postOnCart
);

router.delete(
  "/my-cart/:productId/",
  tokenValidation,
  productExistsValidation,
  productIsOnCartValidation,
  deleteFromCart
);

router.get("/my-cart", tokenValidation, getMyCart);

export default router;
