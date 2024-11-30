import { Button, Chip, Divider, Input, Spacer } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function NameCheapApi() {
  const [api, setApi] = useState("");
  const [userName, setUserName] = useState("");
  const [clientIp, setClientIp] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [phone, setPhone] = useState("");

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
        firstName,
        lastName,
        address1,
        city,
        country,
        postalCode,
        state,
        email,
        org,
        phone,

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
          setFirstName(nameCheap?.nameCheap?.firstName);
          setLastName(nameCheap?.nameCheap?.lastName);
          setAddress1(nameCheap?.nameCheap?.address1);
          setCity(nameCheap?.nameCheap?.city);
          setCountry(nameCheap?.nameCheap?.country);
          setPostalCode(nameCheap?.nameCheap?.postalCode);
          setState(nameCheap?.nameCheap?.state);
          setEmail(nameCheap?.nameCheap?.email);
          setOrg(nameCheap?.nameCheap?.org);
          setPhone(nameCheap?.nameCheap?.phone);
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
        Please enter API and other details.
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
          label="Local / Server IP Address"
          placeholder="123.12.22.312"
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
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            label="City"
          />
          <Input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            label="Country"
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
      {/* </CardBody> */}
    </div>
  );
}
