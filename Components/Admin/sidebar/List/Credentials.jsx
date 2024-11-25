import { useRouter } from "next/router";
import SidebarItem from "../sidebar-item";
import SettingsIcon from "../../icons/sidebar/settings-icon";
export default function Credentials() {
  const router = useRouter();
  return (
    <>
      <SidebarItem
        isActive={router.asPath === "/admin/credentials"}
        title="Credentials"
        href="/admin/credentials"
        icon={<SettingsIcon />}
      />
    </>
  );
}
