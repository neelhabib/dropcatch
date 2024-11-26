import { Button, Chip, Divider, Input, Spacer } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function NameCheapApi() {
  const [api, setApi] = useState("");
  const [userName, setUserName] = useState("");
  const [clientIp, setClientIp] = useState("");
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("lg_tk"));

  // this function will send the ads settings to the server
  const handleSave = (e) => {
    setLoading(true);
    axios
      .post("/api/apis/namecheap", {
        api,
        userName,
        clientIp,
        token,
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
      .get("/api/apis/namecheap", { params: { token: token?.token } })
      .then((res) => {
        const nameCheap = res.data?.apis?.find((x) => x?.nameCheap);

        if (nameCheap?.nameCheap) {
          setApi(nameCheap?.nameCheap?.api);
          setUserName(nameCheap?.nameCheap?.userName);
          setClientIp(nameCheap?.nameCheap?.clientIp);
        }
      });
  }, []);

  return (
    <div className="mx-4">
      <Toaster />
      <h4 className="text-xl font-semibold text-violet-700 mb-2">
        NameCheap API Settings
      </h4>

      <Divider />
      <Spacer y={2} />
      <Chip variant="flat" radius="sm" color={"secondary"}>
        If you disable, premium domains will not shown. Please refer to the
        documentation on how to get Sedo API for free.
      </Chip>
      <div>
        <Spacer y={2} />
        <Input
          value={api}
          onChange={(e) => setApi(e.target.value)}
          type="text"
          label="API Key"
          placeholder="q1333c40a7d8c36941sd4262fb63rt"
        />
        <Spacer y={2} />
        <Input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          label="NameCheap Account User Name"
          placeholder="johndoe"
        />
        <Spacer y={2} />
        <Input
          value={clientIp}
          onChange={(e) => setClientIp(e.target.value)}
          type="text"
          label="Client IP Address"
          placeholder="123.12.22.312"
        />

        <Spacer y={4} />
        <Button
          // isDisabled
          size="md"
          color="secondary"
          variant="shadow"
          isLoading={loading}
          onPress={handleSave}
        >
          Save
        </Button>
      </div>
      {/* </CardBody> */}
    </div>
  );
}
