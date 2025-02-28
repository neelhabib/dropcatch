import { useRouter } from "next/router";
import SidebarItem from "../sidebar-item";
import { FaHandPointer } from "react-icons/fa";
export default function ManualBidding() {
  const router = useRouter();
  return (
    <>
      <SidebarItem
        isActive={router.asPath === "/admin/manual-bidding"}
        title="Manual Bidding"
        href="/admin/manual-bidding"
        icon={<FaHandPointer size={17} color="white" />}
      />
    </>
  );
}
