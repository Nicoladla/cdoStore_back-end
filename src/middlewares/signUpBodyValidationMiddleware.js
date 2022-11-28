import { userSchema } from "../models/userSchema.js";
import { usersCollection } from "../database/db.js";

export default async function singUpBodyValidation(req, res, next) {
  const userInput = req.body;

  const { error } = userSchema.validate(userInput, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(422).send({ message: errors });
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
