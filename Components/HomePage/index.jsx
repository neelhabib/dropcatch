import { Card, Tab, Tabs } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import DomainInput from "./DomainInput";

import NameCheapCatched from "./NameCheap/Catched";
import NameCheapWhois from "./NameCheap/WhoisList";
import DynadotCatched from "./Dynadot/Catched";
import DynadotWhois from "./Dynadot/WhoisList";
import NameSiloCatched from "./NameSilo/Catched";
import NameSiloWhois from "./NameSilo/WhoisList";
import GodaddyCatched from "./Godaddy/Catched";
import GodaddyWhois from "./Godaddy/WhoisList";
import SpaceShipCatched from "./SpaceShip/Catched";
import SpaceShipWhois from "./SpaceShip/WhoisList";
export default function HomePage() {
  const token = JSON.parse(localStorage.getItem("lg_tk"));
  const [apis, setApis] = useState({});

  useEffect(() => {
    axios
      .get("/api/apis/dynadot", { params: { token: token?.token } })
      .then((res) => {
        setApis(res.data);
      });
  }, []);

  return (
    <Card className="m-2">
      <Tabs
        size="lg"
        // disableAnimation
        variant="underlined"
        fullWidth
        destroyInactiveTabPanel={false}
      >
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
                <NameCheapCatched />
              </div>
            </div>
            <div className="mt-1">
              <NameCheapWhois />
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
                <DynadotCatched />
              </div>
            </div>
            <div className="mt-1">
              <DynadotWhois />
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
                <NameSiloCatched />
              </div>
            </div>
            <div className="mt-1">
              <NameSiloWhois />
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
                <GodaddyCatched />
              </div>
            </div>

            <div className="mt-6">
              <GodaddyWhois />
            </div>
          </div>
        </Tab>
        <Tab key="Spaceship" title="Spaceship">
          <div className="m-4">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4">
                <DomainInput
                  spaceShip
                  emit="spaceship-dropcatch"
                  catchEmit={"spaceship-catched"}
                  apis={apis}
                />
              </div>
              <div className="col-span-8">
                <SpaceShipCatched />
              </div>
            </div>

            <div className="mt-6">
              <SpaceShipWhois />
            </div>
          </div>
        </Tab>
        {/* <Tab key="Porkbun" title="Porkbun">
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
        </Tab> */}
      </Tabs>
    </Card>
  );
}
