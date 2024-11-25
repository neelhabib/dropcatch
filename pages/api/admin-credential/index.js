import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import isLoggedIn from "../isLoggedIn";

export default async function handler(req, res) {
  const { adminId, adminPassword, analyticId } = req.body;
  const token = req.body?.token?.token;
  const filePath = path.join(
    process.cwd(),
    "pages",
    "api",
    "admin-credential",
    "admin-credential.json",
  );
  switch (req.method) {
    // post method to update admin credential
    case "POST":
      if (!adminId || !adminPassword) res.status(422).json("Invalid Input");
      if (isLoggedIn(token)) {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(adminPassword, salt, function (err, hash) {
            fs.writeFile(
              filePath,
              JSON.stringify({ adminId, adminPassword: hash, analyticId }),
              (err) => {
                if (err) res.json("Some error occurred, please try again.");
                res.json({
                  status: true,
                  message: "Updated successfully",
                });
              },
            );
          });
        });
      } else {
        res.json({
          status: false,
          message: "Some error occurred. Please login again.",
        });
      }

      return;

    // get method to get admin credential
    case "GET":
      try {
        const data = fs.readFileSync(filePath, "utf-8");
        const credential = JSON.parse(data);
        res.json({
          adminId: credential.adminId,
          analyticId: credential.analyticId,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error reading from file" });
      }
  }
}
export const config = {
  api: {
    externalResolver: true,
  },
};
