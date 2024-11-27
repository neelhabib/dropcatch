import { useRouter } from "next/router";
import NameCheapApi from "../../Apis/NameCheap";
import DynadotApi from "../../Apis/Dynadot";
import NameSiloApi from "../../Apis/NameSilo";
import GodaddyApi from "../../Apis/Godaddy";
import SpaceShipApi from "../../Apis/SpaceShip";

export default function APIS() {
  const router = useRouter();
  const route = router.query.route;

  return (
    <>
      {route === "godaddy-api-setting" ? (
        <GodaddyApi />
      ) : route === "namecheap-api-setting" ? (
        <NameCheapApi />
      ) : route === "dynadot-api-setting" ? (
        <DynadotApi />
      ) : route === "namesilo-api-setting" ? (
        <NameSiloApi />
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
