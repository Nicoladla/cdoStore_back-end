import { ObjectId, ObjectID } from "bson";
import { cartsCollection, productsCollection } from "../database/db.js";

export async function postOnCart(req, res) {
  const userId = req.userId;
  const productId = req.productId;

  try {
    await cartsCollection.updateOne(
      { userId: ObjectID(userId) },
      { $push: { products: productId } }
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteFromCart(req, res) {
  const userId = req.userId;
  const productId = req.productId;

  console.log(productId);
  console.log(userId);
}

export async function getMyCart(req, res) {
  const userId = req.userId;
  console.log(userId);

  try {
    const { products } = await cartsCollection.findOne({
      userId: ObjectID(userId),
    });

    let cart = [];
    for (let index in products) {
      cart.push(
        await productsCollection.findOne({
          _id: ObjectId(products[index]),
        })
      );
    }
    res.send(cart);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
