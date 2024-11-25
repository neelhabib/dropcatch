import { useRouter } from "next/router";
import Database from "../../Admin/Components/Database";

export default function Databases() {
  const router = useRouter();
  const route = router.query.route;
  return <>{route === "database" ? <Database /> : ""}</>;
}
