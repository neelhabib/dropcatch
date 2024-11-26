import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import SimpleBarReact from "simplebar-react";

export default function Content({ title, catchedInfo }) {
  return (
    <>
      <p className="text-center mb-2">{title}</p>
      <SimpleBarReact style={{ height: "15rem" }}>
        <Table removeWrapper>
          <TableHeader>
            <TableColumn>#</TableColumn>
            <TableColumn className="fs--1">Domain</TableColumn>

            <TableColumn className="fs--1">Status</TableColumn>
            <TableColumn className="fs--1">Error Status</TableColumn>
            <TableColumn className="fs--1">Response Code</TableColumn>
          </TableHeader>
          <TableBody>
            {catchedInfo &&
              catchedInfo
                .filter((x) => x)
                .map((x, i) => (
                  <TableRow key={i} className="rounded-3 bg- m-2">
                    <TableCell className="fs--1">{i + 1}</TableCell>
                    <TableCell className="fs--1 poppins">{x?.domain}</TableCell>

                    <TableCell className="fs--1">{x?.status}</TableCell>
                    <TableCell className="fs--1">{x?.errorStatus}</TableCell>
                    <TableCell className="fs--1">{x?.responseCode}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </SimpleBarReact>
    </>
  );
}
