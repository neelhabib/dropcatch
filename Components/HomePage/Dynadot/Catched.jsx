import { useSelector } from "react-redux";
import Content from "../Content";

export default function DynadotCatched() {
  const dynadotCatched = useSelector((state) => state.dynadotCatched);

  return (
    <>
      <Content catchedInfo={dynadotCatched} />
    </>
  );
}
