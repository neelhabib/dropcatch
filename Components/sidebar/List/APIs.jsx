import { useRouter } from "next/router";
import { MdDataObject } from "react-icons/md";
import CollapseItems from "../collapse-items";

export default function APIs() {
  const router = useRouter();
  return (
    <>
      <CollapseItems
        isActive={router.asPath.includes("api-setting")}
        icon={<MdDataObject size={20} color="white" />}
        items={[
          {
            text: "Godaddy",
            link: "/admin/godaddy-api-setting",
            bold: router.query.route === "godaddy-api-setting",
          },
          {
            text: "NameCheap",
            link: "/admin/namecheap-api-setting",
            bold: router.query.route === "namecheap-api-setting",
          },
          {
            text: "Dynadot",
            link: "/admin/dynadot-api-setting",
            bold: router.query.route === "dynadot-api-setting",
          },

          {
            text: "Namesilo",
            link: "/admin/namesilo-api-setting",
            bold: router.query.route === "namesilo-api-setting",
          },
          // {
          //   text: "Spaceship",
          //   link: "/admin/spaceship-api-setting",
          //   bold: router.query.route === "spaceship-api-setting",
          // },
          // {
          //   text: "Porkbun",
          //   link: "/admin/porkbun-api-setting",
          //   bold: router.query.route === "porkbun-api-setting",
          // },
          // {
          //   text: "Open Provider",
          //   link: "/admin/open-provider-api-setting",
          //   bold: router.query.route === "open-provider-api-setting",
          // },
          // {
          //   text: "Loopia",
          //   link: "/admin/Loopia-api-setting",
          //   bold: router.query.route === "Loopia-api-setting",
          // },
        ]}
        title="API"
      />
    </>
  );
}
