import express from "express";
import cors from "cors";

import productsRouter from "./routers/productsRouter.js";
import authRouter from "./routers/authRouters.js";
import cartRouter from "./routers/myCartRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(productsRouter);
app.use(authRouter);
app.use(cartRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App running on port ${port}`));
