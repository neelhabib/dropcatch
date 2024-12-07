import { useSelector } from "react-redux";
import Content from "../Content";

export default function NameSiloCatched() {
  const nameSiloCatched = useSelector((state) => state.nameSiloCatched);

  return (
    <>
      <Content catchedInfo={nameSiloCatched} />
    </>
  );
}
