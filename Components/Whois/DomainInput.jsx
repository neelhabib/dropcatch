import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import {
  Button,
  Card,
  CardBody,
  Chip,
  Input,
  Spacer,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { setBulkWhois } from "../../Redux/reducer";

let intervalId;

export default function DomainInput() {
  const [domain, setDomain] = useState("");
  const [waitTime, setWaitTime] = useState(3);
  const [spin, setSpin] = useState(false);
  const dispatch = useDispatch();
  let num = 0;
  const data = domain
    .split("\n")
    .join(" ")
    .trim()
    .split(" ")
    .filter((x) => x);

  // this function will send the data to the server
  const handleSubmit = (e) => {
    setSpin(true);
    dispatch(setBulkWhois(""));
    num = 0;
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      num >= data.length ? setSpin(false) : setSpin(true);
      if (num < data.length) {
        axios
          .post("/api/whois/bulk-whois", {
            domain: data[num],
          })
          .then((res) => {
            console.log(res.data);
            dispatch(setBulkWhois(res.data));
          });
        num++;
      }
    }, waitTime * 1000);
  };
  const handleStop = () => {
    clearInterval(intervalId);
    setSpin(false);
  };

  return (
    <Card>
      <CardBody>
        <div>
          <Textarea
            label="List of Domains | one domain per line"
            value={domain}
            placeholder={`namelooka.com\nbestproducts.com\nbuilder.io\nnamehunter.co`}
            minRows={8}
            onChange={(e) => setDomain(e.target.value)}
          />
          <Spacer y={1} />
          <Chip radius="sm" color="secondary" variant="flat" size={"xs"}>
            {data.length}
          </Chip>
        </div>
        <Spacer y={1} />
        <div className="flex flex-col justify-center items-center sm:flex-row sm:justify-between sm:items-end">
          <Input
            value={waitTime <= 1 ? 1 : waitTime}
            min={1}
            size="sm"
            label="Wait Time (Second)"
            className="max-w-fit"
            onChange={(e) => setWaitTime(e.target.value)}
            type="number"
            aria-label="input"
          />

          <Button
            size={"sm"}
            radius="sm"
            onPress={handleSubmit}
            // color={"gradient"}
            className="w-full my-1 sm:w-32"
          >
            {spin ? <Spinner size="sm" color={"currentColor"} /> : "Check"}
          </Button>
          <Button
            size={"sm"}
            radius="sm"
            color={"warning"}
            onPress={handleStop}
            className="w-full my-1 sm:w-32"
          >
            Stop
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
