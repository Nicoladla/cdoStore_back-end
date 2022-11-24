import { productsCollection } from "../database/db.js";

export async function getInStockProducts(req, res) {
  const product = req.query;

  try {
    const inStockProducts = await productsCollection
      .find({
        name: { $regex: product.name || "", $options: "i" },
        inStock: { $gt: 0 },
      })
      .toArray();
    res.send(inStockProducts);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
