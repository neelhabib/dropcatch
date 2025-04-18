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
        const { api, secret, token } = req.body;
        const tk = token?.token;
        if (isLoggedIn(tk)) {
          // Find the existing "spaceShip" entry, if it exists
          const spaceShipEntry = data?.apis?.find((x) => x?.spaceShip);

          if (spaceShipEntry) {
            // Update the existing spaceShip entry
            spaceShipEntry.spaceShip.secret = secret;
            spaceShipEntry.spaceShip.api = api;
          } else {
            // Insert a new spaceShip entry
            await db.update(({ apis }) =>
              apis.push({ spaceShip: { api, secret } })
            );
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
    // console.log(err);
    res.json("Error, Please try again.");
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
