import { Card, CardHeader, Link } from "@nextui-org/react";
import DropDownLeft from "./DropDownLeft";
import Skeleton from "../../Skeleton";
import { useSelector } from "react-redux";
const data = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 12, 14, 15];

export default function DomainList({ domain, header }) {
  const affiliateLinks = useSelector((state) => state?.affiliateLinks);
  return (
    <>
      <Card className="p-0">
        <CardHeader className="flex justify-between">
          <p className="font-semibold text-gray-600 dark:text-gray-300">
            {header}
          </p>
        </CardHeader>
        {domain?.length > 0
          ? domain?.map((x, i) => (
              <div
                className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 rounded-xl p-3.5 box-shadow"
                key={i}
              >
                <div className="flex justify-between items-center">
                  <DropDownLeft domain={x} />
                  <Link
                    style={{ fontFamily: "jost" }}
                    href={`https://auctions.godaddy.com/trpItemListing.aspx?miid=${x?.auction_id}`}
                    isBlock
                    isExternal
                    className="mx-2 py-0 text-medium"
                    color="foreground"
                  >
                    {x?.fqdn}
                  </Link>
                </div>

                <Link
                  href={`https://auctions.godaddy.com/trpItemListing.aspx?miid=${x?.auction_id}`}
                  isExternal
                  isBlock
                  color="secondary"
                  style={{ fontFamily: "jost" }}
                  className="py-0"
                >
                  {x?.auction_price_display?.split(".")?.[0]}
                </Link>
              </div>
            ))
          : data.map((x, i) => <Skeleton key={i} />)}
      </Card>
    </>
  );
}
