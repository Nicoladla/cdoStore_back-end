import { ObjectId, ObjectID } from "bson";
import {
  cartsCollection,
  productsCollection,
} from "../database/db.js";

export async function postOnCart(req, res) {
  const userId = req.userId;
  const productId = req.productId;
  const isOnCart = req.isOnCart;

  try {
    if (isOnCart) {
      await cartsCollection.updateOne(
        { userId: ObjectId(userId), "products.productId": productId },
        { $inc: { "products.$.amount": 1 } }
      );
    } else {
      await cartsCollection.updateOne(
        { userId: ObjectID(userId) },
        { $push: { products: { productId, amount: 1 } } }
      );
    }
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteFromCart(req, res) {
  const userId = req.userId;
  const productId = req.productId;
  const isOnCart = req.isOnCart;

  if (!isOnCart) {
    res.status(404).send({ message: "Esse produto não está no carrinho." });
    return;
  }

  try {
    await cartsCollection.updateOne(
      { userId: ObjectId(userId), "products.productId": productId },
      { $inc: { "products.$.amount": -1 } }
    );

    res.sendStatus(202);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getMyCart(req, res) {
  const userId = req.userId;

  try {
    const { products: idProducts } = await cartsCollection.findOne({
      userId: ObjectID(userId),
    });

    let products = [];
    for (let p in idProducts) {
      products.push(
        await productsCollection.findOne({
          _id: ObjectId(idProducts[p].productId),
        })
      );
      products[p].amountInCart = idProducts[p].amount;
    }
    res.send(products);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
