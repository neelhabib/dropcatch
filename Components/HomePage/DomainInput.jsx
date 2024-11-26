import { Button, Chip, Input, Spinner, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  setDropCatch,
  setNameCheapCatched,
  setDynadotCatched,
  setEpikCatched,
  setGodaddyCatched,
  setDynadotWhois,
  setEpikWhois,
  setGodaddyWhois,
  setNameCheapWhois,
} from "../../Redux/reducer";

// import { socket } from "../../socket";

let nameCheapInterval;
let dynadotInterval;
let epikInterval;
let godaddyInterval;

export default function DomainInput({
  emit,
  catchEmit,
  nameCheap,
  dynadot,
  epik,
  godaddy,
}) {
  const [domains, setDomains] = useState("");
  const [waitTime, setWaitTime] = useState(2);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const data = domains
    .split("\n")
    .join(" ")
    .trim()
    .split(" ")
    .filter((x) => x);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   if (nameCheap) dispatch(setNameCheapWhois(""));
  //   if (nameCheap) dispatch(setNameCheapCatched(""));

  //   if (dynadot) dispatch(setDynadotWhois(""));
  //   if (dynadot) dispatch(setDynadotCatched(""));

  //   if (epik) dispatch(setEpikWhois(""));
  //   if (epik) dispatch(setEpikCatched(""));

  //   if (godaddy) dispatch(setGodaddyWhois(""));
  //   if (godaddy) dispatch(setGodaddyCatched(""));

  //   if (nameCheap) {
  //     if (nameCheapInterval) clearInterval(nameCheapInterval);
  //     nameCheapInterval = setInterval(() => {
  //       socket.emit(emit, { domains: data, registrer: "namecheap" });
  //     }, Number(waitTime));
  //   } else if (dynadot) {
  //     if (dynadotInterval) clearInterval(dynadotInterval);
  //     dynadotInterval = setInterval(() => {
  //       socket.emit(emit, { domains: data, registrer: "dynadot" });
  //     }, Number(waitTime));
  //   } else if (epik) {
  //     if (epikInterval) clearInterval(epikInterval);
  //     epikInterval = setInterval(() => {
  //       socket.emit(emit, { domains: data, registrer: "epik" });
  //     }, Number(waitTime));
  //   } else if (godaddy) {
  //     if (godaddyInterval) clearInterval(godaddyInterval);
  //     godaddyInterval = setInterval(() => {
  //       socket.emit(emit, { domains: data, registrer: "godaddy" });
  //     }, Number(waitTime));
  //   }
  // };

  // useEffect(() => {
  //   // whois emit
  //   socket.on(emit, (res) => {
  //     if (nameCheap) dispatch(setNameCheapWhois(res));
  //     if (dynadot) dispatch(setDynadotWhois(res));
  //     if (epik) dispatch(setEpikWhois(res));
  //     if (godaddy) dispatch(setGodaddyWhois(res));
  //   });
  //   // dropcatch emit
  //   socket.on(catchEmit, (res) => {
  //     if (nameCheap) dispatch(setNameCheapCatched(res));
  //     if (dynadot) dispatch(setDynadotCatched(res));
  //     if (epik) dispatch(setEpikCatched(res));
  //     if (godaddy) dispatch(setGodaddyCatched(res));
  //   });

  //   return () => {
  //     socket.off(emit);
  //     socket.off(catchEmit);
  //   };
  // }, [dispatch]);

  // const handleStop = () => {
  //   setLoading(false);
  //   if (nameCheap) clearInterval(nameCheapInterval);
  //   if (dynadot) clearInterval(dynadotInterval);
  //   if (epik) clearInterval(epikInterval);
  //   if (godaddy) clearInterval(godaddyInterval);
  // };
  return (
    <form className="px-2">
      <div className="mb-1">
        <p className="fs--1 text-500">List of Domains | one domain per line</p>
        <Textarea
          className=""
          variant="bordered"
          value={domains}
          onChange={(e) => setDomains(e.target.value)}
          placeholder={`namelooka.com\nbestproducts.com\nbuilder.io\nnamehunter.co`}
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
      <div className="flex justify-between items-end">
        <div>
          <p className="fs-2 text-gray-600">Wait time (Second)</p>
          <Input
            value={waitTime}
            className="shadow-none"
            onChange={(e) => setWaitTime(e.target.value)}
            type="number"
          />
        </div>
        <Button
          // onClick={handleSubmit}
          color="primary"
          className={`inline-flex flex-center gap-1 mx-1 ${
            !loading ? "px-5" : "px-3"
          }`}
        >
          {loading ? (
            <span className="flex items-center">
              <Spinner size="sm" />
              <span className="ms-1">Checking...</span>
            </span>
          ) : (
            "Check"
          )}
        </Button>
        <Button color="danger">Stop</Button>
      </div>
    </form>
  );
}
