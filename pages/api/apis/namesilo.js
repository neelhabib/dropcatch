import { JSONFilePreset } from "lowdb/node";
import path from "path";
import isLoggedIn from "../isLoggedIn";
export default async function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "api.json");
    const apiData = { apis: [] };
    const db = await JSONFilePreset(filePath, apiData);
    const data = db.data;

    switch (req.method) {
      case "POST": {
        const { api, token } = req.body;
        const tk = token?.token;
        if (isLoggedIn(tk)) {
          // Find the existing "nameSilo" entry, if it exists
          const nameSiloEntry = data?.apis?.find((x) => x?.nameSilo);

          if (nameSiloEntry) {
            // Update the existing nameSilo entry
            nameSiloEntry.nameSilo.api = api;
          } else {
            // Insert a new nameSilo entry
            await db.update(({ apis }) => apis.push({ nameSilo: { api } }));
          }
          await db.write();
          res.json({ status: true, message: "API Updated." });
        } else {
          res.json({ status: true, message: "Login Expired. Login again." });
        }

        break;
      }

      case "GET": {
        if (isLoggedIn(req?.query?.token)) {
          res.json(data);
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
