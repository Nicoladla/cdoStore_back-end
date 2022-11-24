import { cartsCollection, usersCollection } from "../database/db.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const user = res.locals.user;

  try {
    const { insertedId } = await usersCollection.insertOne({
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    });

    await cartsCollection.insertOne({ userId: insertedId, products: [] });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
