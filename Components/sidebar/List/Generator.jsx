import { useRouter } from "next/router";
import { FaWandMagicSparkles } from "react-icons/fa6";
import CollapseItems from "../collapse-items";

export default function Generator() {
  const router = useRouter();
  return (
    <>
      <CollapseItems
        isActive={router.asPath.includes("api-setting")}
        icon={<FaWandMagicSparkles size={18} color="white" />}
        items={[
          {
            text: "Random Word",
            link: "/admin/random-word-generator",
            bold: router.query.route === "random-word-generator",
          },
          {
            text: "Random Letter",
            link: "/admin/random-letter-generator",
            bold: router.query.route === "random-letter-generator",
          },
          {
            text: "Bulk Domain",
            link: "/admin/bulk-domain-generator",
            bold: router.query.route === "bulk-domain-generator",
          },
          // {
          //   text: "Domain GPT",
          //   link: "/admin/gpt-based-domain-name",
          //   bold: router.query.route === "gpt-based-domain-name",
          // },

          {
            text: "Domain AI",
            link: "/admin/ai-domain-generator",
            bold: router.query.route === "ai-domain-generator",
          },
        ]}
        title="Generator"
      />
    </>
  );
}
