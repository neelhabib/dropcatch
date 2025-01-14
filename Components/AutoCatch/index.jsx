import { Button, Card, Image, Tab, Tabs } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import DomainInput from "./DomainInput";
import Godaddy from "./Icons/Godaddy";
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
        console.log(res.data?.reverse());
        setQueries(res.data?.reverse());
        dispatch(setApiQueries(res.data.reverse()));
      });
  }, []);
  const cornerImg_2 = `${window.location.origin}/images/corner-2.png`;
  return (
    <Card className="m-2">
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-contain object-right absolute"
        src={cornerImg_2}
      />
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
        <Tab key="Delete" title="Delete">
          <div className="flex flex-col items-center justify-center">
            <Button isDisabled color="danger" size="lg" className="mt-4">
              Delete Old Queries
            </Button>
            <p className="mt-2 text-sm">
              Currently not available to delete old queries.
            </p>
          </div>
        </Tab>
      </Tabs>
    </Card>
  );
}
