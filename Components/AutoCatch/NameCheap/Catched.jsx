import { useSelector } from "react-redux";
import Content from "../Content";

export default function Catched() {
  const nameCheapCatched = useSelector((state) => state.nameCheapCatched);

  return (
    <>
      <Content catchedInfo={nameCheapCatched} />
    </>
  );
}
