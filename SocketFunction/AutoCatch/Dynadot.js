const axios = require("axios");
const { client } = require("../../db");
const dayjs = require("dayjs");

async function Dynadot(domain) {
  const apis = await client.db("drop-catch").collection("apis").findOne({});
  const { enableDynadot } = await client
    .db("drop-catch")
    .collection("auto-catch-domains")
    .findOne({}, { projection: { enableDynadot: 1 } });

  if (!enableDynadot) return; // Early exit if Godaddy is disabled
  const {
    dynadot: { api },
  } = apis;
  try {
    const data = await axios
      .get(
        `https://api.dynadot.com/api3.json?key=${api}&command=register&domain=${domain}&duration=1&currency=USD`
      )
      .then((res) => res.data);

    await client
      .db("drop-catch")
      .collection("api-responses")
      .insertOne({
        api: "dynadot",
        domain,
        status: data?.RegisterResponse?.Status,
        errorStatus: data?.RegisterResponse?.Status,
        responseCode: data?.RegisterResponse?.ResponseCode,
        date: dayjs().format("MM DD YYYY"),
      });
  } catch (error) {
    console.log(error);
  }
}
module.exports = Dynadot;
