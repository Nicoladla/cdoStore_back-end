import { ObjectId } from "mongodb";
import { cartsCollection, productsCollection } from "../database/db.js";

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
        { userId: ObjectId(userId) },
        { $push: { products: { productId, amount: 1 } } }
      );
    }
    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteFromCart(req, res) {
  const userId = req.userId;
  const productId = req.productId;
  const isOnCart = req.isOnCart;
  const { all } = req.query;

  if (!isOnCart) {
    res.status(404).send({ message: "Esse produto não está no carrinho." });
    return;
  }

  if (all) {
    await cartsCollection.updateOne(
      { userId: ObjectId(userId), "products.productId": productId },
      { $set: { "products.$.amount": 0 } }
    );
    return res.sendStatus(202);
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
  const { name: query } = req.query;

  try {
    const { products: idProducts } = await cartsCollection.findOne({
      userId: ObjectId(userId),
    });

    let products = [];
    for (let i in idProducts) {
      products.push(
        await productsCollection.findOne({
          _id: ObjectId(idProducts[i].productId),
          inStock: { $gt: 0 },
        })
      );
      products[i].amountInCart = idProducts[i].amount;
    }

    if (query) {
      let queryProducts = [];
      for (let p of products) {
        if (p.name.toLowerCase().includes(query.toLowerCase())) {
          queryProducts.push(p);
        }
      }
      res.send(queryProducts);
      return;
    }

    res.send(products.filter((p) => p.amountInCart > 0));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
