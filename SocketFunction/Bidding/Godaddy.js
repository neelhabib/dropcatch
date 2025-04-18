const { default: axios } = require("axios");

async function GodaddyAuctionBidding(socket) {
  socket.onAny((eventName, data) => {
    if (eventName == data?.listingId) {
      const {
        domain,
        listingId,
        bidAmount,
        apis: {
          godaddy: { api, secret, customerId },
        },
      } = data;
      // Headers
      const headers = {
        Authorization: `sso-key ${api}:${secret}`,
      };
      // Bidding body
      const body = [
        {
          bidAmountUsd: Number(bidAmount) * 1_000_000,
          tosAccepted: true,
          listingId: Number(listingId),
        },
      ];
      axios
        .post(
          `https://api.ote-godaddy.com/v1/customers/${customerId}/aftermarket/listings/bids`,
          body,
          {
            headers,
          }
        )
        .then((x) => {
          // console.log(x?.data?.[0]);
          socket.emit(`${listingId}`, {
            domain,
            listingId: x?.data?.[0]?.listingId,
            isHighestBidder: x?.data?.[0]?.isHighestBidder,
            bidId: x?.data?.[0]?.bidId,
            bidAmountUsd: x?.data?.[0]?.bidAmountUsd,
            status: x?.data?.[0]?.status,
            bidFailureReason: x?.data?.[0]?.bidFailureReason,
          });
        })
        .catch((err) => {
          // console.log("some error", err?.response?.data);
          socket.emit(`${listingId}`, {
            domain,
            listingId,
            bidAmountUsd: bidAmount,
            status: "Error",
            code: err?.response?.data?.code || "",
            message: err?.response?.data?.message || err?.response?.data,
          });
        });
    }
  });
}
module.exports = GodaddyAuctionBidding;
