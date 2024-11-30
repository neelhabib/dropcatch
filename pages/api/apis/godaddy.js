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
          secret,
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
          // Find the existing "godaddy" entry, if it exists
          const godaddyEntry = data?.apis?.find((x) => x?.godaddy);

          if (godaddyEntry) {
            // Update the existing godaddy entry
            godaddyEntry.godaddy.secret = secret;
            godaddyEntry.godaddy.api = api;
            godaddyEntry.godaddy.firstName = firstName;
            godaddyEntry.godaddy.lastName = lastName;
            godaddyEntry.godaddy.middleName = middleName;
            godaddyEntry.godaddy.address1 = address1;
            godaddyEntry.godaddy.address2 = address2;
            godaddyEntry.godaddy.city = city;
            godaddyEntry.godaddy.country = country;
            godaddyEntry.godaddy.postalCode = postalCode;
            godaddyEntry.godaddy.state = state;
            godaddyEntry.godaddy.email = email;
            godaddyEntry.godaddy.org = org;
            godaddyEntry.godaddy.phone = phone;
            godaddyEntry.godaddy.ns1 = ns1;
            godaddyEntry.godaddy.ns2 = ns2;
          } else {
            // Insert a new godaddy entry
            await db.update(({ apis }) =>
              apis.push({
                godaddy: {
                  api,
                  secret,
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
