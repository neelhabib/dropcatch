import { useSelector } from "react-redux";
import DomainList from "../DomainList";
import RandomDomain from "./Generator";

export default function Random_Word_Generator() {
  const domains = useSelector((state) => state?.domains);
  const showRegistered = useSelector((state) => state?.showRegistered);
  const showCard = useSelector((state) => state?.showCard);

  const domains1 = showRegistered
    ? domains && domains?.slice(0, 100)
    : domains &&
      domains?.filter((x) => x?.availability === "available").slice(0, 100);

  const domains2 = showRegistered
    ? domains && domains?.slice(100, 200)
    : domains &&
      domains?.filter((x) => x?.availability === "available").slice(100, 200);

  const domains3 = showRegistered
    ? domains && domains?.slice(200, 300)
    : domains &&
      domains?.filter((x) => x?.availability === "available").slice(200, 300);
  return (
    <>
      <RandomDomain />

      {showCard && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-3 mx-3 2xl:mx-16 scroll">
          <DomainList ext={domains1} />
          <DomainList ext={domains2} />
          <DomainList ext={domains3} />
        </div>
      )}
    </>
  );
}
