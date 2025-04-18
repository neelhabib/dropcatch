import { Card, CardBody, Link } from "@heroui/react";
import { godaddy, nameCheap } from "./icons";
import { useSelector } from "react-redux";

export default function RegistrarList({ domain }) {
  const dynadot = `${window.location.origin}/images/registrar/dynadot.png`;
  const domain_com = `${window.location.origin}/images/registrar/domaincom.png`;
  const arr = [
    {
      reg: "Namecheap",
      icon: nameCheap,
      link: `https://shareasale.com/r.cfm?b=1781996&u=1097615&m=46483&afftrack=&urllink=https://www.namecheap.com/domains/registration/results/?domain=${domain?.domain}`,
    },
    {
      reg: "Dynadot",
      icon: "",
      logo: dynadot,
      link: `https://www.dynadot.com/domain/search?domain=${domain?.domain}`,
    },
    {
      reg: "Domain",
      icon: "",
      logo: domain_com,
      link: `https://domain.mno8.net/9Wn15e`,
    },
    {
      reg: "Godaddy",
      icon: godaddy,
      link: `https://in.godaddy.com/domainsearch/find?domainToCheck=${domain?.domain}`,
    },
    // { reg: "Epik", icon: "" },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 mt-2">
      {arr?.map((x, i) => (
        <Card
          shadow="sm"
          as={"a"}
          target="_blank"
          href={x?.link}
          className="box-shadow border-1 border-white dark:border-slate-600 hover:border-gray-100"
          key={i}
        >
          <div className="flex justify-between items-center gap-3 p-0">
            <span className="text-white bg-transparent border-r dark:border-slate-600 p-3 rounded-2 rounded-r-0">
              {x?.logo && <img style={{ width: "30px" }} src={x?.logo} />}

              {!x?.logo && (x?.icon || arr[0].icon)}
            </span>
            <span className="flex-1 font-monospace">{x?.reg}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
