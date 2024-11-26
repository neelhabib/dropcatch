import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Spacer,
  Tab,
  Tabs,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import DomainInput from "./DomainInput";
import Content from "./Content";
import DomainList from "./DomainList";
import { useSelector } from "react-redux";
export default function HomePage() {
  const token = JSON.parse(localStorage.getItem("lg_tk"));
  const nameCheapCatched = useSelector((state) => state.nameCheapCatched);
  const nameCheapWhois = useSelector((state) => state.nameCheapWhois);

  const dynadotCatched = useSelector((state) => state.dynadotCatched);
  const dynadotWhois = useSelector((state) => state.dynadotWhois);

  const epikCatched = useSelector((state) => state.epikCatched);
  const epikWhois = useSelector((state) => state.epikWhois);

  const godaddyCatched = useSelector((state) => state.godaddyCatched);
  const godaddyWhois = useSelector((state) => state.godaddyWhois);
  return (
    <Card className="m-2">
      <Tabs size="lg" fullWidth>
        <Tab key="NameCheap" title="NameCheap">
          <div className="m-4">
            <div className="grid grid-cols-12">
              <div className="col-span-4">
                <DomainInput
                  nameCheap
                  emit="namecheap-dropcatch"
                  catchEmit={"namecheap-catched"}
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
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Tab>
        <Tab key="Namesilo" title="Namesilo">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </Tab>
        <Tab key="Godaddy" title="Godaddy">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
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
