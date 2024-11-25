import Layout from "../Admin/layout/layout";
import AdminLogin from "../Admin/Components/AdminLogin";
import { useSelector } from "react-redux";
import AdminCredential from "./List/Credentials";
import Databases from "./List/Database";
import AdminStat from "./List/AdminStats";

export default function MyLayout() {
  const loggedIn = useSelector((state) => state.loggedIn);
  return (
    <>
      {loggedIn ? (
        <Layout>
          {/* Admin Sidebar layout component */}
          <AdminStat />

          <AdminCredential />
          <Databases />
        </Layout>
      ) : (
        <AdminLogin />
      )}
    </>
  );
}
