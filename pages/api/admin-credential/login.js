import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// jwt secret key for token. You can use any random string here.
const secretKey = "580f364d-9473-49bb-a4f7-c01c735c3eeb";

const filePath = path.join(
  process.cwd(),
  "pages",
  "api",
  "admin-credential",
  "admin-credential.json"
);
export default async function handler(req, res) {
  const { adminId, adminPassword } = req.body;
  switch (req.method) {
    // post method to check admin credential
    case "POST":
      fs.readFile(filePath, "utf-8", (err, data) => {
        const credential = JSON.parse(data);
        if (err) {
          return res.status(500).json("Something went wrong");
        }

        if (credential.adminId === adminId) {
          const token = jwt.sign({ adminId }, secretKey, { expiresIn: "9h" });

          bcrypt
            .compare(adminPassword, credential.adminPassword)
            .then((result) => {
              if (result) {
                res.json({
                  status: true,
                  message: "Successfully Logged In",
                  token,
                });
              } else {
                res.json({ status: false, message: "Invalid Credentials" });
              }
            });
        } else {
          res.json({ status: false, message: "Invalid Credentials" });
        }
      });
  }
}
export const config = { api: { externalResolver: true } };
