import { useRouter } from "next/router";
import SidebarItem from "../sidebar-item";
import SettingsIcon from "../../icons/sidebar/settings-icon";
export default function ManualBidding() {
  const router = useRouter();
  return (
    <>
      <SidebarItem
        isActive={router.asPath === "/admin/manual-bidding"}
        title="Manual Bidding"
        href="/admin/manual-bidding"
        icon={<SettingsIcon />}
      />
    </>
  );
}
