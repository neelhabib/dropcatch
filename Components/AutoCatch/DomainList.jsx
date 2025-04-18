import { Chip } from "@heroui/react";
import dayjs from "dayjs";
export default function DomainList({ whoisData }) {
  const headers = [
    "Request",
    "Domain",
    "Status",
    "Whois Updated On",
    "Age",
    "Creation Date",
    "Expiry Date",
    "Updated On",
    "Registrar",
    "NameServer",
  ];
  const Header = () => {
    return (
      <>
        {headers?.map((x, i) => (
          <th scope="col" className="py-3  text-center" key={i}>
            <div className="flex items-center justify-center gap-x-2">
              <span className="text-xs font-semibold  tracking-wide text-gray-800 dark:text-gray-400">
                {x}
              </span>
            </div>
          </th>
        ))}
      </>
    );
  };
  const Rows = ({ item }) => {
    return (
      <td className="size-px whitespace-nowrap text-center">
        <div className="mx-6 py-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {item}
          </span>
        </div>
      </td>
    );
  };
  return (
    <>
      <div className="flex flex-col mt-6">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
              {/* Header */}
              <div className="mx-6 py-4 grid gap-3 md:flex md:justify-between md:items-center">
                <div className="flex items-center">
                  <span className="text-sm mr-2">Whois Resolved: </span>
                  {whoisData && (
                    <Chip color="success" size="sm" radius="sm" variant="flat">
                      {whoisData?.length}
                    </Chip>
                  )}
                </div>
              </div>
              {/* End Header */}
              {/* Table */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-600">
                  <tr>
                    <Header />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {whoisData &&
                    whoisData?.map((x, i) => (
                      <tr key={i}>
                        <Rows item={i + 1} />
                        <Rows
                          item={
                            x["Domain Name"]?.toLowerCase() || x["Domain name"]
                          }
                        />
                        <Rows
                          item={
                            x["Domain Status"]?.split(" ")?.[0] || "Dropped"
                          }
                        />
                        <Rows
                          item={x?.[">>> Last update of whois database"]
                            ?.split("<<<")?.[0]
                            ?.trim()}
                        />
                        <Rows
                          item={
                            x["Creation Date"]
                              ? dayjs().$y -
                                dayjs(x["Creation Date"].slice(0, 10)).$y +
                                " yrs"
                              : x["Registered on"]
                              ? dayjs().$y -
                                dayjs(x["Registered on"]).$y +
                                " yrs"
                              : "N/A"
                          }
                        />
                        <Rows
                          item={
                            x["Creation Date"]?.slice(0, 10) ||
                            x["Registered on"] ||
                            "N/A"
                          }
                        />
                        <Rows
                          item={
                            x["Registry Expiry Date"]?.slice(0, 10) ||
                            x["Expiry date"] ||
                            "N/A"
                          }
                        />
                        <Rows
                          item={
                            x["Updated Date"]?.slice(0, 10) ||
                            x["Last updated"] ||
                            "N/A"
                          }
                        />
                        <Rows item={x["Registrar"]} />
                        <Rows
                          item={
                            x["Name Server"]?.toLowerCase() ||
                            x["Name servers"]?.toLowerCase() ||
                            "N/A"
                          }
                        />
                      </tr>
                    ))}
                </tbody>
              </table>
              {/* End Table */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
