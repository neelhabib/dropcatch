import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

// convert array to csv
function convertToCSV(arr) {
  const array = [Object.keys(arr[0])].concat(arr);
  return array
    .map((it) => {
      return Object.values(it).toString();
    })
    .join("\n");
}

export default function BulkWhoisList() {
  const bulkWhois = useSelector((state) => state?.bulkWhois);

  // Download domain whois as csv
  const download = () => {
    const csvContent = convertToCSV(
      bulkWhois?.map((x) => ({
        Domain: x["Domain Name"]?.toLowerCase() || x["Domain name"],
        Age: x["Creation Date"]
          ? dayjs().$y - dayjs(x["Creation Date"].slice(0, 10)).$y + " yrs"
          : x["Registered on"]
          ? dayjs().$y - dayjs(x["Registered on"]).$y + " yrs"
          : "N/A",
        Creation_Date:
          x["Creation Date"]?.slice(0, 10) || x["Registered on"] || "N/A",
        Expiry_Date:
          x["Registry Expiry Date"]?.slice(0, 10) || x["Expiry date"] || "N/A",
        Updated_On:
          x["Updated Date"]?.slice(0, 10) || x["Last updated"] || "N/A",
        Registrar: x["Registrar"] || "N/A",
        Name_Server: x["Name Server"] || x["Name servers"] || "N/A",
      }))
    );
    var element = document.createElement("a");
    element.href = "data:text/csv;charset=utf-8," + encodeURI(csvContent);
    element.target = "_blank";
    element.download = "bulk_whois.csv";
    element.click();
  };

  return (
    <Card>
      <CardBody>
        <CardHeader className="flex justify-between items-center p-0 mb-2">
          <div className="flex items-center">
            <p>Success: </p>
            <Chip
              variant={"dot"}
              size={"sm"}
              color={"success"}
              className="ml-2"
            >
              {bulkWhois?.length}
            </Chip>
          </div>
          <Button className="ml-4" size={"sm"} onPress={download}>
            Download
          </Button>
        </CardHeader>
        <Table
          aria-label="Example static collection table"
          removeWrapper
          isCompact
        >
          <TableHeader>
            <TableColumn key="sl">#</TableColumn>
            <TableColumn key="domain">Domain</TableColumn>
            <TableColumn key="age">Age</TableColumn>
            <TableColumn key="creation">Creation</TableColumn>
            <TableColumn key="expiry">Expiry</TableColumn>
            <TableColumn key="update">Update</TableColumn>
            <TableColumn key="registrar">Registrar</TableColumn>
            <TableColumn key="ns">Name Server</TableColumn>
          </TableHeader>

          <TableBody>
            {bulkWhois &&
              bulkWhois
                ?.filter((x) => x)
                .map((x, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      <p className="font-semibold text-cyan-950">
                        {x["Domain Name"]?.toLowerCase() || x["Domain name"]}
                      </p>
                    </TableCell>
                    <TableCell>
                      {x["Creation Date"]
                        ? dayjs().$y -
                          dayjs(x["Creation Date"].slice(0, 10)).$y +
                          " yrs"
                        : x["Registered on"]
                        ? dayjs().$y - dayjs(x["Registered on"]).$y + " yrs"
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {x["Creation Date"]?.slice(0, 10) ||
                        x["Registered on"] ||
                        "N/A"}
                    </TableCell>
                    <TableCell>
                      {x["Registry Expiry Date"]?.slice(0, 10) ||
                        x["Expiry date"] ||
                        "N/A"}
                    </TableCell>
                    <TableCell>
                      {x["Updated Date"]?.slice(0, 10) ||
                        x["Last updated"] ||
                        "N/A"}
                    </TableCell>
                    <TableCell>{x["Registrar"]}</TableCell>
                    <TableCell>
                      {x["Name Server"]?.toLowerCase() ||
                        x["Name servers"]?.toLowerCase() ||
                        "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
