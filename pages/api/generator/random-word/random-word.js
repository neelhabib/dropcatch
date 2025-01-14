import axios from "axios";
import { MongoClient } from "mongodb";
import path from "path";
import fs from "fs";
const filePath = path.join(process.cwd(), "db.json");
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

export default async function handler(req, res) {
  const data = fs.readFileSync(filePath, "utf-8");
  const database = JSON.parse(data);
  const client = new MongoClient(database.db);
  const params = {
    names: req.body?.words?.toString(),
    tlds: req.body?.ext,
    "include-registered": true,
  };
  //
  const domains = req.body?.words?.map((x) => x?.concat(`.${req.body?.ext}`));

  try {
    await client.connect();

    const api = await client
      .db(database.dbName)
      .collection("apis")
      .findOne({})
      .then((docs) => docs?.apis);

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
        .catch((err) => console.log(err));
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
    res.json("Something is wrong, please try again.");
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
