import { useRouter } from "next/router";
import SidebarItem from "../sidebar-item";
import SettingsIcon from "../../icons/sidebar/settings-icon";
export default function Whois() {
  const router = useRouter();
  return (
    <>
      <SidebarItem
        isActive={router.asPath === "/admin/whois"}
        title="Whois"
        href="/admin/whois"
        icon={<SettingsIcon />}
      />
    </>
  );
}
