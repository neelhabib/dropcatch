import isLoggedIn from "../isLoggedIn";
import { client } from "../../../db";
export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET": {
        if (isLoggedIn(req?.query?.token)) {
          client
            .db("drop-catch")
            .collection("api-responses")
            .find()
            .toArray()
            .then((docs) => res.json(docs));
        }
        break;
      }
    }
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: "Error, Please try again." });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
