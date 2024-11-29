import { useSelector } from "react-redux";
import Content from "../Content";

export default function GodaddyCatched() {
  const godaddyCatched = useSelector((state) => state.godaddyCatched);

  return (
    <>
      <Content catchedInfo={godaddyCatched} />
    </>
  );
}
