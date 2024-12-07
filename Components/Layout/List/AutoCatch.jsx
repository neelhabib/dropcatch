import { useRouter } from "next/router";

import AutoCatch from "../../AutoCatch";

export default function Auto() {
  const router = useRouter();
  const route = router?.query.route;

  return <>{route === "auto-catching" ? <AutoCatch /> : ""}</>;
}
