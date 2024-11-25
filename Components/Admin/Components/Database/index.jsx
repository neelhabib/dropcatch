import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Spacer,
  RadioGroup,
  Radio,
  cn,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const CustomRadio = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] min-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparen",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};
export default function Database() {
  const [siteUrl, setSiteUrl] = useState("");
  const [dbName, setDbName] = useState("domain-hub");
  const [database, setDatabase] = useState("selfHosted");
  const [selfHostedURI, setSelfHostedURI] = useState(
    "mongodb://127.0.0.1:27017"
  );
  const [atlasURI, setAtlasURI] = useState("");

  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("lg_tk"));
  const handleSave = (e) => {
    setLoading(true);
    axios
      .post("/api/db", {
        siteUrl,
        dbName,
        database,
        selfHostedURI,
        atlasURI,
        token,
      })
      .then((res) => {
        setLoading(false);
        toast(res.data?.message, { position: "bottom-right" });
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Some Error Occurred", { position: "bottom-right" });
      });
  };

  useEffect(() => {
    axios.get("/api/db").then((res) => {
      if (typeof res.data === "object") {
        setSelfHostedURI(res.data?.selfHostedURI);
        setAtlasURI(res.data?.atlasURI);
        setDatabase(res.data?.database);
        setSiteUrl(res.data?.siteUrl);
        setDbName(res.data?.dbName);
      }
    });
  }, []);

  return (
    <Card className="m-4 !border-0" shadow="lg">
      <Toaster />
      <CardHeader>
        <h4 className="text-xl font-semibold text-violet-700">Site Settings</h4>
      </CardHeader>
      <Divider />
      <CardBody>
        <div>
          <Input
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            type="text"
            label="Site URL"
            placeholder="https://example.com"
            description="Enter your site address including http / https"
          />
          <Spacer y="2" />
          <Input
            value={dbName}
            onChange={(e) => setDbName(e.target.value)}
            type="text"
            label="Database Name"
            placeholder="domainhub"
            description="Once you set a Database name, you can't change it later. If you change Database name, all the site data will be change."
          />
          <Spacer y="1" />
          <div className="">
            <RadioGroup
              value={database}
              onValueChange={setDatabase}
              label="Select Database"
              description="You can switch Database any time."
            >
              <div className="flex flex-col md:flex-row">
                <CustomRadio description="For VPS Server." value="selfHosted">
                  Self Hosted MongoDB
                </CustomRadio>
                <CustomRadio
                  className="mx-0 md:mx-4 my-4 md:my-0"
                  description="For shared hosting and cPanel."
                  value="atlas"
                >
                  MongoDB Atlas
                </CustomRadio>
              </div>
            </RadioGroup>
          </div>
          <Spacer y="4" />

          <Input
            value={selfHostedURI}
            onChange={(e) => setSelfHostedURI(e.target.value)}
            type="text"
            label="Self Hosted URI"
            placeholder="mongodb://127.0.0.1:27017"
          />
          <Spacer y="1" />
          <Input
            value={atlasURI}
            onChange={(e) => setAtlasURI(e.target.value)}
            type="text"
            label="MongoDB Atlas URI"
            placeholder="mongodb+srv://domainhub:m3LLL5vdzD27mybF@domainhub.yjcq80u.mongodb.net/?retryWrites=true&w=majority"
          />

          <Spacer y="4" />
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
      </CardBody>
    </Card>
  );
}
