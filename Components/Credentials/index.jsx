import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Spacer,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function AdminCredentials() {
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("lg_tk"));

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/admin-credential", {
        adminId,
        adminPassword,
        token,
      })
      .then((res) => {
        setLoading(false);
        toast(res.data?.message, { position: "bottom-right" });
      })
      .catch((err) => {
        toast.error("Some Error Occurred", { position: "bottom-right" });
      });
  };

  useEffect(() => {
    axios.get("/api/admin-credential", { params: { token } }).then((res) => {
      if (res.data) {
        setAdminId(res.data?.adminId);
      }
    });
  }, []);

  return (
    <Card className="m-4 !border-0" shadow="lg">
      <Toaster />
      <CardHeader>
        <h4 className="text-xl font-semibold text-violet-700">
          Admin Credentials
        </h4>
      </CardHeader>
      <Divider />
      <CardBody>
        <form onSubmit={handleSave}>
          <Input
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            type="text"
            label="Admin ID"
            isRequired
          />
          <Spacer y="1" />
          <Input
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            type="password"
            label="Admin Password"
            isRequired
          />

          <Spacer y="4" />
          <Button
            // isDisabled
            size="md"
            color="secondary"
            variant="shadow"
            isLoading={loading}
            type="submit"
          >
            Save
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
