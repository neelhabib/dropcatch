import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../../socket";
import DomainCard from "./DomainCard";
// import { setBiddingDomains } from "../../../Redux/reducer";
// import BiddingTable from "./BiddingTable";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { setMultiBiddingDomains } from "../../../Redux/reducer";
import BiddingTable from "./BiddingTable";
import EmptyCard from "../SingleBidding/EmptyCard";
export default function MultiBidding() {
  const [apis, setApis] = useState({});
  const token = JSON.parse(localStorage.getItem("lg_tk"));
  const [waitTime, setWaitTime] = useState(5);
  const [cards, setCards] = useState([]);
  const [biddingData, setBiddingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const biddingInterval = useRef(null);
  const dispatch = useDispatch();
  const handleBid = () => {
    if (
      cards?.filter(
        (x) => !x?.bidAmount || isNaN(x?.bidAmount) || Number(x?.bidAmount) <= 0
      )?.length > 0
    ) {
      console.log("Invalid bid amount");
      return;
    }
    if (biddingInterval.current) {
      clearInterval(biddingInterval.current);
    }

    setBiddingData(cards); // Ensure biddingData starts with the latest cards
    setLoading(true);
    socket.emit("multi-bidding", { apis, domains: cards }); // Emit immediately with fresh cards

    biddingInterval.current = setInterval(() => {
      setBiddingData((prevData) => {
        const updatedData = prevData
          .map((x) => ({
            ...x,
            bidAmount: Number(x.bidAmount) + Number(x.incrementalAmount),
          }))
          .filter((x) => x?.bidAmount <= x.maxBidAmount);

        if (updatedData.length === 0) {
          clearInterval(biddingInterval.current);
          setLoading(false);
          biddingInterval.current = null;
          console.log("Bidding ended: No more items left.");
        }

        socket.emit("multi-bidding", { apis, domains: updatedData });

        return updatedData;
      });
    }, waitTime * 1000);
  };

  const handleStop = () => {
    clearInterval(biddingInterval.current);
    setLoading(false);
  };
  useEffect(() => {
    socket.on("multi-bidding", (data) => {
      console.log(data);
      dispatch(setMultiBiddingDomains(data));
    });

    return () => {
      // Cleanup: Remove all event listeners when unmounting
      socket.off("multi-bidding");
      clearInterval(biddingInterval.current);
    };
  }, []);

  useEffect(() => {
    axios
      .get("/api/apis/all", { params: { token: token?.token } })
      .then((res) => {
        // console.log(res.data);
        setApis(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get("/api/bidding/selected-domains", { params: { token: token?.token } })
      .then((res) => {
        setCards(
          res.data?.map((x) => ({
            fqdn: x?.fqdn,
            end_time: x?.end_time,
            auction_id: x?.auction_id,
            bidAmount: "",
            incrementalAmount: "",
            maxBidAmount: "",
          }))
        );
      });
  }, []);
  return (
    <div className="m-4">
      {cards?.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-blue-100 rounded-lg p-2">
          <DomainCard cards={cards} setCards={setCards} />
          <div className="col-span-2">
            <Card>
              <CardBody>
                <div className="flex justify-between items-center gap-4">
                  <Button
                    isLoading={loading}
                    className="px-8"
                    color="secondary"
                    onClick={handleBid}
                  >
                    Bid Now
                  </Button>
                  <Input
                    variant="bordered"
                    color="secondary"
                    classNames={{ inputWrapper: "border-1" }}
                    className="max-w-xs"
                    value={waitTime}
                    onChange={(e) => setWaitTime(e.target.value)}
                    label="Interval Seconds"
                    size="sm"
                    type="number"
                  />
                  <Button onClick={handleStop} className="px-8" color="warning">
                    Stop Now
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      ) : (
        <EmptyCard />
      )}

      <div className="my-4">
        <BiddingTable />
      </div>
    </div>
  );
}
