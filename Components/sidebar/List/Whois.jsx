import { useRouter } from "next/router";
import SidebarItem from "../sidebar-item";
import { TbWorldQuestion } from "react-icons/tb";
export default function Whois() {
  const router = useRouter();
  return (
    <>
      <SidebarItem
        isActive={router.asPath === "/admin/whois"}
        title="Whois"
        href="/admin/whois"
        icon={<TbWorldQuestion size={20} color="white" />}
      />
    </>
  );
}
