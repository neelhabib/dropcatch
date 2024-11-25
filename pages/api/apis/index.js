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
        if (isLoggedIn(token)) {
          const result = await client
            .db(database.dbName)
            .collection("apis")
            .updateOne({}, { $set: { apis: req.body } }, { upsert: true });

          if (result.modifiedCount > 0 || result.upsertedCount > 0) {
            res.json({
              status: true,
              message: "Updated successfully",
            });
          } else {
            res.json({
              status: false,
              message:
                "Update was not successful. Data remains same. Please change some input.",
            });
          }
        } else {
          res.json({
            status: false,
            message: "Update was not successful. Please login again.",
          });
        }
        break;

      case "GET":
        const doc = await client
          .db(database.dbName)
          .collection("apis")
          .findOne();

        res.json(doc);
        break;
    }
  } catch (err) {
    res.json("Error, Please try again.");
  } finally {
    // Close the connection when the processing is done or an error occurs
    await client.close();
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
