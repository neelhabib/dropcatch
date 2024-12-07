const { client } = require("../../db");

async function FetchDomains() {
  try {
    const domains = await client
      .db("drop-catch")
      .collection("auto-catch-domains")
      .findOne({}, { projection: { _id: 0 } });

    return domains;
  } catch (error) {
    console.error("Error fetching domains:", error);
    return [];
  }
}
module.exports = FetchDomains;
