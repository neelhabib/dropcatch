import Layout from "../layout/layout";
import AdminLogin from "../AdminLogin";
import { useSelector } from "react-redux";
import AdminCredential from "./List/Credentials";
import Home_Page from "./List/HomePage";
import APIS from "./List/APIs";
import Bulk_Whois from "./List/BulkWhois";
import Auto from "./List/AutoCatch";
import Generator from "./List/Generator";
import DomainAuction from "./List/DomainAuction";

// import AdminStat from "./List/AdminStats";

export default function MyLayout() {
  const loggedIn = useSelector((state) => state.loggedIn);
  return (
    <>
      {loggedIn ? (
        <Layout>
          <Home_Page />
          <APIS />
          <DomainAuction />
          <AdminCredential />
          <Bulk_Whois />
          <Auto />
          <Generator />
        </Layout>
      ) : (
        <AdminLogin />
      )}
    </>
  );
}
