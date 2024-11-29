const WhoisLight = require("whois-light");
const axios = require("axios");

async function NameSiloDropCatch(socket, data) {
  try {
    const {
      domains,
      nameSiloApi: {
        nameSilo: { api },
      },
    } = data;
    for (const domain of domains) {
      axios
        .get(
          `https://www.namesilo.com/api/registerDomain?version=1&type=json&key=${api}&domain=${domain}&years=1&private=1&auto_renew=0`
        )
        .then((res) => {
          socket.emit("namesilo-catched", {
            domain,
            status:
              res.data?.reply?.detail !== "success" ? "Failed" : "Success",
            errorStatus: res.data?.reply?.detail,
            responseCode: res.data?.reply?.code,
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
            socket.emit("namesilo-dropcatch", obj);
            // respond.json(obj);
          } else {
            socket.emit("namesilo-dropcatch", res);
          }
        })
        .catch((err) => console.log(err));
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = NameSiloDropCatch;
