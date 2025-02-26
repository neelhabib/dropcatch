import axios from "axios";
import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import DomainCard from "./DomainCard";
import { useDispatch, useSelector } from "react-redux";
import { setBiddingDomains } from "../../../Redux/reducer";
import BiddingTable from "./BiddingTable";
import DomainList from "./DomainList";

export default function MultiBidding() {
  const [apis, setApis] = useState({});
  const token = JSON.parse(localStorage.getItem("lg_tk"));
  const [domains, setDomains] = useState([]);
  const dispatch = useDispatch();
  const multiBiddingDomains = useSelector((state) => state.multiBiddingDomains);
  useEffect(() => {
    axios
      .get("/api/bidding/selected-domains", { params: { token: token?.token } })
      .then((res) => {
        console.log(res.data);
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
      <div className="grid grid-cols-4 gap-3">
        <div className="grid col-span-3 sm:grid-cols-2 gap-3 bg-primary-100 rounded-lg p-2">
          {multiBiddingDomains?.map((x, i) => (
            <DomainCard key={i} domain={x} apis={apis} />
          ))}
        </div>
        <div className="bg-slate-200 p-2 rounded-lg flex flex-col gap-2">
          {domains?.map((x, i) => (
            <DomainList key={i} domain={x} />
          ))}
        </div>
      </div>

      <div className="my-4">
        <BiddingTable />
      </div>
    </div>
  );
}
