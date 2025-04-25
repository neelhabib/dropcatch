import axios from "axios";

const extensions = [
  "co",
  "co.in",
  "in",
  "ai",
  "co.uk",
  "io",
  "us",
  "ca",
  "de",
  "cn",
];

import { connectToMongoDB } from "../../../../db";
export default async function handler(req, res) {
  const params = {
    names: req.body?.words?.toString(),
    tlds: req.body?.ext,
    "include-registered": true,
  };
  //
  const domains = req.body?.words?.map((x) => x?.concat(`.${req.body?.ext}`));

  try {
    // Create a new client for this request
    const { db } = await connectToMongoDB();

    const api = await db
      .collection("apis")
      .findOne({})
      .then((docs) => docs?.godaddy);

    if (extensions?.filter((x) => x === req.body?.ext).length > 0) {
      const headers = {
        Authorization: `sso-key ${api?.api}:${api?.secret}`,
      };

      axios
        .post(
          `https://api.ote-godaddy.com/v1/domains/available?checkType=FULL`,
          domains,
          { headers }
        )
        .then((respond) => {
          res.json(
            respond.data?.domains?.map((x) => ({
              domain: x?.domain,
              availability: x?.available ? "available" : "registered",
            }))
          );
        })
        .catch((err) => {
          res.json([
            {
              domain: "Too many request, try again",
              availability: "registered",
            },
          ]);
        })
        .catch((err) => err);
    } else {
      const data = await axios
        .get("https://sugapi.verisign-grs.com/ns-api/2.0/bulk-check?", {
          params,
        })
        .then((response) => response.data);
      const results = data?.results;
      const num = data?.results.length;
      res.json(
        results?.map((x) => ({
          domain: x.name,
          availability: x.availability,
        }))
      );
    }
  } catch (err) {
    console.error(err);
    res.json([{ domain: "Something is wrong, please try again." }]);
  } finally {
    // Close the connection when the processing is done or an error occurs
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
