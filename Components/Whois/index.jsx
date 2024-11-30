import { useSelector } from "react-redux";
import Generator from "./Generator";
import BulkLocation from "./LocationList";
import Content from "./Content";
import DomainInput from "./DomainInput";

// import HostingList from "../../ReUsable/HostingList";
export default function BulkWhois() {
  return (
    <>
      <div className="mt-1 mx-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <DomainInput />
          <Content />
        </div>
        <BulkLocation />
      </div>
    </>
  );
}
