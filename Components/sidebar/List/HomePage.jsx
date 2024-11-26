import { useRouter } from "next/router";
import SidebarItem from "../sidebar-item";
import SettingsIcon from "../../icons/sidebar/settings-icon";
export default function HomePage() {
  const router = useRouter();
  return (
    <>
      <SidebarItem
        isActive={router.asPath === "/"}
        title="Drop Catch"
        href="/"
        icon={<SettingsIcon />}
      />
    </>
  );
}
