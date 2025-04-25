import isLoggedIn from "../isLoggedIn";
import { connectToMongoDB } from "../../../db";
export default async function handler(req, res) {
  try {
    // Create a new client for this request
    const { db } = await connectToMongoDB();
    switch (req.method) {
      case "GET": {
        if (isLoggedIn(req?.query?.token)) {
          await db
            .collection("apis")
            .findOne({}, { projection: { id: 0 } })
            .then((doc) => res.json(doc));
        }
        break;
      }
    }
  } catch (err) {
    // console.log(err);
    res.json("Error, Please try again.");
  } finally {
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
