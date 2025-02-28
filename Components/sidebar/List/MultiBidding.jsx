import { useRouter } from "next/router";
import SidebarItem from "../sidebar-item";
import { FaListCheck } from "react-icons/fa6";
export default function MultiBidding() {
  const router = useRouter();
  return (
    <>
      <SidebarItem
        isActive={router.asPath === "/admin/multi-bidding"}
        title="Multi Bidding"
        href="/admin/multi-bidding"
        icon={<FaListCheck size={17} color="white" />}
      />
    </>
  );
}
