const WhoisLight = require("whois-light");
const axios = require("axios");
async function GodaddyDropCatch(socket, data) {
  const {
    domains,
    godaddyApi: {
      godaddy: { api, secret },
    },
  } = data;

  //`sso-key 3mM44UbgSaTnZa_k8GxyWC81cL93ub4i1FzV:UoKmqiHd1myEoSpqgC8rAQ`,

  try {
    const headers = {
      Authorization: `sso-key ${api}:${secret}`,
    };

    for (const domain of domains) {
      const body = {
        consent: {
          agreedAt: "2024-08-22T14:30:15Z",
          agreedBy: "irfan",
          agreementKeys: ["DNRA"],
        },
        contactAdmin: {
          addressMailing: {
            address1: "dsadsf",
            address2: "strisdfsdfng",
            city: "WestBengal",
            country: "IN",
            postalCode: "766565",
            state: "West Bengal",
          },
          email: "user@exampddle.com",
          fax: "+44.123 456 789",
          jobTitle: "strfsdfdsing",
          nameFirst: "psk",
          nameLast: "rpo",
          nameMiddle: "find",
          organization: "nothing",
          phone: "+44.123 456 789",
        },
        contactBilling: {
          addressMailing: {
            address1: "dsadsf",
            address2: "strisdfsdfng",
            city: "WestBengal",
            country: "IN",
            postalCode: "766565",
            state: "West Bengal",
          },
          email: "user@exampddle.com",
          fax: "+44.123 456 789",
          jobTitle: "strfsdfdsing",
          nameFirst: "psk",
          nameLast: "rpo",
          nameMiddle: "find",
          organization: "nothing",
          phone: "+44.123 456 789",
        },
        contactRegistrant: {
          addressMailing: {
            address1: "dsadsf",
            address2: "strisdfsdfng",
            city: "WestBengal",
            country: "IN",
            postalCode: "766565",
            state: "West Bengal",
          },
          email: "user@exampddle.com",
          fax: "+44.123 456 789",
          jobTitle: "strfsdfdsing",
          nameFirst: "psk",
          nameLast: "rpo",
          nameMiddle: "find",
          organization: "nothing",
          phone: "+44.123 456 789",
        },
        contactTech: {
          addressMailing: {
            address1: "dsadsf",
            address2: "strisdfsdfng",
            city: "WestBengal",
            country: "IN",
            postalCode: "766565",
            state: "West Bengal",
          },
          email: "user@exampddle.com",
          fax: "+44.123 456 789",
          jobTitle: "strfsdfdsing",
          nameFirst: "psk",
          nameLast: "rpo",
          nameMiddle: "find",
          organization: "nothing",
          phone: "+44.123 456 789",
        },
        domain: domain,
        nameServers: ["dsfsdf.ns.com", "asdf.ns.com"],
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
          console.log("error", err?.response?.data);
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
        .catch((err) => console.log(err));
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = GodaddyDropCatch;
