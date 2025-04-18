const axios = require("axios");

async function MultiBidding(socket) {
  socket.on("multi-bidding", ({ apis, domains }) => {
    if (domains?.length > 0) {
      const {
        godaddy: { api, secret, customerId },
      } = apis;
      // Headers
      const headers = {
        Authorization: `sso-key ${api}:${secret}`,
      };
      // Bidding body
      const body = domains?.map((x) => ({
        bidAmountUsd: Number(x?.bidAmount) * 1_000_000,
        tosAccepted: true,
        listingId: Number(x?.auction_id),
      }));

      axios
        .post(
          `https://api.ote-godaddy.com/v1/customers/${customerId}/aftermarket/listings/bids`,
          body,
          {
            headers,
          }
        )
        .then((res) => {
          const results = res.data?.map((x) => ({
            domain: domains?.find((d) => d?.auction_id === x?.listingId)?.fqdn,
            listingId: x?.listingId,
            isHighestBidder: x?.isHighestBidder,
            bidId: x?.bidId,
            bidAmountUsd: x?.bidAmountUsd,
            status: x?.status,
            bidFailureReason: x?.bidFailureReason,
          }));
          socket.emit("multi-bidding", results);
        })
        .catch((err) => {
          // console.log("some error", err?.response?.data);
          socket.emit("multi-bidding", [
            {
              domain: "Error",
              listingId: "Error",
              bidAmountUsd: "Error",
              status: "Error",
              code: err?.response?.data?.code || "",
              message: err?.response?.data?.message || err?.response?.data,
            },
          ]);
        });
    }
  });
}
module.exports = MultiBidding;
