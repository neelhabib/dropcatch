import { useRouter } from "next/router";
import DynadotApi from "../../Apis/Dynadot";
import SpaceShipApi from "../../Apis/SpaceShip";
import Random_Word_Generator from "../../Generator/RandomWord";
import RandomLetter from "../../Generator/RandomLetter";
import DomainSuggest from "../../Generator/DomainSuggest";
import BulkDomain from "../../Generator/BulkDomain";

export default function Generator() {
  const router = useRouter();
  const route = router.query.route;

  return (
    <>
      {route === "random-word-generator" ? (
        <Random_Word_Generator />
      ) : route === "random-letter-generator" ? (
        <RandomLetter />
      ) : route === "ai-domain-generator" ? (
        <DomainSuggest />
      ) : route === "bulk-domain-generator" ? (
        <BulkDomain />
      ) : route === "spaceship-api-setting" ? (
        <SpaceShipApi />
      ) : route === "dynadot-api-setting" ? (
        <DynadotApi />
      ) : (
        ""
      )}
    </>
  );
}
