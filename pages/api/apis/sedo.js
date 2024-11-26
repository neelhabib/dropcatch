import { client } from "../../../db";
export default async function handler(req, res) {
  const { signKey, partnerId, userName, password } = req.body;
  try {
    switch (req.method) {
      case "POST":
        const result = await client
          .db("localhost-server")
          .collection("sedo-api")
          .replaceOne(
            {},
            { signKey, partnerId, userName, password },
            { upsert: true }
          );

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

        break;

      case "GET":
        const doc = await client
          .db("localhost-server")
          .collection("sedo-api")
          .findOne();

        res.json(doc);
        break;
    }
  } catch (err) {
    console.log(err);
    res.json("Error, Please try again.");
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
