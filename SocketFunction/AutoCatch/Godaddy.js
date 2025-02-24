const axios = require("axios");
const { client } = require("../../db");
const dayjs = require("dayjs");

async function Godaddy(domain) {
  const apis = await client.db("drop-catch").collection("apis").findOne({});
  const { enableGodaddy } = await client
    .db("drop-catch")
    .collection("auto-catch-domains")
    .findOne({}, { projection: { enableGodaddy: 1 } });

  if (!enableGodaddy) return; // Early exit if Godaddy is disabled

  const {
    godaddy: {
      api,
      secret,
      firstName,
      lastName,
      middleName,
      address1,
      address2,
      city,
      country,
      postalCode,
      state,
      email,
      org,
      phone,
      ns1,
      ns2,
    },
  } = apis;
  const now = new Date();
  const isoDate = now.toISOString();
  const isoDateWithoutMilliseconds = isoDate.split(".")[0] + "Z";
  const body = {
    consent: {
      agreedAt: isoDateWithoutMilliseconds,
      agreedBy: firstName,
      agreementKeys: ["DNRA"],
    },
    contactAdmin: {
      addressMailing: {
        address1: address1,
        address2: address2,
        city: city,
        country,
        postalCode: postalCode,
        state: state,
      },
      email: email,
      fax: phone,
      jobTitle: "Investor",
      nameFirst: firstName,
      nameLast: lastName,
      nameMiddle: middleName,
      organization: org,
      phone: phone,
    },
    contactBilling: {
      addressMailing: {
        address1: address1,
        address2: address2,
        city: city,
        country,
        postalCode: postalCode,
        state,
      },
      email,
      fax: phone,
      jobTitle: "Investor",
      nameFirst: firstName,
      nameLast: lastName,
      nameMiddle: middleName,
      organization: org,
      phone: phone,
    },
    contactRegistrant: {
      addressMailing: {
        address1: address1,
        address2: address2,
        city: city,
        country,
        postalCode: postalCode,
        state,
      },
      email,
      fax: phone,
      jobTitle: "Investor",
      nameFirst: firstName,
      nameLast: lastName,
      nameMiddle: middleName,
      organization: org,
      phone: phone,
    },
    contactTech: {
      addressMailing: {
        address1: address1,
        address2: address2,
        city: city,
        country,
        postalCode: postalCode,
        state,
      },
      email,
      fax: phone,
      jobTitle: "Investor",
      nameFirst: firstName,
      nameLast: lastName,
      nameMiddle: middleName,
      organization: org,
      phone: phone,
    },
    domain: domain,
    nameServers: [ns1, ns2],
    period: 1,
    privacy: false,
    renewAuto: true,
  };

  const headers = {
    Authorization: `sso-key ${api}:${secret}`,
  };
  try {
    const data = await axios
      .post(`https://api.godaddy.com/v1/domains/purchase`, body, {
        headers,
      })
      .then((res) => res?.data);

    await client
      .db("drop-catch")
      .collection("api-responses")
      .insertOne({
        api: "godaddy",
        domain,
        status: data?.code || "success",
        errorStatus: data?.message || "",
        responseCode: data?.itemCount,
        date: dayjs().format("D MMM YYYY"),
      });
  } catch (err) {
    // console.log(error?.response?.data?.fields);
    await client
      .db("drop-catch")
      .collection("api-responses")
      .insertOne({
        domain,
        status: err?.response?.data?.code || "failed",
        errorStatus: err?.response?.data?.message || "failed",
        responseCode: err?.response?.data?.itemCount || "0",
        date: dayjs().format("D MMM YYYY"),
        time: dayjs().format("HH:mm:ss"),
      });
  }
}
module.exports = Godaddy;
