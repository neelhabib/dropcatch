import { Chip } from "@nextui-org/react";
import dayjs from "dayjs";
export default function DomainList({ whoisData }) {
  return (
    <>
      <div className="flex flex-col mt-6">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              {/* Header */}
              <div className="mx-6 py-4 grid gap-3 md:flex md:justify-between md:items-center">
                <div className="flex items-center">
                  <span className="text-sm mr-2">Resolved: </span>
                  <Chip color="success" size="sm" radius="sm" variant="flat">
                    {whoisData && whoisData?.length}
                  </Chip>
                </div>
              </div>
              {/* End Header */}
              {/* Table */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3  text-center">
                      <div className="flex items-center justify-center gap-x-2">
                        <span className="text-xs font-semibold  tracking-wide text-gray-800">
                          Request
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="py-3  text-center">
                      <div className="flex items-center justify-center gap-x-2">
                        <span className="text-xs font-semibold  tracking-wide text-gray-800">
                          Domain
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="py-3  text-center">
                      <div className="flex items-center justify-center gap-x-2">
                        <span className="text-xs font-semibold  tracking-wide text-gray-800">
                          Status
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="py-3  text-center">
                      <div className="flex items-center justify-center gap-x-2">
                        <span className="text-xs font-semibold  tracking-wide text-gray-800">
                          Whois Updated On
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="py-3  text-center">
                      <div className="flex items-center justify-center gap-x-2">
                        <span className="text-xs font-semibold  tracking-wide text-gray-800">
                          Age
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="py-3  text-center">
                      <div className="flex items-center justify-center gap-x-2">
                        <span className="text-xs font-semibold  tracking-wide text-gray-800">
                          Creation Date
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="py-3  text-center">
                      <div className="flex items-center justify-center gap-x-2">
                        <span className="text-xs font-semibold  tracking-wide text-gray-800">
                          Expiry Date
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="py-3  text-center">
                      <div className="flex items-center justify-center gap-x-2">
                        <span className="text-xs font-semibold  tracking-wide text-gray-800">
                          Updated On
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="py-3  text-center">
                      <div className="flex items-center justify-center gap-x-2">
                        <span className="text-xs font-semibold  tracking-wide text-gray-800">
                          Registrar
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="py-3  text-center">
                      <div className="flex items-center justify-center gap-x-2">
                        <span className="text-xs font-semibold  tracking-wide text-gray-800">
                          Name Server
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {whoisData &&
                    whoisData
                      ?.filter((y) => y)
                      ?.map((x, i) => (
                        <>
                          <tr key={i}>
                            <td className="size-px whitespace-nowrap text-center">
                              <div className="mx-6 py-2">
                                <span className="text-sm text-gray-600 text-center">
                                  {i + 1}
                                </span>
                              </div>
                            </td>
                            <td className="size-px whitespace-nowrap">
                              <div className="mx-6 py-2">
                                <span className="text-sm text-gray-600">
                                  {x["Domain Name"]?.toLowerCase() ||
                                    x["Domain name"]}
                                </span>
                              </div>
                            </td>
                            <td className="size-px whitespace-nowrap">
                              <div className="mx-6 py-2">
                                <span className="text-sm text-gray-600">
                                  {x["Domain Status"]?.split(" ")?.[0] ||
                                    "Dropped"}
                                </span>
                              </div>
                            </td>
                            <td className="size-px whitespace-nowrap">
                              <div className="mx-6 py-2">
                                <span className="text-sm text-gray-600">
                                  {x?.[">>> Last update of whois database"]
                                    ?.split("<<<")?.[0]
                                    ?.trim()}
                                </span>
                              </div>
                            </td>
                            <td className="size-px whitespace-nowrap">
                              <div className="mx-6 py-2">
                                <span className="text-sm text-gray-600">
                                  {x["Creation Date"]
                                    ? dayjs().$y -
                                      dayjs(x["Creation Date"].slice(0, 10))
                                        .$y +
                                      " yrs"
                                    : x["Registered on"]
                                    ? dayjs().$y -
                                      dayjs(x["Registered on"]).$y +
                                      " yrs"
                                    : "N/A"}
                                </span>
                              </div>
                            </td>
                            <td className="size-px whitespace-nowrap">
                              <div className="mx-6 py-2">
                                <span className="text-sm text-gray-600">
                                  {x["Creation Date"]?.slice(0, 10) ||
                                    x["Registered on"] ||
                                    "N/A"}
                                </span>
                              </div>
                            </td>
                            <td className="size-px whitespace-nowrap">
                              <div className="mx-6 py-2">
                                <span className="text-sm text-gray-600">
                                  {x["Registry Expiry Date"]?.slice(0, 10) ||
                                    x["Expiry date"] ||
                                    "N/A"}
                                </span>
                              </div>
                            </td>
                            <td className="size-px whitespace-nowrap">
                              <div className="mx-6 py-2">
                                <span className="text-sm text-gray-600">
                                  {x["Updated Date"]?.slice(0, 10) ||
                                    x["Last updated"] ||
                                    "N/A"}
                                </span>
                              </div>
                            </td>
                            <td className="size-px whitespace-nowrap">
                              <div className="mx-6 py-2">
                                <span className="text-sm text-gray-600">
                                  {x["Registrar"]}
                                </span>
                              </div>
                            </td>
                            <td className="size-px whitespace-nowrap">
                              <div className="mx-6 py-2">
                                <span className="text-sm text-gray-600">
                                  {x["Name Server"]?.toLowerCase() ||
                                    x["Name servers"]?.toLowerCase() ||
                                    "N/A"}
                                </span>
                              </div>
                            </td>
                          </tr>
                        </>
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
