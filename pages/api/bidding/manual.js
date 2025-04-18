import isLoggedIn from "../isLoggedIn";

const axios = require("axios");
export default async function ManualBidding(req, res) {
  const {
    apis: {
      godaddy: { api, secret, customerId },
    },
    token,
    listingId,
  } = req.body;

  const headers = {
    Authorization: `sso-key ${api}:${secret}`,
  };

  const body = [
    {
      bidAmountUsd: 115000000,
      tosAccepted: true,
      listingId: Number(listingId),
    },
  ];
  try {
    switch (req.method) {
      case "POST":
        if (isLoggedIn(token)) {
          axios
            .post(
              `https://api.ote-godaddy.com/v1/customers/${customerId}/aftermarket/listings/bids`,
              body,
              {
                headers,
              }
            )
            .then((x) => {
              res.json("successs");
            })
            .catch((err) => {
              // console.log("some error", err);
              res.json("error");
            });
          break;
        }
    }
  } catch (err) {
    // console.log("some error occurred");
  }
}
export const config = {
  api: {
    externalResolver: true,
  },
};
