import { useRouter } from "next/router";
import AdminCredentials from "../../Admin/Components/Credentials";

export default function AdminCredential() {
  const router = useRouter();
  const route = router.query.route;
  return <>{route === "credentials" ? <AdminCredentials /> : ""}</>;
}
