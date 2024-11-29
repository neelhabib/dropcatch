import { useSelector } from "react-redux";
import Content from "../Content";

export default function SpaceShipCatched() {
  const spaceShipCatched = useSelector((state) => state.spaceShipCatched);

  return (
    <>
      <Content catchedInfo={spaceShipCatched} />
    </>
  );
}
