import React from "react";

export default function SidebarMenu({ title, children }) {
  return (
    <div className="flex gap-2 flex-col">
      <span className="text-xs font-semibold text-gray-800 bg-warning-400 rounded-md px-4 w-fit shadow-xl shadow-orange-800 ">
        {title}
      </span>
      {children}
    </div>
  );
}
