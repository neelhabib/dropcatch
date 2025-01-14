import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
export default function QTable() {
  const relatedQuestions = useSelector((state) => state?.relatedQuestions);
  const questions = relatedQuestions?.map((x) => x[1])?.flat();

  return (
    <div>
      <SimpleBar style={{ maxHeight: "20rem" }}>
        <Table removeWrapper selectionMode="single" isStriped>
          <TableHeader>
            <TableColumn>Frequently Searched Questions on Google </TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            {questions?.length > 0 ? (
              questions?.map((x, i) => (
                <TableRow key={i}>
                  <TableCell
                    style={{ fontFamily: "jost" }}
                    className="text-medium"
                  >
                    {x}
                  </TableCell>
                  <TableCell
                    style={{ fontFamily: "jost" }}
                    className="text-medium"
                  >
                    <Link
                      isExternal
                      underline="hover"
                      href={`https://google.com/search?q=${x}`}
                      //   className="text-gray-600"
                    >
                      Search
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key="1">
                <TableCell>. . .</TableCell>
                <TableCell>. . .</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </SimpleBar>
    </div>
  );
}
