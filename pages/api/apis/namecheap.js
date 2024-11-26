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
        const { api, userName, clientIp, token } = req.body;
        const tk = token?.token;
        if (isLoggedIn(tk)) {
          // Find the existing "nameCheap" entry, if it exists
          const nameCheapEntry = data?.apis?.find((x) => x?.nameCheap);

          if (nameCheapEntry) {
            // Update the existing nameCheap entry
            nameCheapEntry.nameCheap.api = api;
            nameCheapEntry.nameCheap.userName = userName;
            nameCheapEntry.nameCheap.clientIp = clientIp;
          } else {
            // Insert a new nameCheap entry
            await db.update(({ apis }) =>
              apis.push({ nameCheap: { api, userName, clientIp } })
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
    console.log(err);
    res.json("Error, Please try again.");
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
