const axios = require("axios");
const { connectToMongoDB } = require("../../db");
const dayjs = require("dayjs");

async function NameSilo(domain) {
  try {
    const { db } = await connectToMongoDB();
    const apis = await db.collection("apis").findOne({});
    const { enableNameSilo } = await await db
      .collection("auto-catch-domains")
      .findOne({}, { projection: { enableNameSilo: 1 } });

    if (!enableNameSilo) return; // Early exit if Godaddy is disabled
    const {
      nameSilo: { api },
    } = apis;

    const data = await axios
      .get(
        `https://www.namesilo.com/api/registerDomain?version=1&type=json&key=${api}&domain=${domain}&years=1&private=1&auto_renew=0`
      )
      .then((res) => res.data);
    await await db.collection("api-responses").insertOne({
      api: "namesilo",
      domain,
      status: data?.reply?.detail !== "success" ? "Failed" : "success",
      errorStatus: data?.reply?.detail,
      responseCode: data?.reply?.code,
      date: dayjs().format("D MMM YYYY"),
      time: dayjs().format("HH:mm:ss"),
    });
  } catch (error) {
    // console.log(error);
  } finally {
  }
}
module.exports = NameSilo;
