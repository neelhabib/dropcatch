import { Button, Chip, Input, Spinner, Textarea } from "@heroui/react";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  setNameCheapCatched,
  setDynadotCatched,
  setNamesiloCatched,
  setGodaddyCatched,
  setDynadotWhois,
  setNamesiloWhois,
  setGodaddyWhois,
  setNameCheapWhois,
  setSpaceShipWhois,
  setSpaceShipCatched,
} from "../../Redux/reducer";

import { socket } from "../../socket";

let nameCheapInterval;
let dynadotInterval;
let nameSiloInterval;
let godaddyInterval;
let spaceShipInterval;

export default function DomainInput({
  apis,
  emit,
  catchEmit,
  nameCheap,
  dynadot,
  nameSilo,
  godaddy,
  spaceShip,
  porkBun,
  openProvider,
  loopia,
}) {
  const [domains, setDomains] = useState("");
  const [waitTime, setWaitTime] = useState(1000);
  const [loading, setLoading] = useState(false);

  const godaddyApi = apis?.godaddy;
  const nameCheapApi = apis?.nameCheap;
  const dynadotApi = apis?.dynadot;
  const nameSiloApi = apis?.nameSilo;
  const spaceShipApi = apis?.spaceShip;

  const dispatch = useDispatch();

  const data = domains
    .split("\n")
    .join(" ")
    .trim()
    .split(" ")
    .filter((x) => x);

  const handleSubmit = (e) => {
    setLoading(true);

    if (nameCheap) dispatch(setNameCheapWhois(""));
    if (nameCheap) dispatch(setNameCheapCatched(""));

    if (dynadot) dispatch(setDynadotWhois(""));
    if (dynadot) dispatch(setDynadotCatched(""));

    if (nameSilo) dispatch(setNamesiloWhois(""));
    if (nameSilo) dispatch(setNamesiloCatched(""));

    if (godaddy) dispatch(setGodaddyWhois(""));
    if (godaddy) dispatch(setGodaddyCatched(""));

    if (spaceShip) dispatch(setSpaceShipWhois(""));
    if (spaceShip) dispatch(setSpaceShipCatched(""));

    if (nameCheap) {
      if (nameCheapInterval) clearInterval(nameCheapInterval);
      nameCheapInterval = setInterval(() => {
        socket.emit(emit, {
          domains: data,
          registrer: "namecheap",
          nameCheapApi,
        });
      }, Number(waitTime));
    } else if (dynadot) {
      if (dynadotInterval) clearInterval(dynadotInterval);
      dynadotInterval = setInterval(() => {
        socket.emit(emit, { domains: data, registrer: "dynadot", dynadotApi });
      }, Number(waitTime));
    } else if (nameSilo) {
      if (nameSiloInterval) clearInterval(nameSiloInterval);
      nameSiloInterval = setInterval(() => {
        socket.emit(emit, {
          domains: data,
          registrer: "namesilo",
          nameSiloApi,
        });
      }, Number(waitTime));
    } else if (godaddy) {
      if (godaddyInterval) clearInterval(godaddyInterval);

      godaddyInterval = setInterval(() => {
        socket.emit(emit, { domains: data, registrer: "godaddy", godaddyApi });
      }, Number(waitTime));
    } else if (spaceShip) {
      if (spaceShipInterval) clearInterval(spaceShipInterval);
      spaceShipInterval = setInterval(() => {
        socket.emit(emit, {
          domains: data,
          registrer: "spaceship",
          spaceShipApi,
        });
      }, Number(waitTime));
    }
  };

  useEffect(() => {
    // whois emit
    socket.on(emit, (res) => {
      if (nameCheap) dispatch(setNameCheapWhois(res));
      if (dynadot) dispatch(setDynadotWhois(res));
      if (nameSilo) dispatch(setNamesiloWhois(res));
      if (godaddy) dispatch(setGodaddyWhois(res));
      if (spaceShip) dispatch(setSpaceShipWhois(res));
    });
    // dropcatch emit
    socket.on(catchEmit, (res) => {
      if (nameCheap) dispatch(setNameCheapCatched(res));
      if (dynadot) dispatch(setDynadotCatched(res));
      if (nameSilo) dispatch(setNamesiloCatched(res));
      if (godaddy) dispatch(setGodaddyCatched(res));
      if (spaceShip) dispatch(setSpaceShipCatched(res));
    });

    return () => {
      socket.off(emit);
      socket.off(catchEmit);
    };
  }, [dispatch]);

  const handleStop = () => {
    setLoading(false);
    if (nameCheap) clearInterval(nameCheapInterval);
    if (dynadot) clearInterval(dynadotInterval);
    if (nameSilo) clearInterval(nameSiloInterval);
    if (godaddy) clearInterval(godaddyInterval);
    if (spaceShip) clearInterval(spaceShipInterval);
  };
  return (
    <form className="px-2">
      <div className="mb-1">
        {/* <p className="fs--1 text-500">List of Domains | one domain per line</p> */}
        <Textarea
          classNames={{ label: "text-xs" }}
          className="List of Domains | one domain per line"
          label="One domain per line | Max 2 domains recommended"
          // variant="bordered"
          value={domains}
          onChange={(e) => setDomains(e.target.value)}
          placeholder={`example.com\nbestdomain.com`}
          required
          minRows={7}
        />
        <Chip
          color="primary"
          size="sm"
          radius="sm"
          variant="flat"

          // className="rounded-3 fs--1 px-2"
        >
          {data?.length}
        </Chip>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 my-2">
        <div>
          <p className="text-xs text-gray-600">Wait time (Milliseconds)</p>
          <Input
            // label="Wait time (Milliseconds)"
            // labelPlacement="outside"
            value={waitTime}
            className="shadow-none"
            onChange={(e) => setWaitTime(e.target.value)}
            type="number"
            step={500}
          />
        </div>
        <div className="flex justify-between gap-2">
          <Button onClick={handleSubmit} color="primary" isLoading={loading}>
            Check
          </Button>
          <Button color="danger" onClick={handleStop}>
            Stop
          </Button>
        </div>
      </div>
    </form>
  );
}
