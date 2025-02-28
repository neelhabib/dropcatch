import { useRouter } from "next/router";
import SidebarItem from "../sidebar-item";
import { TbLockPassword } from "react-icons/tb";
export default function Credentials() {
  const router = useRouter();
  return (
    <>
      <SidebarItem
        isActive={router.asPath === "/admin/credentials"}
        title="Credentials"
        href="/admin/credentials"
        icon={<TbLockPassword size={20} color="white" />}
      />
    </>
  );
}
