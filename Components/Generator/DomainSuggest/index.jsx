import { useSelector } from "react-redux";
import DomainList from "../DomainList";
import RandomDomain from "./Generator";

export default function DomainSuggest() {
  const suggestedDomains = useSelector((state) => state?.suggestedDomains);
  const prefix = useSelector((state) => state?.prefix);
  const suffix = useSelector((state) => state?.suffix);
  const showRegistered = useSelector((state) => state?.showRegistered);
  const showCard = useSelector((state) => state?.showCard);

  return (
    <>
      <RandomDomain />

      {showCard && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-3 mx-3 2xl:mx-16 scroll">
          <DomainList ext={suggestedDomains} />
          <DomainList ext={prefix} />
          <DomainList ext={suffix} />
        </div>
      )}
    </>
  );
}
