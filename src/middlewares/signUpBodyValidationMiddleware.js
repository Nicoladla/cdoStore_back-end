import { userSchema } from "../models/userSchema.js";
import { usersCollection } from "../database/db.js";

export default async function singUpBodyValidation(req, res, next) {
  const userInput = req.body;

  const {error} = userSchema.validate(userInput, { abortEarly: false });
  if (error) {
    res.status(422).send(error.details.map((d) => d.message));
    return;
  }

  try {
    const findEmail = await usersCollection.findOne({ email: userInput.email });
    if (findEmail) {
      res.status(409).send({ message: "Email já cadastrado." });
      return;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  res.locals.user = userInput;
  next();
}
