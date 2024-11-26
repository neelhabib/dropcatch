import { createContext, useContext } from "react";

const SidebarContext = createContext({
  collapsed: false,
  setCollapsed: () => {},
});

// export const useSidebarContext = () => {
//   return useContext(SidebarContext);
// };
export default SidebarContext;
