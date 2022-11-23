import { productsCollection } from "../database/db.js";

export async function getInStockProducts(req, res) {
  try {
    const inStockProducts = await productsCollection
      .find({
        inStock: { $gt: 0 },
      })
      .toArray();
    res.send(inStockProducts);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
