import { useRouter } from "next/router";
import SidebarItem from "../sidebar-item";
import { RiAuctionLine } from "react-icons/ri";
export default function SingleBidding() {
  const router = useRouter();
  return (
    <>
      <SidebarItem
        isActive={router.asPath === "/admin/single-bidding"}
        title="Single Bidding"
        href="/admin/single-bidding"
        icon={<RiAuctionLine size={20} color="white" />}
      />
    </>
  );
}
