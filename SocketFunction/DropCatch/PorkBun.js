const WhoisLight = require("whois-light");
const axios = require("axios");

async function PorkBunDropCatch(socket, data) {
  try {
    const {
      domains,
      porkBunApi: {
        porkBun: { secretapikey, apikey },
      },
    } = data;

    const headers = {
      secretapikey,
      apikey,
    };

    for (const domain of domains) {
      const body = {
        name: domain,
        autoRenew: false,
        privacyProtection: { contactForm: true, level: "high" },
        nameservers: {
          provider: "basic",
          hosts: ["ns1.exampledomain.com", "ns2.exampledomain.com"],
        },
        contacts: {
          registrant: "1ZdMXpapqp9sle5dl8BlppTJXAzf5",
          admin: "1ZdMXpapqp9sle5dl8BlppTJXAzf6",
          tech: "1ZdMXpapqp9sle5dl8BlppTJXAzf5",
          billing: "1ZdMXpapqp9sle5dl8BlppTJXAzf5",
          attributes: ["1ZdMXpapqp9sle5dl8BlppTJXAzf8"],
        },
      };
      axios
        .post(`https://spaceship.dev/api/v1/domains/spaceship.com`, body, {
          headers,
        })
        .then((res) => {
          // console.log(res.data);
          socket.emit("spaceship-catched", {
            domain,
            status: res.data?.RegisterResponse?.Status,
            errorStatus: res.data?.RegisterResponse?.Status,
            responseCode: res.data?.RegisterResponse?.ResponseCode,
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
            socket.emit("spaceship-dropcatch", { whois: obj, domain });
            // respond.json(obj);
          } else {
            socket.emit("spaceship-dropcatch", { whois: res, domain });
          }
        })
        .catch((err) => err);
    }
  } catch (err) {
    // console.log(err);
  }
}

module.exports = SpaceShipDropCatch;
