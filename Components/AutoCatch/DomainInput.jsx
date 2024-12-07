import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Chip,
  Input,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function DomainInput() {
  const [domains, setDomains] = useState("");
  const [enable, setEnable] = useState(false);
  const [enableGodaddy, setEnableGodaddy] = useState(false);
  const [enableNameCheap, setEnableNameCheap] = useState(false);
  const [enableDynadot, setEnableDynadot] = useState(false);
  const [enableNameSilo, setEnableNameSilo] = useState(false);

  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("lg_tk"));

  const data = domains
    ?.split("\n")
    ?.join(" ")
    ?.trim()
    ?.split(" ")
    ?.filter((x) => x);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/auto-catch/save-domains", {
        domains: data,
        token,
        enable,
        enableGodaddy,
        enableNameCheap,
        enableDynadot,
        enableNameSilo,
      })
      .then((res) => {
        setLoading(false);
        toast.success(res.data?.message, { position: "bottom-right" });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Some Error Occurred", { position: "bottom-right" });
      });
  };

  useEffect(() => {
    axios
      .get("/api/auto-catch/save-domains", { params: { token: token?.token } })
      .then((res) => {
        if (res.data?.domains) {
          setDomains(res?.data?.domains?.join("\n"));
        }
        setEnable(res?.data?.enable);
        setEnableGodaddy(res?.data?.enableGodaddy);
        setEnableNameCheap(res?.data?.enableNameCheap);
        setEnableNameSilo(res?.data?.enableNameSilo);
        setEnableDynadot(res?.data?.enableDynadot);
      });
  }, []);

  return (
    <>
      <Toaster />
      <div>
        <div className="mb-1 flex justify-start gap-4">
          <Textarea
            label="List of Domains | one domain per line"
            value={domains}
            onChange={(e) => setDomains(e.target.value)}
            placeholder={`example.com\nbestdomain.com`}
            required
            className="w-[50%]"
            minRows={10}
          />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <Chip color="primary" size="sm" radius="sm" variant="flat">
                This will enable or disable the auto catching service.
              </Chip>
              <Checkbox isSelected={enable} onValueChange={setEnable} size="md">
                Enable Auto Service
              </Checkbox>
            </div>
            <div className="flex flex-col border p-2 rounded-lg gap-2">
              <Chip color="success" size="sm" radius="sm" variant="flat">
                The API you want to use on Auto Drop Catching
              </Chip>
              <Checkbox
                isSelected={enableGodaddy}
                onValueChange={setEnableGodaddy}
                size="md"
                color="success"
              >
                Enable Godaddy API
              </Checkbox>
              <Checkbox
                isSelected={enableNameCheap}
                onValueChange={setEnableNameCheap}
                size="md"
                color="success"
              >
                Enable NameCheap API
              </Checkbox>
              <Checkbox
                isSelected={enableDynadot}
                onValueChange={setEnableDynadot}
                size="md"
                color="success"
              >
                Enable Dynadot API
              </Checkbox>
              <Checkbox
                isSelected={enableNameSilo}
                onValueChange={setEnableNameSilo}
                size="md"
                color="success"
              >
                Enable NameSilo API
              </Checkbox>
            </div>
          </div>
        </div>
        <Chip color="primary" size="sm" radius="sm" variant="flat">
          {data?.length}
        </Chip>
      </div>
      <Button
        onClick={handleSubmit}
        color="primary"
        isLoading={loading}
        className="mt-4"
      >
        Save Domains
      </Button>
    </>
  );
}
