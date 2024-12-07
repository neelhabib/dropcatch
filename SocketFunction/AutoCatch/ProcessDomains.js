const Whois = require("./Whois");
const Dynadot = require("./Dynadot");
const Godaddy = require("./Godaddy");
const NameCheap = require("./NameCheap");
const NameSilo = require("./NameSilo");

async function ProcessDomains(domains) {
  for (let domain of domains) {
    const whoisData = await Whois(domain);
    if (whoisData === "available") {
      Dynadot(domain);
      Godaddy(domain);
      NameCheap(domain);
      NameSilo(domain);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
module.exports = ProcessDomains;
