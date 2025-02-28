import { useRouter } from "next/router";
import SidebarItem from "../sidebar-item";
import { BsArrowRepeat } from "react-icons/bs";
export default function AutoCatch() {
  const router = useRouter();
  return (
    <>
      <SidebarItem
        isActive={router.asPath === "/admin/auto-catching"}
        title="Auto Catching"
        href="/admin/auto-catching"
        icon={<BsArrowRepeat size={20} color="white" />}
      />
    </>
  );
}
