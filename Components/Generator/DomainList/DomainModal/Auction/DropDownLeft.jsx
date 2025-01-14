import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faClipboard,
  faFloppyDisk,
  faDollarSign,
  faCircleNotch,
  faArrowUpRightFromSquare,
  faLandmark,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";
// import { ThreeDots } from "react-bootstrap-icons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export default function DropDownLeft({ domain }) {
  // Dropdown Click Event
  const dropDownHandler = (e) => {
    if (e === "view") {
      window.open(`https://${domain?.fqdn}`, "_blank");
    } else if (e === "copy") {
      navigator.clipboard.writeText(`https://${domain?.fqdn}`);
    } else if (e === "save") {
      const domains = localStorage.getItem("favouriteDomains");
      if (domains) {
        const domainList = JSON.parse(domains);
        domainList.push({
          domain: domain?.fqdn,
          availability: "registered",
        });
        localStorage.setItem("favouriteDomains", JSON.stringify(domainList));
      } else {
        localStorage.setItem(
          "favouriteDomains",
          JSON.stringify([{ domain: domain?.fqdn, availability: "registered" }])
        );
      }
    } else if (e === "appraise") {
      window.open(
        `https://in.godaddy.com/domain-value-appraisal/appraisal/?domainToCheck=${domain?.fqdn}`,
        "_blank"
      );
    } else if (e === "wayback") {
      window.open(`https://web.archive.org/web/*/${domain?.fqdn}`, "_blank");
    }
  };

  return (
    <Dropdown className="z-0">
      <DropdownTrigger>
        <FontAwesomeIcon
          className="bg-gray-100 text-xl rounded-full text-slate-300 hover:text-slate-400"
          icon={faCircleChevronDown}
        />
      </DropdownTrigger>
      <DropdownMenu
        color="secondary"
        aria-label="Avatar Actions"
        onAction={dropDownHandler}
      >
        <DropdownItem textValue="dropdown" key="view" variant="flat">
          <div className="flex justify-between items-center">
            <FontAwesomeIcon icon={faEye} />
            <p className="mb-0 font-semibold text-slate-700 dark:text-slate-400">
              View Site
            </p>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} color="#B80084" />
          </div>
        </DropdownItem>
        <DropdownItem textValue="copy" key="copy" variant="flat">
          <div className="flex justify-between items-center">
            <FontAwesomeIcon icon={faClipboard} />
            <p className="mb-0 font-semibold text-slate-700 dark:text-slate-400">
              Copy URL
            </p>
            <FontAwesomeIcon icon={faCircleNotch} />
          </div>
        </DropdownItem>
        <DropdownItem textValue="save" key="save" variant="flat">
          <div className="flex justify-between items-center">
            <FontAwesomeIcon icon={faFloppyDisk} />
            <p className="mb-0 font-semibold text-slate-700 dark:text-slate-400">
              Save
            </p>
            <FontAwesomeIcon icon={faCircleNotch} />
          </div>
        </DropdownItem>
        <DropdownItem key="appraise" textValue="appraise" variant="flat">
          <div className="flex justify-between items-center">
            <FontAwesomeIcon icon={faDollarSign} />
            <p className="mb-0 font-semibold text-slate-700 dark:text-slate-400">
              Appraise
            </p>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} color="#B80084" />
          </div>
        </DropdownItem>
        <DropdownItem key="wayback" textValue="wayback" variant="flat">
          <div className="flex justify-between items-center">
            <FontAwesomeIcon icon={faLandmark} />
            <p className="mb-0 font-semibold text-slate-700 dark:text-slate-400">
              Wayback Search
            </p>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} color="#B80084" />
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
