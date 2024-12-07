import { useSelector } from "react-redux";
import DomainList from "../DomainList";

export default function WhoisList() {
  const nameCheapWhois = useSelector((state) => state.nameCheapWhois);
  return (
    <>
      <DomainList whoisData={nameCheapWhois} />
    </>
  );
}
