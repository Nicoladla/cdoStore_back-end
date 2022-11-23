import { Router } from "express";
import { getInStockProducts } from "../controllers/productsController.js";

const router = Router();

router.get("/products", getInStockProducts);

export default router;
