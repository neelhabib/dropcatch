import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useEffect, useState, useRef } from "react";
import { Toaster } from "react-hot-toast";
import CountdownTimer from "./CountdownTimer";
import { socket } from "../../../socket";
import { useDispatch } from "react-redux";
import { setMultiBiddingDomains } from "../../../Redux/reducer";

export default function DomainList({ domain, apis }) {
  return (
    <>
      <Toaster />
      <Card>
        <CardBody className="flex flex-col gap-1">
          <div className="flex justify-between">
            <p>{domain?.fqdn}</p>
            <p>{domain?.auction_id}</p>
          </div>

          <div>
            <Button
              size="sm"
              color="secondary"
              onClick={useDispatch()(setMultiBiddingDomains(domain))}
            >
              Add Now
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
