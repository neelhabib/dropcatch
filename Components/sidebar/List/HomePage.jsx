import { useRouter } from "next/router";
import SidebarItem from "../sidebar-item";
import { GiFallingBoulder } from "react-icons/gi";
export default function HomePage() {
  const router = useRouter();
  return (
    <>
      <SidebarItem
        isActive={router.asPath === "/"}
        title="Drop Catch"
        href="/"
        icon={<GiFallingBoulder size={17} color="white" />}
      />
    </>
  );
}
