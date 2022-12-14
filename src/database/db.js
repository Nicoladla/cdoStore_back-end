import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
try {
  await mongoClient.connect();
  console.log("Mongo connect");
} catch (error) {
  console.log(error);
}

const db = mongoClient.db("cdoStore");
export const usersCollection = db.collection("users");
export const cartsCollection = db.collection("carts");
export const productsCollection = db.collection("products");
