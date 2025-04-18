import axios from "axios";
import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import DomainCard from "./DomainCard";
import { addToast, Button, Card, CardBody } from "@heroui/react";
import { useDispatch } from "react-redux";
import { setManualBiddingDomains } from "../../../Redux/reducer";
import BiddingTable from "./BiddingTable";
import EmptyCard from "../SingleBidding/EmptyCard";

export default function ManualBidding() {
  const [apis, setApis] = useState({});
  const token = JSON.parse(localStorage.getItem("lg_tk"));
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleBid = () => {
    if (
      cards?.filter(
        (x) => !x?.bidAmount || isNaN(x?.bidAmount) || Number(x?.bidAmount) <= 0
      )?.length > 0
    ) {
      console.log("Invalid bid amount");
      addToast({
        title: "Invalid bid amount",
        variant: "bordered",
        color: "danger",
        timeout: 3000,
      });
      return;
    }

    setLoading(true);
    socket.emit("manual-bidding", { apis, domains: cards }); // Emit immediately with fresh cards
  };

  useEffect(() => {
    socket.on("manual-bidding", (data) => {
      // console.log(data);
      dispatch(setManualBiddingDomains(data));
      setLoading(false);
    });

    return () => {
      // Cleanup: Remove all event listeners when unmounting
      socket.off("manual-bidding");
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
        <div className="bg-blue-100 rounded-lg p-2">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 items-end ">
            <DomainCard cards={cards} setCards={setCards} />
          </div>
          <div className="col-span-2 mt-3">
            <Card>
              <CardBody>
                <div className="flex justify-between items-center gap-4">
                  <Button
                    isLoading={loading}
                    className="px-8"
                    color="secondary"
                    onPress={handleBid}
                  >
                    Bid Now
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      ) : (
        <>
          <EmptyCard />
        </>
      )}

      <div className="my-4">
        <BiddingTable />
      </div>
    </div>
  );
}
