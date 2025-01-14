import { useSelector } from "react-redux";
import DomainList from "./DomainList";

export default function Auction() {
  const godaddyAuctions = useSelector((state) => state?.godaddyAuctions);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 scroll">
      <DomainList domain={godaddyAuctions?.slice(0, 50)} />
      <DomainList domain={godaddyAuctions?.slice(50, 100)} />
      {/* <DomainList domain={godaddyAuctions?.slice(66, 100)} /> */}
    </div>
  );
}
