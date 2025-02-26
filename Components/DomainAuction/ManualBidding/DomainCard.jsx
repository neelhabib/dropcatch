import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useEffect, useState, useRef } from "react";
import { Toaster } from "react-hot-toast";
import CountdownTimer from "./CountdownTimer";
import { socket } from "../../../socket";

export default function DomainCard({ domain, apis }) {
  const [waitTime, setWaitTime] = useState(5);
  const [bidAmount, setBidAmount] = useState(5);
  const [maxBidAmount, setMaxBidAmount] = useState(20);
  const [incrementalAmount, setIncrementalAmount] = useState(5);
  const [loading, setLoading] = useState(false);
  const biddingInterval = useRef(null); // Store interval reference

  const handleBid = () => {
    if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= 0) {
      console.log("Invalid bid amount");
      return;
    }

    // Clear existing interval before starting a new one
    if (biddingInterval.current) {
      clearInterval(biddingInterval.current);
    }

    setLoading(true);

    // Emit the first bid immediately
    socket.emit(`${domain?.auction_id}`, {
      domain: domain?.fqdn,
      listingId: domain?.auction_id,
      bidAmount: Number(bidAmount),
      apis,
    });

    setBidAmount((prev) => Number(prev)); // Ensure state is updated

    // Start interval for subsequent bids
    biddingInterval.current = setInterval(() => {
      setBidAmount((prev) => {
        const newBidAmount = Number(prev) + Number(incrementalAmount);

        if (newBidAmount > Number(maxBidAmount)) {
          clearInterval(biddingInterval.current);
          setLoading(false);
          return Number(maxBidAmount);
        }

        console.log(newBidAmount, Number(maxBidAmount));

        socket.emit(`${domain?.auction_id}`, {
          domain: domain?.fqdn,
          listingId: domain?.auction_id,
          bidAmount: newBidAmount,
          apis,
        });

        return newBidAmount;
      });
    }, Number(waitTime * 1000));
  };

  useEffect(() => {
    const handleSocketEvent = (eventName, data) => {
      // console.log(eventName);
    };

    socket.onAny(handleSocketEvent);

    return () => {
      // Cleanup: Remove all event listeners when unmounting
      socket.offAny(handleSocketEvent);
      clearInterval(biddingInterval);
    };
  }, []);

  const handleStop = () => {
    clearInterval(biddingInterval.current);
    setLoading(false);
  };
  return (
    <>
      <Toaster />
      <Card>
        <CardBody className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p>{domain?.fqdn}</p>
            <p>{domain?.auction_id}</p>
          </div>
          <div className="grid grid-cols-2 justify-between gap-3">
            <Input
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              label="Your Bid"
              size="sm"
              type="number"
            />
            <Input
              value={incrementalAmount}
              onChange={(e) => setIncrementalAmount(e.target.value)}
              label="Incremental Amount"
              size="sm"
              type="number"
            />
            <Input
              value={maxBidAmount}
              onChange={(e) => setMaxBidAmount(e.target.value)}
              label="Maximum Bid"
              size="sm"
              type="number"
            />
            <Input
              value={waitTime}
              onChange={(e) => setWaitTime(e.target.value)}
              label="Interval Seconds"
              size="sm"
              type="number"
            />
          </div>
          <div className="flex justify-between items-center">
            <Button
              isLoading={loading}
              size="sm"
              color="secondary"
              onClick={handleBid}
            >
              Bid Now
            </Button>
            <Button size="sm" color="warning" onClick={handleStop}>
              Stop Now
            </Button>
            <CountdownTimer auctionEndTime={domain?.end_time} />
          </div>
        </CardBody>
      </Card>
    </>
  );
}
