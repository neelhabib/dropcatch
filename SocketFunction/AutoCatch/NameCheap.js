const axios = require("axios");
const { client } = require("../../db");
const xml2js = require("xml2js");
const dayjs = require("dayjs");
const parser = new xml2js.Parser();

async function NameCheap(domain) {
  const apis = await client.db("drop-catch").collection("apis").findOne({});
  const { enableNameCheap } = await client
    .db("drop-catch")
    .collection("auto-catch-domains")
    .findOne({}, { projection: { enableNameCheap: 1 } });

  if (!enableNameCheap) return; // Early exit if Godaddy is disabled
  const {
    nameCheap: {
      api,
      userName,
      clientIp,
      firstName,
      lastName,
      address1,
      city,
      country,
      postalCode,
      state,
      email,
      org,
      phone,
    },
  } = apis;
  try {
    const data = await axios
      .get(
        `https://api.namecheap.com/xml.response?ApiUser=${userName}&ApiKey=${api}&UserName=${userName}&Command=namecheap.domains.create&ClientIp=${clientIp}&DomainName=${domain}&Years=1&AuxBillingFirstName=${firstName}&AuxBillingLastName=${lastName}&AuxBillingAddress1=${address1}&AuxBillingStateProvince=${state}&AuxBillingPostalCode=${postalCode}&AuxBillingCountry=${country}&AuxBillingPhone=${phone}&AuxBillingEmailAddress=${email}&AuxBillingOrganizationName=${org}&AuxBillingCity=${city}&TechFirstName=${firstName}&TechLastName=${lastName}&TechAddress1=${address1}&TechStateProvince=${state}&TechPostalCode=${postalCode}&TechCountry=${country}&TechPhone=${phone}&TechEmailAddress=${email}&TechOrganizationName=${org}&TechCity=${city}&AdminFirstName=${firstName}&AdminLastName=${lastName}&AdminAddress1=${address1}&AdminStateProvince=${state}&AdminPostalCode=${postalCode}&AdminCountry=${country}&AdminPhone=${phone}&AdminEmailAddress=${email}&AdminOrganizationName=${org}&AdminCity=${city}&RegistrantFirstName=${firstName}&RegistrantLastName=${lastName}&RegistrantAddress1=${address1}&RegistrantStateProvince=${state}&RegistrantPostalCode=${postalCode}&RegistrantCountry=${country}&RegistrantPhone=${phone}&RegistrantEmailAddress=${email}&RegistrantOrganizationName=${org}&RegistrantCity=${city}&AddFreeWhoisguard=no&WGEnabled=no&GenerateAdminOrderRefId=False&IsPremiumDomain=False&PremiumPrice=0&EapFee=0`
      )
      .then((res) => {
        parser.parseString(res.data, (err, json) => {
          err && console.log(err);

          client
            .db("drop-catch")
            .collection("api-responses")
            .insertOne({
              api: "namecheap",
              domain,
              status:
                json?.ApiResponse?.$?.Status === "OK"
                  ? "success"
                  : json?.ApiResponse?.$?.Status,
              errorStatus: json?.ApiResponse?.Errors?.[0]?.Error?.[0]?._,
              responseCode:
                json?.ApiResponse?.Errors?.[0]?.Error?.[0]?.$?.Number,
              date: dayjs().format("D MMM YYYY"),
              time: dayjs().format("HH:mm:ss"),
            });
        });
      });
  } catch (error) {
    console.log(error);
  }
}
module.exports = NameCheap;
