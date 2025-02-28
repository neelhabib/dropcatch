import axios from "axios";
import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import DomainCard from "./DomainCard";
import { useDispatch } from "react-redux";
import { setBiddingDomains } from "../../../Redux/reducer";
import BiddingTable from "./BiddingTable";
import { Card, CardBody } from "@nextui-org/react";
import EmptyCard from "./EmptyCard";

export default function SingleBidding() {
  const [apis, setApis] = useState({});
  const token = JSON.parse(localStorage.getItem("lg_tk"));
  const [domains, setDomains] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/api/bidding/selected-domains", { params: { token: token?.token } })
      .then((res) => {
        // console.log(res.data);
        setDomains(res.data);
      });
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
    const handleSocketEvent = (eventName, data) => {
      dispatch(setBiddingDomains(data));
      return eventName;
    };

    socket.onAny(handleSocketEvent);

    return () => {
      socket.offAny(handleSocketEvent); // Cleanup when unmounting
    };
  }, []);
  return (
    <div className="m-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {domains?.map((x, i) => (
          <DomainCard key={i} domain={x} apis={apis} />
        ))}
      </div>
      <div>{domains?.length === 0 && <EmptyCard />}</div>
      <div className="my-4">
        <BiddingTable />
      </div>
    </div>
  );
}
