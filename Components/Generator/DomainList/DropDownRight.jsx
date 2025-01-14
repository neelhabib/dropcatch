import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
// import { ArrowDownCircleFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export default function DropDownRight({ domain }) {
  const affiliateLinks = useSelector((state) => state?.affiliateLinks);

  // Dropdown Click Event
  const handleClick = (e) => {
    e === "godaddy"
      ? window.open(
          `https://in.godaddy.com/domainsearch/find?domainToCheck=${domain}`,
          "_blank"
        )
      : e === "namecheap"
      ? window.open(
          `https://shareasale.com/r.cfm?b=1781996&u=1097615&m=46483&afftrack=&urllink=https://www.namecheap.com/domains/registration/results/?domain=${domain}`,
          "_blank"
        )
      : e === "dynadot"
      ? window.open(
          `https://www.dynadot.com/domain/search?domain=${domain}`,
          "_blank"
        )
      : e === "domain.com"
      ? window.open(`https://domain.mno8.net/9Wn15e`, "_blank")
      : window.open(affiliateLinks?.otherLink, "_blank");
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        {/* <ArrowDownCircleFill size={20} className="drop-down-right" /> */}
        <FontAwesomeIcon
          icon={faArrowDown}
          className="text-sm bg-slate-300 hover:bg-slate-400 text-white dark:text-gray-600 rounded-full px-1.5 py-1 cursor-pointer"
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Avatar Actions"
        onAction={handleClick}
        color="secondary"
      >
        <DropdownItem
          key="namecheap"
          textValue="namecheap"
          color="warning"
          variant="flat"
        >
          <div className="flex justify-between items-center">
            <p className="mb-0 text-[#FF5501] font-semibold">NameCheap</p>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} color="#B80084" />
          </div>
        </DropdownItem>
        <DropdownItem
          key="godaddy"
          color="success"
          textValue="godaddy"
          variant="flat"
        >
          <div className="flex justify-between items-center">
            <p className="mb-0 text-[#0E8388] font-semibold">Godaddy</p>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} color="#B80084" />
          </div>
        </DropdownItem>

        <DropdownItem key="dynadot" textValue="dynadot" variant="flat">
          <div className="flex justify-between items-center">
            <p className="mb-0 text-[#009DDC] font-semibold">Dynadot</p>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} color="#B80084" />
          </div>
        </DropdownItem>
        <DropdownItem
          key="domain.com"
          textValue="domain.com"
          color="danger"
          variant="flat"
        >
          <div className="flex justify-between items-center">
            <p className="mb-0 text-[#E24747] font-semibold">Domain.com</p>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} color="#B80084" />
          </div>
        </DropdownItem>
        {/* <DropdownItem
          key="domain.com"
          textValue="domain.com"
          color="danger"
          variant="flat"
        >
          <div className="flex justify-between items-center">
            <p className="mb-0 text-[#E24747] font-semibold">Sav.com</p>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} color="#B80084" />
          </div>
        </DropdownItem> */}
        {/* <DropdownItem
          key="domain.com"
          textValue="domain.com"
          color="danger"
          variant="flat"
        >
          <div className="flex justify-between items-center">
            <p className="mb-0 text-[#E24747] font-semibold">Epik.com</p>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} color="#B80084" />
          </div>
        </DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
}
