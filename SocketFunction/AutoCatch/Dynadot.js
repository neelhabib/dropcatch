const axios = require("axios");
const { connectToMongoDB } = require("../../db");
const dayjs = require("dayjs");

async function Dynadot(domain) {
  try {
    const { db } = await connectToMongoDB();
    const apis = await db.collection("apis").findOne({});
    const { enableDynadot } = await await db
      .collection("auto-catch-domains")
      .findOne({}, { projection: { enableDynadot: 1 } });

    if (!enableDynadot) return; // Early exit if Godaddy is disabled
    const {
      dynadot: { api },
    } = apis;
    const data = await axios
      .get(
        `https://api.dynadot.com/api3.json?key=${api}&command=register&domain=${domain}&duration=1&currency=USD`
      )
      .then((res) => res.data);

    await await db.collection("api-responses").insertOne({
      api: "dynadot",
      domain,
      status: data?.RegisterResponse?.Status,
      errorStatus: data?.RegisterResponse?.Status,
      responseCode: data?.RegisterResponse?.ResponseCode,
      date: dayjs().format("D MMM YYYY"),
      time: dayjs().format("HH:mm:ss"),
    });
  } catch (error) {
  } finally {
  }
}
module.exports = Dynadot;
