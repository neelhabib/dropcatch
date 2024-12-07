import { Button, Chip, Divider, Input, Spacer } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function DynadotApi() {
  const [api, setApi] = useState("");

  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("lg_tk"));

  // this function will send the ads settings to the server
  const handleSave = (e) => {
    setLoading(true);
    axios
      .post("/api/apis/dynadot", {
        api,
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

  // this is to get the ads settings from the server
  useEffect(() => {
    axios
      .get("/api/apis/dynadot", { params: { token: token?.token } })
      .then((res) => {
        if (res?.data?.dynadot) {
          setApi(res?.data?.dynadot?.api);
        }
      });
  }, []);

  return (
    <div className="mx-4">
      <Toaster />
      <h4 className="text-xl font-semibold text-violet-700 mb-2">
        Dynadot API Settings
      </h4>

      <Divider />
      <Spacer y={2} />
      <Chip variant="flat" radius="sm" color={"secondary"}>
        Please enter API and other details.
      </Chip>
      <div>
        <Spacer y={2} />
        <Input
          value={api}
          onChange={(e) => setApi(e.target.value)}
          type="text"
          label="API Production Key"
          placeholder="q1333c40a7d8c36941sd4262fb63rt"
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
