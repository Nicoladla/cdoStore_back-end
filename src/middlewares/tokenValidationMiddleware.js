import { ObjectID } from "bson";
import { usersCollection } from "../database/db.js";

export async function tokenValidation(req, res, next) {
  // AINDA NÃO TA VALIDANDO PQ NAO SEI COMO CHEGA O TOKEN JWT.
  // SÓ PASSEI O ID DO USUÁRIO NO HEADERS PRA TESTAR O CARRINHO
  const { authorization: userId } = req.headers;

  try {
    const findUser = await usersCollection.findOne({ _id: ObjectID(userId) });
    if (!findUser) {
      res.status(404).send({ message: "Usuário não encontrado." });
      return;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  req.userId = userId;
  next();
}
