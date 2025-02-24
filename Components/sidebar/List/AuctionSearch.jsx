import { useRouter } from "next/router";
import SidebarItem from "../sidebar-item";
import SettingsIcon from "../../icons/sidebar/settings-icon";
export default function AuctionSearch() {
  const router = useRouter();
  return (
    <>
      <SidebarItem
        isActive={router.asPath === "/admin/bidding-search"}
        title="Auction Search"
        href="/admin/bidding-search"
        icon={<SettingsIcon />}
      />
    </>
  );
}
