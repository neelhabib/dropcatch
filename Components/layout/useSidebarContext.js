import { createContext, useContext } from "react";
import SidebarContext from "./layout-context";
const useSidebarContext = () => {
  return useContext(SidebarContext);
};
module.exports = useSidebarContext;
