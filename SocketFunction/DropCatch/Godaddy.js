const WhoisLight = require("whois-light");
const axios = require("axios");
async function GodaddyDropCatch(socket, data) {
  const {
    domains,
    godaddyApi: {
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
    },
  } = data;

  try {
    const headers = {
      Authorization: `sso-key ${api}:${secret}`,
    };
    const now = new Date();
    const isoDate = now.toISOString();
    const isoDateWithoutMilliseconds = isoDate.split(".")[0] + "Z";
    for (const domain of domains) {
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
      axios
        .post(`https://api.ote-godaddy.com/v1/domains/purchase`, body, {
          headers,
        })
        .then((res) => {
          socket.emit("godaddy-catched", {
            domain,
            status: res.data?.code || "success",
            errorStatus: res.data?.message || "",
            responseCode: res.data?.itemCount,
          });
        })
        .catch((err) => {
          console.log(err?.response?.data?.fields);
          socket.emit("godaddy-catched", {
            domain,
            status: err?.response?.data?.code || "success",
            errorStatus: err?.response?.data?.message || "success",
            responseCode: err?.response?.data?.itemCount,
          });
        });
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
            socket.emit("godaddy-dropcatch", obj);
            // respond.json(obj);
          } else {
            socket.emit("godaddy-dropcatch", res);
          }
        })
        .catch((err) => err);
    }
  } catch (err) {
    console.log("some error occurred");
  }
}
module.exports = GodaddyDropCatch;
