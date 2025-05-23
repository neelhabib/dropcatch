import axios from "axios";
import { connectToMongoDB } from "../../../db";
import isLoggedIn from "../isLoggedIn";
export default async function handler(req, res) {
  try {
    // Create a new client for this request
    const { db } = await connectToMongoDB();
    switch (req.method) {
      case "POST": {
        const {
          api,
          secret,
          customerId,
          firstName,
          lastName,
          middleName,
          address1,
          address2,
          city,
          country,
          postalCode,
          state,
          email,
          org,
          phone,
          ns1,
          ns2,
          token,
        } = req.body;
        const tk = token?.token;
        if (isLoggedIn(tk)) {
          await db
            .collection("apis")
            .updateOne(
              {},
              {
                $set: {
                  godaddy: {
                    api,
                    secret,
                    customerId,
                    firstName,
                    lastName,
                    middleName,
                    address1,
                    address2,
                    city,
                    country,
                    postalCode,
                    state,
                    email,
                    org,
                    phone,
                    ns1,
                    ns2,
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
            .findOne({}, { projection: { godaddy: 1 } })
            .then((doc) => res.json(doc));
        }
        break;
      }
      case "DELETE": {
        const { token, api, secret, shopperId } = req?.body;

        if (isLoggedIn(token)) {
          const headers = {
            Authorization: `sso-key ${api}:${secret}`,
          };
          axios
            .get(
              `https://api.godaddy.com/v1/shoppers/${shopperId}?includes=customerId`,

              {
                headers,
              }
            )
            .then((x) => res.json(x.data))
            .catch((err) => {
              res.json("error", res.status(401).json(err.response?.data));
              // console.log(err.response.data);
            });
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
