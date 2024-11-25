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
                className={`w-full ${
                  item?.bold &&
                  "font-bold text-blue-300 shadow-md rounded-lg bg-blue-600 hover:bg-blue-600 dark:bg-slate-500"
                } flex text-blue-200 hover:text-blue-200 hover:font-semibold hover:border hover:rounded-lg hover:!border-blue-500 dark:hover:text-blue-400 transition-colors py-1.5 px-2 my-px text-sm`}
              >
                {item?.text}
              </Link>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
      {/* <Accordion
        title={
          <div
            className="flex items-center justify-between w-full py-5 px-7 rounded-8 transition-all duration-150 ease-in-out cursor-pointer hover:bg-accents2 active:scale-98"
            // css={{
            //   gap: "$6",
            //   width: "100%",
            //   py: "$5",
            //   px: "$7",
            //   borderRadius: "8px",
            //   transition: "all 0.15s ease",
            //   "&:active": {
            //     transform: "scale(0.98)",
            //   },
            //   "&:hover": {
            //     bg: "$accents2",
            //   },
            // }}
            // justify={"between"}
            onClick={handleToggle}
          >
            <div className="flex gap-4">
              {icon}
              <span
                className="text-default-900 font-medium text-base"
                //  span
                //  weight={"normal"}
                //  size={"$base"}
                //  css={{
                //    color: "$accents9",
                //  }}
              >
                {title}
              </span>
            </div>

            <ChevronUpIcon
              className={clsx(
                open ? "rotate-180" : "rotate-0",
                "transition-all duration-300 ease-in-out transform"
              )}
              //   css={{
              //     transition: "transform 0.3s ease",
              //     transform: open ? "rotate(-180deg)" : "rotate(0deg)",
              //   }}
            />
          </div>
        }
        //   css={{
        //     width: "100%",
        //     "& .nextui-collapse-view": {
        //       p: "0",
        //     },
        //     "& .nextui-collapse-content": {
        //       marginTop: "$1",
        //       padding: "0px",
        //     },
        //   }}
        divider={false}
        showArrow={false}
      >
        {items.map((item, index) => (
          <div
            className="flex flex-col pl-8"
            key={index}
            // direction={"column"}
            // css={{
            //   paddingLeft: "$16",
            // }}
          >
            <span
              className="text-default-400 font-normal text-md"
              //   span
              //   weight={"normal"}
              //   size={"$md"}
              //   css={{
              //     color: "$accents8",
              //     cursor: "pointer",
              //     "&:hover": {
              //       color: "$accents9",
              //     },
              //   }}
            >
              {item}
            </span>
          </div>
        ))}
      </Accordion> */}
    </div>
  );
}
