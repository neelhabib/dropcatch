import { useSelector } from "react-redux";
import DomainList from "../DomainList";

export default function SpaceShipWhois() {
  const spaceShipWhois = useSelector((state) => state.spaceShipWhois);
  return (
    <>
      <DomainList whoisData={spaceShipWhois} />
    </>
  );
}
