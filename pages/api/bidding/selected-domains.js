import { client } from "../../../db";
import isLoggedIn from "../isLoggedIn";
export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST": {
        if (isLoggedIn(req.body?.token)) {
          client
            .db("drop-catch")
            .collection("domain-auction")
            .updateOne(
              { fqdn: req?.body?.data?.fqdn },
              { $set: req?.body?.data },
              { upsert: true }
            )
            .then((doc) => res.json(doc))
            .catch((err) => {
              // console.log(err);
              res.json("error");
            });
        }
        break;
      }
      case "GET": {
        const { token } = req.query;
        if (isLoggedIn(token)) {
          client
            .db("drop-catch")
            .collection("domain-auction")
            .find()
            .toArray()
            .then((doc) => res.json(doc));
        }

        break;
      }
      case "DELETE": {
        const { token } = req.body;

        if (isLoggedIn(token)) {
          client
            .db("drop-catch")
            .collection("domain-auction")
            .deleteMany({})
            .then((doc) => {
              if (doc?.deletedCount > 0) {
                res.json({
                  status: true,
                  message: `Deleted all ${doc?.deletedCount} domains. You need to add domains again.`,
                });
              } else {
                res.json({
                  status: false,
                  message: "No Domains were added. Please add some domains.",
                });
              }
            })
            .catch((err) =>
              res.json({ status: false, message: "Some error occurred." })
            );
        }
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
