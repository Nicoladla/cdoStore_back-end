import { userSchema } from "../models/userSchema.js";
import { usersCollection } from "../database/db.js";

export default async function singUpBodyValidation(req, res, next) {
  // name, email, password
  const userInput = req.body;
  const validation = userSchema.validate(userInput, { abortEarly: false });
  if (validation.error) {
    res.status(422).send(validation.error.details.map((d) => d.message));
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
