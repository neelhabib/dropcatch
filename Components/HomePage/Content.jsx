import { Chip } from "@nextui-org/react";
import SimpleBarReact from "simplebar-react";
export default function Content({ title, catchedInfo }) {
  const header = ["#", "Domain", "Status", "Error Code", "Response Code"];
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
      <div className="max-h-72 overflow-auto border border-gray-100 dark:border-gray-600 shadow-sm rounded-lg ">
        <div className="mx-6 py-2 grid gap-3 md:flex md:justify-between md:items-center sticky">
          <div className="flex items-center">
            <span className="text-sm mr-2">API Resolved: </span>
            {catchedInfo && (
              <Chip color="success" size="sm" radius="sm" variant="flat">
                {catchedInfo?.length}
              </Chip>
            )}
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
            {catchedInfo &&
              catchedInfo
                .filter((y) => y)
                .map((x, i) => (
                  <tr key={i} className="rounded-3 bg- m-2">
                    <Rows item={i + 1} />
                    <Rows item={x?.domain} />
                    <Rows item={x?.status} />
                    <Rows item={x?.errorStatus} />
                    <Rows item={x?.responseCode} />
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
