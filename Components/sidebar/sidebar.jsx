import React from "react";
import Sidebar from "./sidebar.styles";
import { Image, Link } from "@nextui-org/react";
import HomeIcon from "../icons/sidebar/home-icon";
import SidebarItem from "./sidebar-item";
import SidebarMenu from "./sidebar-menu";
import useSidebarContext from "../layout/useSidebarContext";
import { useRouter } from "next/router";
import Credentials from "./List/Credentials";
import HomePage from "./List/HomePage";
import APIs from "./List/APIs";
import Whois from "./List/Whois";
import AutoCatch from "./List/AutoCatch";
import Generator from "./List/Generator";
import ManualBidding from "./List/ManualBidding";
import AuctionSearch from "./List/AuctionSearch";
export default function SidebarWrapper() {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[50] sticky top-0  custom-scrollbar ">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={`${Sidebar({
          collapsed: collapsed,
        })} bg-gradient-to-r from-blue-800 to-violet-800`}
      >
        {/* <div className={Sidebar.Header()}>
      
          <Link className="" href="/" aria-label="Brand">
            <Image
              width={250}
              height={50}
              alt="Your site logo"
              src="/images/logo/logo/logo.png"
            />
          </Link>
        </div> */}
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            {/* <SidebarItem
              title="Stats"
              icon={<HomeIcon />}
              isActive={router.pathname === "/admin"}
              href="/admin"
            /> */}
            <SidebarMenu title="Drop Catch">
              <HomePage />
              <AutoCatch />
            </SidebarMenu>
            <SidebarMenu title="Auction Bidding">
              <AuctionSearch />
              <ManualBidding />
            </SidebarMenu>
            <SidebarMenu title="Domain Tools">
              <Generator />
              <Whois />
            </SidebarMenu>

            <SidebarMenu title="Settings">
              <APIs />
              <Credentials />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}></div>
        </div>
      </div>
    </aside>
  );
}
