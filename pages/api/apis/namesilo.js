import { connectToMongoDB } from "../../../db";
import isLoggedIn from "../isLoggedIn";
export default async function handler(req, res) {
  try {
    // Create a new client for this request
    const { db } = await connectToMongoDB();
    switch (req.method) {
      case "POST": {
        const { api, token } = req.body;
        const tk = token?.token;
        if (isLoggedIn(tk)) {
          await db
            .collection("apis")
            .updateOne(
              {},
              {
                $set: {
                  nameSilo: {
                    api,
                  },
                },
              },
              { upsert: true }
            )
            .then((doc) => {
              res.json({ status: true, message: "API Updated." });
            })
            .catch((err) => {
              res.json({
                status: true,
                message: "Some Error Occurred. Please try again.",
              });
            });
        } else {
          res.json({ status: true, message: "Login Expired. Login again." });
        }

        break;
      }

      case "GET": {
        if (isLoggedIn(req?.query?.token)) {
          await db
            .collection("apis")
            .findOne({}, { projection: { nameSilo: 1 } })
            .then((doc) => res.json(doc));
        }
        break;
      }
    }
  } catch (err) {
    // console.log(err);
    res.json("Error, Please try again.");
  } finally {
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
