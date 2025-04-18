import isLoggedIn from "../isLoggedIn";
import { client } from "../../../db";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        if (isLoggedIn(req.body.token)) {
          client
            .db("drop-catch")
            .collection("api-responses")
            .deleteMany({})
            .then((result) => {
              if (result?.deletedCount > 0) {
                res.json(`Deleted ${result?.deletedCount} items from database`);
              } else {
                res.json("No items to delete or already deleted.");
              }
            })
            .catch((err) =>
              res.status(500).json("Some error occurred. Please try again")
            );
        }
        break;

      case "GET":
        if (isLoggedIn(req?.query?.token)) {
          client
            .db("drop-catch")
            .collection("api-responses")
            .find()
            .sort({ _id: -1 })
            .project({ _id: 0 })
            .toArray()
            .then((docs) => res.json(docs));
        }
        break;
    }
  } catch (err) {
    // console.log(err);
    res.json({ status: false, message: "Error, Please try again." });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
