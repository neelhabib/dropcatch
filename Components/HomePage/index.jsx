import { Card, Tab, Tabs } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import DomainInput from "./DomainInput";
import Content from "./Content";
import DomainList from "./DomainList";
import { useSelector } from "react-redux";
export default function HomePage() {
  const token = JSON.parse(localStorage.getItem("lg_tk"));
  const [apis, setApis] = useState({});
  const nameCheapCatched = useSelector((state) => state.nameCheapCatched);
  const nameCheapWhois = useSelector((state) => state.nameCheapWhois);

  const dynadotCatched = useSelector((state) => state.dynadotCatched);
  const dynadotWhois = useSelector((state) => state.dynadotWhois);

  const nameSiloCatched = useSelector((state) => state.nameSiloCatched);
  const nameSiloWhois = useSelector((state) => state.nameSiloWhois);

  const godaddyCatched = useSelector((state) => state.godaddyCatched);
  const godaddyWhois = useSelector((state) => state.godaddyWhois);

  useEffect(() => {
    axios
      .get("/api/apis/dynadot", { params: { token: token?.token } })
      .then((res) => {
        setApis(res.data);
        console.log(res.data);
      });
  }, []);

  return (
    <Card className="m-2">
      <Tabs size="lg" fullWidth destroyInactiveTabPanel={false}>
        <Tab key="NameCheap" title="NameCheap">
          <div className="m-4">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4">
                <DomainInput
                  nameCheap
                  emit="namecheap-dropcatch"
                  catchEmit={"namecheap-catched"}
                  apis={apis}
                />
              </div>
              <div className="col-span-8">
                <Content title="Namecheap API" catchedInfo={nameCheapCatched} />
              </div>
            </div>
            <div className="mt-1">
              <DomainList whoisData={nameCheapWhois} />
            </div>
          </div>
        </Tab>
        <Tab key="Dynadot" title="Dynadot">
          <div className="m-4">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4">
                <DomainInput
                  dynadot
                  emit="dynadot-dropcatch"
                  catchEmit={"dynadot-catched"}
                  apis={apis}
                />
              </div>
              <div className="col-span-8">
                <Content title="dynadot API" catchedInfo={dynadotCatched} />
              </div>
            </div>
            <div className="mt-1">
              <DomainList whoisData={dynadotWhois} />
            </div>
          </div>
        </Tab>
        <Tab key="Namesilo" title="Namesilo">
          <div className="m-4">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4">
                <DomainInput
                  nameSilo
                  emit="namesilo-dropcatch"
                  catchEmit={"namesilo-catched"}
                  apis={apis}
                />
              </div>
              <div className="col-span-8">
                <Content title="nameSilo API" catchedInfo={nameSiloCatched} />
              </div>
            </div>
            <div className="mt-1">
              <DomainList whoisData={nameSiloWhois} />
            </div>
          </div>
        </Tab>
        <Tab key="Godaddy" title="Godaddy">
          <div className="m-4">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4">
                <DomainInput
                  godaddy
                  emit="godaddy-dropcatch"
                  catchEmit={"godaddy-catched"}
                  apis={apis}
                />
              </div>
              <div className="col-span-8">
                <Content title="Godaddy API" catchedInfo={godaddyCatched} />
              </div>
            </div>

            <div className="mt-6">
              <DomainList whoisData={godaddyWhois} />
            </div>
          </div>
        </Tab>
        <Tab key="Spaceship" title="Spaceship">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </Tab>
        <Tab key="Porkbun" title="Porkbun">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </Tab>
        <Tab key="Open Provider" title="Open Provider">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </Tab>
        <Tab key="Loopia" title="Loopia">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </Tab>
      </Tabs>
    </Card>
  );
}
