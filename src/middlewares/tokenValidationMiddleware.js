import { ObjectId } from "mongodb";
import { usersCollection } from "../database/db.js";

export async function tokenValidation(req, res, next) {
  // AINDA NÃO TA VALIDANDO PQ NAO SEI COMO CHEGA O TOKEN JWT.
  // SÓ PASSEI O ID DO USUÁRIO NO HEADERS PRA TESTAR O CARRINHO
  const { authorization: userId } = req.headers;
  console.log(userId);
  try {
    const findUser = await usersCollection.findOne({ _id: ObjectId(userId) });
    if (!findUser) {
      res.status(404).send({ message: "Usuário não encontrado." });
      return;
    }
    req.userId = userId;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
