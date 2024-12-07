const axios = require("axios");
const { client } = require("../../db");
const dayjs = require("dayjs");

async function NameSilo(domain) {
  const apis = await client.db("drop-catch").collection("apis").findOne({});
  const { enableNameSilo } = await client
    .db("drop-catch")
    .collection("auto-catch-domains")
    .findOne({}, { projection: { enableNameSilo: 1 } });

  if (!enableNameSilo) return; // Early exit if Godaddy is disabled
  const {
    nameSilo: { api },
  } = apis;

  try {
    const data = await axios
      .get(
        `https://www.namesilo.com/api/registerDomain?version=1&type=json&key=${api}&domain=${domain}&years=1&private=1&auto_renew=0`
      )
      .then((res) => res.data);
    await client
      .db("drop-catch")
      .collection("api-responses")
      .insertOne({
        api: "namesilo",
        domain,
        status: data?.reply?.detail !== "success" ? "Failed" : "success",
        errorStatus: data?.reply?.detail,
        responseCode: data?.reply?.code,
        date: dayjs().format("MM DD YYYY"),
      });
  } catch (error) {
    console.log(error);
  }
}
module.exports = NameSilo;
