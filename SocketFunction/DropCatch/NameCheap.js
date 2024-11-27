const WhoisLight = require("whois-light");
const axios = require("axios");
const xml2js = require("xml2js");
const { client } = require("../../db");
const parser = new xml2js.Parser();
async function NameCheapDropCatch(socket, data) {
  try {
    const {
      domains,
      nameCheapApi: {
        nameCheap: { api, userName, clientIp },
      },
    } = data;
    for (const domain of domains) {
      axios
        .get(
          `https://api.sandbox.namecheap.com/xml.response?ApiUser=${userName}&ApiKey=${api}&UserName=${userName}&Command=namecheap.domains.create&ClientIp=${clientIp}&DomainName=${domain}&Years=1&AuxBillingFirstName=John&AuxBillingLastName=Smith&AuxBillingAddress1=8939%20S.cross%20Blv&AuxBillingStateProvince=CA&AuxBillingPostalCode=90045&AuxBillingCountry=US&AuxBillingPhone=+1.6613102107&AuxBillingEmailAddress=john@gmail.com&AuxBillingOrganizationName=NC&AuxBillingCity=CA&TechFirstName=John&TechLastName=Smith&TechAddress1=8939%20S.cross%20Blvd&TechStateProvince=CA&TechPostalCode=90045&TechCountry=US&TechPhone=+1.6613102107&TechEmailAddress=john@gmail.com&TechOrganizationName=NC&TechCity=CA&AdminFirstName=John&AdminLastName=Smith&AdminAddress1=8939%cross%20Blvd&AdminStateProvince=CA&AdminPostalCode=9004&AdminCountry=US&AdminPhone=+1.6613102107&AdminEmailAddress=joe@gmail.com&AdminOrganizationName=NC&AdminCity=CA&RegistrantFirstName=John&RegistrantLastName=Smith&RegistrantAddress1=8939%20S.cross%20Blvd&RegistrantStateProvince=CS&RegistrantPostalCode=90045&RegistrantCountry=US&RegistrantPhone=+1.6613102107&RegistrantEmailAddress=jo@gmail.com&RegistrantOrganizationName=NC&RegistrantCity=CA&AddFreeWhoisguard=no&WGEnabled=no&GenerateAdminOrderRefId=False&IsPremiumDomain=False&PremiumPrice=0&EapFee=0`
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
        .catch((err) => console.log(err));
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
