import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Input,
  Spacer,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function GodaddyApi() {
  const [api, setApi] = useState("");
  const [secret, setSecret] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [phone, setPhone] = useState("");

  const [ns1, setNs1] = useState("");
  const [ns2, setNs2] = useState("");

  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("lg_tk"));

  // this function will send the ads settings to the server
  const handleSave = (e) => {
    setLoading(true);
    axios
      .post("/api/apis/godaddy", {
        api,
        secret,
        firstName,
        lastName,
        middleName,
        address1,
        address2,
        city,
        country,
        postalCode,
        state,
        email,
        org,
        phone,
        ns1,
        ns2,
        token,
      })
      .then((res) => {
        setLoading(false);
        toast.success(res.data?.message, { position: "bottom-right" });
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Some Error Occurred", { position: "bottom-right" });
      });
  };

  // this is to get the ads settings from the server
  useEffect(() => {
    axios
      .get("/api/apis/godaddy", { params: { token: token?.token } })
      .then((res) => {
        const godaddy = res.data?.apis?.find((x) => x?.godaddy);
        if (godaddy?.godaddy) {
          setApi(godaddy?.godaddy?.api);
          setSecret(godaddy?.godaddy?.secret);
          setFirstName(godaddy?.godaddy?.firstName);
          setLastName(godaddy?.godaddy?.lastName);
          setMiddleName(godaddy?.godaddy?.middleName);
          setAddress1(godaddy?.godaddy?.address1);
          setAddress2(godaddy?.godaddy?.address2);
          setCity(godaddy?.godaddy?.city);
          setCountry(godaddy?.godaddy?.country);
          setPostalCode(godaddy?.godaddy?.postalCode);
          setState(godaddy?.godaddy?.state);
          setEmail(godaddy?.godaddy?.email);
          setOrg(godaddy?.godaddy?.org);
          setPhone(godaddy?.godaddy?.phone);
          setNs1(godaddy?.godaddy?.ns1);
          setNs2(godaddy?.godaddy?.ns2);
        }
      });
  }, []);

  return (
    <div className="mx-4">
      <Toaster />

      <h4 className="text-xl font-semibold text-violet-700 mb-2">
        Godaddy API Settings
      </h4>

      <Divider />

      <Spacer y={2} />
      <div>
        <Chip variant="flat" radius="sm" color={"secondary"}>
          Please enter API and other details.
        </Chip>
        <Spacer y={2} />
        <Input
          value={api}
          onChange={(e) => setApi(e.target.value)}
          type="text"
          label="API Key"
          placeholder="A535djNWJjt_DrfBSPADvpceZtw7mu1hkn"
        />
        <Spacer y={2} />
        <Input
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          type="text"
          label="API Secret"
          placeholder="753LQ7yZ2Hxba4mrZcR9Br"
        />
        <Spacer y={4} />
        <Chip variant="flat" radius="sm" color={"secondary"}>
          Please enter Contact Information. This is mandetory.
        </Chip>
        <div className="grid grid-cols-3 gap-3">
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            label="First Name"
          />
          <Input
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            type="text"
            label="Middle Name"
          />
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            label="Last Name"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            label="Email"
          />
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            label="Phone Number | must formatted like +44.123 456 789"
          />
          <Input
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            type="text"
            label="Address 1"
          />
          <Input
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            type="text"
            label="Address 2"
          />
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            label="City"
          />
          <Input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            label="Country Code | US | UK | IN"
          />
          <Input
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            type="text"
            label="Postal Code"
          />
          <Input
            value={state}
            onChange={(e) => setState(e.target.value)}
            type="text"
            label="State"
          />
          <Input
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            type="text"
            label="Organization"
          />
          <Input
            value={ns1}
            onChange={(e) => setNs1(e.target.value)}
            type="text"
            label="Name Server 1"
          />
          <Input
            value={ns2}
            onChange={(e) => setNs2(e.target.value)}
            type="text"
            label="Name Server 2"
          />
        </div>
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
    </div>
  );
}
