const axios = require("axios");
import { generate } from "random-words";

const words = generate({
  exactly: 30,
  maxLength: 15,
  formatter: (word, index) => {
    return index === 0
      ? word.slice(0, 1).toUpperCase().concat(word.slice(1))
      : word;
  },
});
export default async function handler(req, res) {
  const params = {
    names: words.toString(),
    tlds: "com",
    "include-registered": true,
  };
  axios
    .get("https://sugapi.verisign-grs.com/ns-api/2.0/bulk-check?", {
      params,
    })
    .then((respond) =>
      res.json(
        respond.data.results.map((x) => ({
          domain: x.name,
          availability: x.availability,
        }))
      )
    )
    .catch((err) => console.log("error"));
}
export const config = {
  api: {
    externalResolver: true,
  },
};
