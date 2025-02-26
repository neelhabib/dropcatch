import { useRouter } from "next/router";
import SidebarItem from "../sidebar-item";
import SettingsIcon from "../../icons/sidebar/settings-icon";
export default function MultiBidding() {
  const router = useRouter();
  return (
    <>
      <SidebarItem
        isActive={router.asPath === "/admin/multi-bidding"}
        title="Multi Bidding"
        href="/admin/multi-bidding"
        icon={<SettingsIcon />}
      />
    </>
  );
}
