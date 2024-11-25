import React from "react";
import UseLockedBody from "../hooks/useBodyLock";
import NavbarWrapper from "../navbar/navbar";
import SidebarWrapper from "../sidebar/sidebar";
import SidebarContext from "./layout-context";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = UseLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        <SidebarWrapper />
        <NavbarWrapper>{children}</NavbarWrapper>
      </section>
    </SidebarContext.Provider>
  );
}
