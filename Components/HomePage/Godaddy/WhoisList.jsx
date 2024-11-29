import { useSelector } from "react-redux";
import DomainList from "../DomainList";

export default function GodaddyWhois() {
  const godaddyWhois = useSelector((state) => state.godaddyWhois);
  return (
    <>
      <DomainList whoisData={godaddyWhois} />
    </>
  );
}
