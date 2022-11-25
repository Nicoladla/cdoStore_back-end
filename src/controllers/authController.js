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

export async function signIn(req, res) {
  const { password, email } = req.body;

  try {
    const userExist = await usersCollection.findOne({ email });
    if (!userExist || !bcrypt.compareSync(password, userExist.password)) {
      res.status(422).send({ message: "Email ou senha inválidos" });
      return;
    }

    res.send(userExist);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
