import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

import { usersCollection } from "../database/db.js";

export function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    jwt.verify(token, process.env.SECRET_JWT, async (error, decode) => {
      if (error) {
        return res.status(401).send({ message: "Token inválido" });
      }

      const userExist = await usersCollection.findOne({
        _id: ObjectId(decode.userId),
      });
      if (!userExist) {
        return res.status(401).send({ message: "Token inválido" });
      }

      req.userId = decode.userId;
      return next();
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
