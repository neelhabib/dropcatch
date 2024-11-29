import { useSelector } from "react-redux";
import DomainList from "../DomainList";

export default function DynadotWhois() {
  const dynadotWhois = useSelector((state) => state.dynadotWhois);
  return (
    <>
      <DomainList whoisData={dynadotWhois} />
    </>
  );
}
