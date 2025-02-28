import { useRouter } from "next/router";
import SidebarItem from "../sidebar-item";
import { TbListSearch } from "react-icons/tb";

export default function AuctionSearch() {
  const router = useRouter();
  return (
    <>
      <SidebarItem
        isActive={router.asPath === "/admin/bidding-search"}
        title="Auction Search"
        href="/admin/bidding-search"
        icon={<TbListSearch color="white" size={20} />}
      />
    </>
  );
}
