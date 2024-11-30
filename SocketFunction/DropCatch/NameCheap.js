const WhoisLight = require("whois-light");
const axios = require("axios");
const xml2js = require("xml2js");
const parser = new xml2js.Parser();

async function NameCheapDropCatch(socket, data) {
  try {
    const {
      domains,
      nameCheapApi: {
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
      },
    } = data;

    for (const domain of domains) {
      axios
        .get(
          `https://api.sandbox.namecheap.com/xml.response?ApiUser=${userName}&ApiKey=${api}&UserName=${userName}&Command=namecheap.domains.create&ClientIp=${clientIp}&DomainName=${domain}&Years=1&AuxBillingFirstName=${firstName}&AuxBillingLastName=${lastName}&AuxBillingAddress1=${address1}&AuxBillingStateProvince=${state}&AuxBillingPostalCode=${postalCode}&AuxBillingCountry=${country}&AuxBillingPhone=${phone}&AuxBillingEmailAddress=${email}&AuxBillingOrganizationName=${org}&AuxBillingCity=${city}&TechFirstName=${firstName}&TechLastName=${lastName}&TechAddress1=${address1}&TechStateProvince=${state}&TechPostalCode=${postalCode}&TechCountry=${country}&TechPhone=${phone}&TechEmailAddress=${email}&TechOrganizationName=${org}&TechCity=${city}&AdminFirstName=${firstName}&AdminLastName=${lastName}&AdminAddress1=${address1}&AdminStateProvince=${state}&AdminPostalCode=${postalCode}&AdminCountry=${country}&AdminPhone=${phone}&AdminEmailAddress=${email}&AdminOrganizationName=${org}&AdminCity=${city}&RegistrantFirstName=${firstName}&RegistrantLastName=${lastName}&RegistrantAddress1=${address1}&RegistrantStateProvince=${state}&RegistrantPostalCode=${postalCode}&RegistrantCountry=${country}&RegistrantPhone=${phone}&RegistrantEmailAddress=${email}&RegistrantOrganizationName=${org}&RegistrantCity=${city}&AddFreeWhoisguard=no&WGEnabled=no&GenerateAdminOrderRefId=False&IsPremiumDomain=False&PremiumPrice=0&EapFee=0`
        )
        .then((res) => {
          parser.parseString(res.data, (err, json) => {
            err && console.log(err);
            socket.emit("namecheap-catched", {
              domain,
              status: json?.ApiResponse?.$?.Status,
              errorStatus: json?.ApiResponse?.Errors?.[0]?.Error?.[0]?._,
              responseCode:
                json?.ApiResponse?.Errors?.[0]?.Error?.[0]?.$?.Number,
            });
          });
        })
        .catch((err) => err);
    }

    for (const domain of domains) {
      WhoisLight.lookup({ format: true }, domain)
        .then((res) => {
          if (domain.toLowerCase().includes(".uk" || ".co.uk")) {
            const raw = res._raw
              .split("\r\n")
              .map((x) => x.split("\n"))
              .join(":")
              .split(":")
              .map((x) => x.trim())
              .filter((x) => x);
            const chunkSize = 2;
            let obj = {};
            let arr = [];
            for (let i = 0; i < raw.length; i += chunkSize) {
              const chunk = raw.slice(i, i + chunkSize);
              arr.push(chunk);
            }
            arr.map((x) => (obj[x[0]] = x[1]));
            socket.emit("namecheap-dropcatch", obj);
            // respond.json(obj);
          } else {
            socket.emit("namecheap-dropcatch", res);
          }
        })
        .catch((err) => console.log(err));
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = NameCheapDropCatch;
