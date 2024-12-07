import { client } from "../../../db";
import isLoggedIn from "../isLoggedIn";
export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST": {
        const {
          api,
          userName,
          clientIp,
          firstName,
          lastName,
          address1,
          city,
          country,
          postalCode,
          state,
          email,
          org,
          phone,
          token,
        } = req.body;
        const tk = token?.token;
        if (isLoggedIn(tk)) {
          client
            .db("drop-catch")
            .collection("apis")
            .updateOne(
              {},
              {
                $set: {
                  nameCheap: {
                    api,
                    userName,
                    clientIp,
                    firstName,
                    lastName,
                    address1,
                    city,
                    country,
                    postalCode,
                    state,
                    email,
                    org,
                    phone,
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
          client
            .db("drop-catch")
            .collection("apis")
            .findOne({}, { projection: { nameCheap: 1 } })
            .then((doc) => res.json(doc));
        }
        break;
      }
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
