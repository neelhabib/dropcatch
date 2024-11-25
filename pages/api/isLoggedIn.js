import jwt from "jsonwebtoken";
// jwt secret key for token. You can use any random string here.
const secretKey = "580f364d-9473-49bb-a4f7-c01c735c3eeb";

export default function isLoggedIn(token) {
  try {
    jwt.verify(token, secretKey);
    return true;
  } catch (err) {
    return false;
  }
}
