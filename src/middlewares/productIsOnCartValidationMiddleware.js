import { ObjectId } from "mongodb";
import { cartsCollection } from "../database/db.js";

export async function productIsOnCartValidation(req, res, next) {
  const userId = req.userId;
  const productId = req.productId;

  try {
    const { products } = await cartsCollection.findOne({
      userId: ObjectId(userId),
    });

    let isOnCart = false;
    for (let p of products) {
      if (p.productId === productId) {
        isOnCart = true;
      }
    }

    req.isOnCart = isOnCart;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
