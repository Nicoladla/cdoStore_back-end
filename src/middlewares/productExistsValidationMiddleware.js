import { ObjectID } from "bson";
import { productsCollection } from "../database/db.js";

export async function productExistsValidation(req, res, next) {
  const { productId } = req.params;

  try {
    const findProduct = await productsCollection.findOne({
      _id: ObjectID(productId),
    });

    if (!findProduct) {
      res.status(404).send({ message: "Produto não encontrado" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  req.productId = productId;
  next();
}
