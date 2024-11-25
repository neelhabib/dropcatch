import { useRouter } from "next/router";
import APIs from "../../Admin/Components/Apis";
import SedoApi from "../../Admin/Components/SedoApi";
import OpenAi from "../../Admin/Components/OpenAi";

export default function APIS() {
  const router = useRouter();
  const route = router.query.route;
  return (
    <>
      {route === "godaddy-api-setting" ? (
        <APIs />
      ) : route === "sedo-api-setting" ? (
        <SedoApi />
      ) : route === "open-ai-api-setting" ? (
        <OpenAi />
      ) : (
        ""
      )}
    </>
  );
}
