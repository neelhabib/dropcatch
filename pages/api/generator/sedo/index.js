const sedoUrl = "https://api.sedo.com/api/v1/?wsdl";
const soap = require("soap");

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        const args = {
          partnerid: "327338", // doc.sedoPartnerId,
          signkey: "f1200c40a7d8c36941d7e262fb6c07", //doc.sedoSignKey,
          keyword: req.body?.value,
          tld: "com, net, org",
          kwtype: "C",
          no_hyphen: true,
          no_numeral: true,
          no_idn: true,
          resultsize: 100,
          language: "en",
        };
        soap.createClient(sedoUrl, function (err, clients) {
          clients.DomainSearch({ args }, function (err, result) {
            err && console.log("err");
            // console.log(result.return.item);
            res.json(result?.return?.item);
          });
        });

        break;
    }
  } catch (error) {
    console.log("some error occurred");
  }
}
export const config = {
  api: {
    externalResolver: true,
  },
};
