import { useSelector } from "react-redux";
import DomainList from "../DomainList";

export default function NameSiloWhois() {
  const nameSiloWhois = useSelector((state) => state.nameSiloWhois);
  return (
    <>
      <DomainList whoisData={nameSiloWhois} />
    </>
  );
}
