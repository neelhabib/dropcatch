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
          // Find the existing "nameCheap" entry, if it exists
          const nameCheapEntry = data?.apis?.find((x) => x?.nameCheap);

          if (nameCheapEntry) {
            // Update the existing nameCheap entry
            nameCheapEntry.nameCheap.api = api;
            nameCheapEntry.nameCheap.userName = userName;
            nameCheapEntry.nameCheap.clientIp = clientIp;
            nameCheapEntry.nameCheap.firstName = firstName;
            nameCheapEntry.nameCheap.lastName = lastName;
            nameCheapEntry.nameCheap.address1 = address1;
            nameCheapEntry.nameCheap.city = city;
            nameCheapEntry.nameCheap.country = country;
            nameCheapEntry.nameCheap.postalCode = postalCode;
            nameCheapEntry.nameCheap.state = state;
            nameCheapEntry.nameCheap.email = email;
            nameCheapEntry.nameCheap.org = org;
            nameCheapEntry.nameCheap.phone = phone;
          } else {
            // Insert a new nameCheap entry
            await db.update(({ apis }) =>
              apis.push({
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
              })
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
