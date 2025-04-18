import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function DomainTable() {
  const godaddyAuctions = useSelector((state) => state.godaddyAuctions);
  const token = JSON.parse(localStorage.getItem("lg_tk"));

  const selectedDomains = (domain) => {
    axios
      .post("/api/bidding/selected-domains", {
        token: token?.token,
        data: domain,
      })
      .then((res) => {
        toast.success(
          <>
            <div>
              <span className="font-semibold mr-1">{domain?.fqdn} </span>
              added to the auction list.
            </div>
          </>,
          {
            position: "top-right",
            duration: 3000,
          }
        );
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.err("Some Error Occurred. Please see the browser console", {
          position: "top-right",
          duration: 3000,
        });
      });
  };
  return (
    <>
      <Toaster />
      <Table
        aria-label="auction list"
        isStriped
        color="secondary"
        // selectionMode="single"
        onSelectionChange={console.log}
      >
        <TableHeader>
          <TableColumn>Domain</TableColumn>
          <TableColumn>Listing Id</TableColumn>
          <TableColumn>Auction Price</TableColumn>
          <TableColumn>Bidder</TableColumn>
          <TableColumn>Auction End</TableColumn>
        </TableHeader>
        <TableBody items={godaddyAuctions}>
          {godaddyAuctions?.length > 0 ? (
            godaddyAuctions?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <div className="flex justify-between items-center">
                    <span>{item?.fqdn}</span>
                    <span
                      className="cursor-pointer mr-10"
                      onClick={() => selectedDomains(item)}
                    >
                      <FontAwesomeIcon
                        icon={faPlusCircle}
                        className="text-gray-700 hover:text-gray-400 active:text-green-500 transition-all duration-300 text-lg active:scale-85"
                      />
                    </span>
                  </div>
                </TableCell>
                <TableCell className="">{item?.auction_id}</TableCell>
                <TableCell className="">
                  {item?.auction_price_display_usd}
                </TableCell>
                <TableCell className="">{item?.bids}</TableCell>
                <TableCell className="">{item?.auction_end_time}</TableCell>
              </TableRow>
            ))
          ) : (
            <>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </>
          )}
        </TableBody>
      </Table>
    </>
  );
}
