import { useRouter } from "next/router";

import BulkWhois from "../../Whois";

export default function Bulk_Whois() {
  const router = useRouter();
  const route = router?.query.route;

  return <>{route === "whois" ? <BulkWhois /> : ""}</>;
}
