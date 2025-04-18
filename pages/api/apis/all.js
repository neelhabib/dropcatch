import isLoggedIn from "../isLoggedIn";
import { client } from "../../../db";
export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET": {
        if (isLoggedIn(req?.query?.token)) {
          client
            .db("drop-catch")
            .collection("apis")
            .findOne({}, { projection: { id: 0 } })
            .then((doc) => res.json(doc));
        }
        break;
      }
    }
  } catch (err) {
    // console.log(err);
    res.json("Error, Please try again.");
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
