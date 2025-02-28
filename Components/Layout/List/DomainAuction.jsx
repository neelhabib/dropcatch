import { useRouter } from "next/router";
import SingleBidding from "../../DomainAuction/SingleBidding";
import DomainSearch from "../../DomainAuction/Search";
import MultiBidding from "../../DomainAuction/MultiBidding";
import ManualBidding from "../../DomainAuction/ManualBidding";

export default function ManualBid() {
  const router = useRouter();
  const route = router?.query.route;

  return (
    <>
      {route === "single-bidding" ? (
        <SingleBidding />
      ) : route === "bidding-search" ? (
        <DomainSearch />
      ) : route === "multi-bidding" ? (
        <MultiBidding />
      ) : route === "manual-bidding" ? (
        <ManualBidding />
      ) : (
        ""
      )}
    </>
  );
}
