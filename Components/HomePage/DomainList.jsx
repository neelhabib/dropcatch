import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import dayjs from "dayjs";

export default function DomainList({ whoisData }) {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center py-2">
        <h6 className="mb-0 ">
          Resolved:{" "}
          <span className="badge bg-success rounded-pill">
            {whoisData && whoisData?.length}
          </span>
        </h6>

        {/* <Button
          disabled={whoisData?.length > 0 ? false : true}
          variant="falcon-default"
          size="sm"
          className="px-1 fs--2 ms-6"
          onClick={download}
        >
          <ArrowDownCircleFill size={12} className="" /> Download
        </Button> */}
      </div>

      <Table removeWrapper>
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
