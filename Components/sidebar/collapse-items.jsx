import React, { useState } from "react";
import ChevronUpIcon from "../icons/sidebar/chevron-up-icon";
import { Accordion, AccordionItem } from "@nextui-org/react";
import clsx from "clsx";
import Link from "next/link";

export default function CollapseItems({ icon, items, title, isActive }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-4 h-full items-center cursor-pointer">
      <Accordion className="px-0 ">
        <AccordionItem
          indicator={<ChevronUpIcon />}
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger: `py-0 min-h-[44px] ${
              isActive &&
              "bg-primary-400 dark:bg-slate-600 shadow-2xl shadow-blue-400 dark:shadow-gray-300"
            } hover:bg-primary-300 dark:hover:bg-slate-500 rounded-xl active:scale-[0.98] transition-transform px-2 hover:shadow-2xl hover:shadow-blue-400 dark:hover:shadow-gray-300`,

            title:
              "px-0 flex text-base gap-2 h-full items-center cursor-pointer",
          }}
          aria-label="Accordion 1"
          title={
            <div className={`flex flex-row items-center gap-2 `}>
              <span
                className={isActive ? "[&_svg_path]:fill-gray-200" : "text-sm"}
              >
                {icon}
              </span>
              <span className="text-sm text-gray-100">{title}</span>
            </div>
          }
        >
          <div className="pl-12">
            {items.map((item, index) => (
              <Link
                href={item?.link}
                key={index}
                className={`w-full flex text-blue-200 transition-all duration-300 hover:text-blue-200 hover:font-semibold rounded-lg border border-transparent hover:!border-blue-500 dark:hover:text-blue-400  py-1.5 px-2 my-px text-sm ${
                  item?.bold &&
                  "font-bold text-blue-400 rounded-lg dark:bg-slate-500 border border-blue-500 shadow-lg shadow-blue-500"
                }`}
              >
                {item?.text}
              </Link>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
