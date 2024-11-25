import isLoggedIn from "../isLoggedIn";
export default async function is_Logged_In(req, res) {
  const { token } = req.body;
  isLoggedIn(token)
    ? res.json({ status: true, message: "User Logged in" })
    : res.json({ status: false, message: "User not Logged in" });
}

export const config = { api: { externalResolver: true } };
