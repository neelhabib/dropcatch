import { useRouter } from "next/router";
import SidebarItem from "../sidebar-item";
import SettingsIcon from "../../icons/sidebar/settings-icon";
export default function AutoCatch() {
  const router = useRouter();
  return (
    <>
      <SidebarItem
        isActive={router.asPath === "/admin/auto-catching"}
        title="Auto Catching"
        href="/admin/auto-catching"
        icon={<SettingsIcon />}
      />
    </>
  );
}
