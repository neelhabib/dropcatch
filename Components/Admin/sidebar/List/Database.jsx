import { useRouter } from "next/router";
import SidebarItem from "../sidebar-item";
import DevIcon from "../../icons/sidebar/dev-icon";
import SettingsIcon from "../../icons/sidebar/settings-icon";
export default function DataBases() {
  const router = useRouter();
  return (
    <>
      <SidebarItem
        isActive={router.asPath === "/admin/database"}
        title="Site Setting"
        href="/admin/database"
        icon={<SettingsIcon />}
      />
    </>
  );
}
