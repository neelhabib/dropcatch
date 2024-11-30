const WhoisLight = require("whois-light");
export default async function BulkWhois(req, respond) {
  const { domain } = req.body;
  // console.log(domain);
  WhoisLight.lookup({ format: true }, domain).then((res) => {
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
      respond.json(obj);
      // console.log(obj);
    } else {
      respond.json(res);
      // console.log(res);
      // respond.json(res);
    }
  });
}

export const config = {
  api: {
    externalResolver: true,
  },
};
