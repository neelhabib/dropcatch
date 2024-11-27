import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export default function Content({ title, catchedInfo }) {
  return (
    <>
      {/* <p className="text-center">{title}</p> */}
      <Table
        color="primary"
        selectionMode="none"
        isCompact
        isStriped
        fullWidth
        isHeaderSticky
        classNames={{
          base: "overflow-y-scroll max-h-[270px]",
          wrapper: "shadow-none p-0",
        }}
      >
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
                <TableRow key={i}>
                  <TableCell className="">{i + 1}</TableCell>
                  <TableCell className="">{x?.domain}</TableCell>

                  <TableCell className="">{x?.status}</TableCell>
                  <TableCell className="text-xs">{x?.errorStatus}</TableCell>
                  <TableCell className="">{x?.responseCode}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  );
}
