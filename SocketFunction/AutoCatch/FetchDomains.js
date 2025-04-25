const { connectToMongoDB } = require("../../db");

async function FetchDomains() {
  try {
    const { db } = await connectToMongoDB();
    const domains = await await db
      .collection("auto-catch-domains")
      .findOne({}, { projection: { _id: 0 } });

    return domains;
  } catch (error) {
    console.error("Error fetching domains:", error);
    return [];
  } finally {
  }
}
module.exports = FetchDomains;
