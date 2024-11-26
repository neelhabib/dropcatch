import { useRouter } from "next/router";
import HomePage from "../../HomePage";

export default function Home_Page() {
  const router = useRouter();
  const route = router.route;

  return <>{route === "/" ? <HomePage /> : ""}</>;
}
