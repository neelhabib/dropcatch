import path from "path";
import fs from "fs";
import { MongoClient } from "mongodb";
const filePath = path.join(process.cwd(), "db.json");
import isLoggedIn from "../isLoggedIn";
export default async function handler(req, res) {
  const data = fs.readFileSync(filePath, "utf-8");
  const database = JSON.parse(data);
  const client = new MongoClient(database.db);
  const token = req.body?.token?.token;

  try {
    await client.connect(); // Connect to the MongoDB server
    switch (req.method) {
      case "POST":
        console.log(token);
        if (isLoggedIn(token)) {
          await client
            .db(database.dbName)
            .collection("open-ai-api")
            .findOne()
            .then((doc) => res.json(doc));
        } else {
          res.json({});
        }
        break;
    }
  } catch (err) {
    // console.log(err);
    res.json("Error, Please try again.");
  } finally {
    await client.close();
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
