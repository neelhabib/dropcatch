import { Button, Chip } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import SimpleBarReact from "simplebar-react";
import { setBiddingDomains } from "../../../Redux/reducer";
export default function BiddingTable() {
  const biddingDomains = useSelector((state) => state.biddingDomains);
  const dispatch = useDispatch();
  const header = [
    "#",
    "Domain",
    "Listing Id",
    "Bid Amount",
    "Status",
    "Bid Id",
    "Highest Bidder",
    "Bid Failure Reason",
    "Error Code",
    "Error Message",
  ];
  const Rows = ({ item }) => {
    return (
      <td className="size-px whitespace-nowrap">
        <div className="mx-2 text-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {item}
          </span>
        </div>
      </td>
    );
  };
  return (
    <>
      {biddingDomains?.length > 0 && (
        <div className="max-h-72 overflow-auto border border-gray-100 dark:border-gray-600 shadow-sm rounded-lg ">
          <div className="mx-6 py-2 grid gap-3 md:flex md:justify-between md:items-center sticky">
            <div className="flex justify-between items-center gap-2 w-full">
              <div>
                <span className="text-sm mr-2">API Queries </span>
                {biddingDomains && (
                  <Chip color="success" size="sm" radius="sm" variant="flat">
                    {biddingDomains?.length}
                  </Chip>
                )}
              </div>
              <Button
                size="sm"
                color="warning"
                onClick={() => dispatch(setBiddingDomains([]))}
              >
                Delete Queries
              </Button>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200 relative">
            <thead>
              <tr>
                {header?.map((x, i) => (
                  <th
                    scope="col"
                    className="py-2 bg-gray-50 dark:bg-gray-600"
                    key={i}
                  >
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="text-xs font-semibold  tracking-wide text-gray-800 dark:text-gray-400">
                        {x}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {biddingDomains
                .filter((y) => y)
                .map((x, i, arr) => (
                  <tr key={i} className="rounded-3 bg- m-2">
                    <Rows item={arr.length - i} />
                    <Rows item={x?.domain} />
                    <Rows item={x?.listingId} />
                    <Rows item={(x?.bidAmountUsd / 1000000) | ""} />
                    <Rows item={x?.status} />
                    <Rows item={x?.bidId} />
                    <Rows item={x?.isHighestBidder ? "Yes" : ""} />
                    <Rows item={x?.bidFailureReason} />
                    <Rows item={x?.code} />
                    <Rows item={x?.message} />
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
