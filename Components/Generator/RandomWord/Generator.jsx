import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowRegistered,
  setDomains,
  setShowCard,
} from "../../../Redux/reducer";
import { generate } from "random-words";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Checkbox,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Spacer,
  Spinner,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
const extensions = ["com", "net", "org", "co", "in", "ai", "info", "xyz", "cc"];

export default function RandomDomainGenerator() {
  const domains = useSelector((state) => state.domains);
  const showRegistered = useSelector((state) => state.showRegistered);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [ext, setExt] = useState("com");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);

  // this function generate random words
  const handleChange = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(setShowCard(true));
    dispatch(setDomains(null));
    setTotalCount(0);
    setAvailableCount(0);

    let words = generate({
      exactly: 300,
      maxLength: 15,
      formatter: (word, index) => {
        return index === 0
          ? word.slice(0, 1).toUpperCase().concat(word.slice(1))
          : word;
      },
    }).map((x) =>
      prefix
        .slice(0, 1)
        .toUpperCase()
        .concat(prefix.slice(1))
        .concat(x)
        .concat(suffix.slice(0, 1).toUpperCase().concat(suffix.slice(1)))
    );

    axios
      .post("/api/generator/random-word", { words, ext })
      .then((res) => {
        dispatch(setDomains(res.data));
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        dispatch(setDomains(null));
      });
  };

  useEffect(() => {
    if (domains?.length) {
      setTotalCount(domains?.length);
      setAvailableCount(
        domains?.filter((x) => x.availability === "available")?.length
      );
    }
  }, [domains]);

  const changeShowRegistered = () => {
    dispatch(setShowRegistered());
  };
  return (
    <Card className="m-2 py-4 dark:border dark:border-gray-700">
      <CardBody>
        <form onSubmit={handleChange}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col justify-center items-center">
              <Input
                label="Prefix"
                onChange={(e) => setPrefix(e.target.value)}
                isClearable
                size="sm"
                aria-label="prefix"
              />
              <Spacer y={2} />
              <Input
                label="Suffix"
                onChange={(e) => setSuffix(e.target.value)}
                color="default"
                isClearable
                size="sm"
                aria-label="suffix"
              />
            </div>

            <div className="flex flex-col justify-center items-center">
              <Dropdown isBordered>
                <DropdownTrigger>
                  <Button variant="faded" className="border-1" size="sm">
                    {ext}
                    <FontAwesomeIcon
                      className="bg-gray-100 text-xs rounded-full text-slate-600 hover:text-slate-400"
                      icon={faCircleChevronDown}
                    />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-setsize="10px"
                  aria-label="Single selection actions"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={ext}
                  onAction={(e) => setExt(e)}
                >
                  {extensions.map((x, i) => (
                    <DropdownItem key={x}>{x}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              <Spacer y={2} />

              <Checkbox
                // size="sm"
                defaultSelected
                // isRounded
                color="primary"
                // labelColor="#004799"
                onChange={changeShowRegistered}
                checked={showRegistered}
              >
                Show Registered
              </Checkbox>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div>
                Total Domain Generated -{" "}
                <Chip variant="flat" color="warning" radius="sm" size="sm">
                  {totalCount}
                </Chip>
              </div>
              <Spacer y={2} />
              <div>
                Available for Register -{" "}
                <Chip variant="flat" color="success" radius="sm" size="sm">
                  {availableCount}{" "}
                </Chip>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Button
                type="submit"
                size="lg"
                className="w-full text-white bg-gradient-to-r from-cyan-600 via-pink-600 to-blue-600 shadow-xl"
                // color="warning"
                isLoading={loading}
              >
                {!loading && "Generate"}
                {/* {!domains ? (
                    "Generate"
                  ) : (
                    <Spinner color="currentColor" size="sm" type="default" />
                  )} */}
              </Button>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
