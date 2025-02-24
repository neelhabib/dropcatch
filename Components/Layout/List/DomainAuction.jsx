import { useRouter } from "next/router";
import ManualBidding from "../../DomainAuction/ManualBidding";
import DomainSearch from "../../DomainAuction/Search";

export default function ManualBid() {
  const router = useRouter();
  const route = router?.query.route;

  return (
    <>
      {route === "manual-bidding" ? (
        <ManualBidding />
      ) : route === "bidding-search" ? (
        <DomainSearch />
      ) : (
        ""
      )}
    </>
  );
}
