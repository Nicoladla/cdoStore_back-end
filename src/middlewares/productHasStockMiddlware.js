import { ObjectId } from "mongodb";
import { cartsCollection, productsCollection } from "../database/db.js";

export async function productHasStock(req, res, next) {
  const userId = req.userId;
  const productId = req.productId;

  try {
    const { inStock } = await productsCollection.findOne({
      _id: ObjectId(productId),
    });

    const cart = await cartsCollection.findOne({
      userId: ObjectId(userId),
    });
    const { amount } = cart.products.find((p) => p.productId === productId);

    if (amount > inStock - 1) {
      res
        .status(404)
        .send({ message: `Só temos ${inStock} unidade(s) disponível(is)` });
      return;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
