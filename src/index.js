import express from "express";
import cors from "cors";
import { productsCollection } from "./database/db.js";
import productsRouter from "./routers/productsRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(productsRouter);

app.post("/products", async (req, res) => {
  const product = req.body;
  console.log(product);

  try {
    await productsCollection.insertOne(product);
    res.send(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.delete("/products", async (req, res) => {
  await productsCollection.drop();
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App running on port ${port}`));
