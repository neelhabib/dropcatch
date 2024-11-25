import React from "react";
import useSidebarContext from "../layout/useSidebarContext";
import StyledBurgerButton from "./navbar.styles";

export default function BurguerButton() {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <div
      className={StyledBurgerButton()}
      // open={collapsed}
      onClick={setCollapsed}
    >
      <div />
      <div />
    </div>
  );
}
