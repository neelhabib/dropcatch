import { useSelector } from "react-redux";
import DomainList from "./DomainList";

export default function SedoDomains() {
  const sedoDomains = useSelector((state) => state?.sedoDomains);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 scroll">
      <DomainList domain={sedoDomains?.slice(0, 50)} />
      <DomainList domain={sedoDomains?.slice(50, 100)} />
      {/* <DomainList domain={sedoDomains?.slice(66, 100)} /> */}
    </div>
  );
}
