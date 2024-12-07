import { Card, Tab, Tabs } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import DomainInput from "./DomainInput";
import GodaddyCatched from "./Godaddy/Catched";
import GodaddyWhois from "./Godaddy/WhoisList";
import Godaddy from "./Icons/Godaddy";
import SuccessNotification from "./SuccessNotif";
import { useDispatch } from "react-redux";
import { setApiQueries } from "../../Redux/reducer";
import QueryCard from "./Dynadot/Queries";
import Dynadot from "./Icons/Dynadot";
import NameSilo from "./Icons/NameSilo";
import NameCheap from "./Icons/NameCheap";

export default function AutoCatch() {
  const token = JSON.parse(localStorage.getItem("lg_tk"));
  const [queries, setQueries] = useState([]);
  const dispatch = useDispatch();
  const dynadotQueries = queries?.filter((x) => x?.api === "dynadot");
  const godaddyQueries = queries?.filter((x) => x?.api === "godaddy");
  const nameCheapQueries = queries?.filter((x) => x?.api === "namecheap");
  const nameSiloQueries = queries?.filter((x) => x?.api === "namesilo");

  useEffect(() => {
    axios
      .get("/api/auto-catch/api-queries", { params: { token: token?.token } })
      .then((res) => {
        setQueries(res.data);
        dispatch(setApiQueries(res.data));
      });
  }, []);

  return (
    <Card className="m-2">
      <Tabs size="lg" fullWidth>
        <Tab key="Stats" title="Stats">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mx-2 mb-4">
            <QueryCard
              apiQueries={queries}
              title="All Queries"
              success={queries?.filter((x) => x?.status === "success")?.length}
            />
            <QueryCard
              apiQueries={queries?.filter((x) => x?.status === "success")}
              title="Domain Catched"
              // success={queries?.filter((x) => x?.status === "success")?.length}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mx-2">
            <QueryCard
              apiQueries={godaddyQueries}
              title="Godaddy API"
              icon={<Godaddy />}
              success={
                godaddyQueries?.filter((x) => x?.status === "success")?.length
              }
            />
            <QueryCard
              apiQueries={dynadotQueries}
              title="Dynadot API"
              icon={<Dynadot />}
              success={
                dynadotQueries?.filter((x) => x?.status === "success")?.length
              }
            />
            <QueryCard
              apiQueries={nameCheapQueries}
              title="NameCheap API"
              icon={<NameCheap />}
              success={
                nameCheapQueries?.filter((x) => x?.status === "success")?.length
              }
            />
            <QueryCard
              apiQueries={nameSiloQueries}
              title="Name Silo API"
              icon={<NameSilo />}
              success={
                nameSiloQueries?.filter((x) => x?.status === "success")?.length
              }
            />
          </div>
        </Tab>
        <Tab key="Domains" title="Domains">
          <div className="m-4">
            <DomainInput />
          </div>
        </Tab>
      </Tabs>
    </Card>
  );
}
