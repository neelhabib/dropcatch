import NextLink from "next/link";
import React from "react";
import useSidebarContext from "../layout/useSidebarContext";
import clsx from "clsx";

export default function SidebarItem({ icon, title, isActive, href = "" }) {
  const { collapsed, setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <NextLink
      href={href}
      className="text-default-900 active:bg-none max-w-full"
    >
      <div
        className={clsx(
          isActive
            ? "bg-primary-300 [&_svg_path]:fill-gray-100 shadow-2xl shadow-blue-400 dark:shadow-gray-300"
            : "hover:bg-primary-300",
          "flex gap-2 w-full min-h-[44px] h-full items-center px-2 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] hover:shadow-2xl hover:shadow-blue-400 dark:hover:shadow-gray-300"
        )}
        onClick={handleClick}
      >
        {icon}
        <span className="text-gray-100 text-sm">{title}</span>
      </div>
    </NextLink>
  );
}
