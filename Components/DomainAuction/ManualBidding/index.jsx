import { Button, Spacer } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import SearchBar from "./SearchBar";
import DomainTable from "./DomainTable";
export default function ManualBidding() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [apis, setApis] = useState({});
  const token = JSON.parse(localStorage.getItem("lg_tk"));

  const handleBid = () => {
    setLoading(true);
    // socket.emit('manual-bidding', {apis})
    axios
      .post("/api/bidding/manual", {
        apis,
        token: token?.token,
        listingId: "616594012",
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("/api/apis/all", { params: { token: token?.token } })
      .then((res) => {
        // console.log(res.data);
        setApis(res.data);
      });
  }, []);

  return (
    <div className="m-4">
      <SearchBar />
      <Spacer y={"6"} />
      <DomainTable />
      {/* <div>
        <Button onClick={handleBid} isLoading={loading}>
          Bid Now
        </Button>
      </div> */}
    </div>
  );
}
