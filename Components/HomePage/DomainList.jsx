import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import dayjs from "dayjs";

export default function DomainList({ whoisData }) {
  return (
    <div>
      <div className="flex items-center">
        <span className="text-sm mr-2">Resolved: </span>
        <Chip color="success" size="sm" radius="sm" variant="flat">
          {whoisData && whoisData?.length}
        </Chip>
      </div>

      <Table isStriped isCompact classNames={{ wrapper: "shadow-none" }}>
        <TableHeader>
          <TableColumn className="fs--1 text-nowrap">Request</TableColumn>
          <TableColumn className="fs--1 text-nowrap">Domain</TableColumn>
          <TableColumn className="fs--1 text-nowrap">Status</TableColumn>
          <TableColumn className="fs--1 text-nowrap mx-6">
            Whois Updated On
          </TableColumn>
          <TableColumn className="fs--1 text-nowrap">Age</TableColumn>
          <TableColumn className="fs--1 text-nowrap">Creation Date</TableColumn>
          <TableColumn className="fs--1 text-nowrap">Expiry Date</TableColumn>
          <TableColumn className="fs--1 text-nowrap">Updated On</TableColumn>
          <TableColumn className="fs--1 text-nowrap">Registrar</TableColumn>
          <TableColumn className="fs--1 text-nowrap">Name Server</TableColumn>
        </TableHeader>
        <TableBody>
          {whoisData &&
            whoisData
              ?.filter((x) => x)
              ?.map((x, i) => (
                <TableRow key={i} className="">
                  <TableCell className="fs--1 text-center">{i + 1}</TableCell>
                  <TableCell className="fs--1 poppins">
                    {x["Domain Name"]?.toLowerCase() || x["Domain name"]}
                  </TableCell>
                  <TableCell className="fs--1 poppins">
                    {x["Domain Status"]?.split(" ")?.[0] || "Dropped"}
                  </TableCell>
                  <TableCell className="fs--1 poppins text-nowrap">
                    {x?.[">>> Last update of whois database"]
                      ?.split("<<<")?.[0]
                      ?.trim()}
                  </TableCell>
                  <TableCell className="fs--1 text-nowrap">
                    {x["Creation Date"]
                      ? dayjs().$y -
                        dayjs(x["Creation Date"].slice(0, 10)).$y +
                        " yrs"
                      : x["Registered on"]
                      ? dayjs().$y - dayjs(x["Registered on"]).$y + " yrs"
                      : "N/A"}
                  </TableCell>
                  <TableCell className="fs--1 text-nowrap">
                    {x["Creation Date"]?.slice(0, 10) ||
                      x["Registered on"] ||
                      "N/A"}
                  </TableCell>
                  <TableCell className="fs--1 text-nowrap">
                    {x["Registry Expiry Date"]?.slice(0, 10) ||
                      x["Expiry date"] ||
                      "N/A"}
                  </TableCell>
                  <TableCell className="fs--1 text-nowrap">
                    {x["Updated Date"]?.slice(0, 10) ||
                      x["Last updated"] ||
                      "N/A"}
                  </TableCell>
                  <TableCell className="fs--1 text-nowrap">
                    {x["Registrar"]}
                  </TableCell>
                  <TableCell className="fs--1 text-nowrap">
                    {x["Name Server"]?.toLowerCase() ||
                      x["Name servers"]?.toLowerCase() ||
                      "N/A"}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
