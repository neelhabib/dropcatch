import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowRegistered,
  setDomains,
  setShowCard,
} from "../../../Redux/reducer";
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
  Radio,
  RadioGroup,
  Spacer,
  Spinner,
} from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";

// import Ads from "../AdsPlacement";
const alpha = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const extensions = ["com", "net", "org", "co", "in", "ai", "info", "xyz", "cc"];
const alphaNumaric = [...alpha, ...numbers];

export default function RandomLetter() {
  const domains = useSelector((state) => state.domains);
  const showRegistered = useSelector((state) => state.showRegistered);
  const dispatch = useDispatch();
  const [words, setWords] = useState([]);
  const [length, setLength] = useState(4);
  const [types, setTypes] = useState("words");
  const [ext, setExt] = useState("com");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // this function will generate random letters, numbers and alphaNumaric
  function generateRandom(arr, length) {
    return Array.from(
      { length },
      () => arr[Math.floor(Math.random() * arr.length)]
    ).join("");
  }

  // create random letters and send to server
  const RandomDomainGenerator = (e) => {
    e.preventDefault();
    setLoading(true);
    setWords([]);
    dispatch(setShowCard(true));
    dispatch(setDomains(null));

    let i = 0;
    while (i < 300) {
      if (types === "words") {
        words.push(prefix.concat(generateRandom(alpha, length)).concat(suffix));
        i++;
      } else if (types === "numbers") {
        words.push(
          prefix.concat(generateRandom(numbers, length)).concat(suffix)
        );
        i++;
      } else if (types === "alphaNumaric") {
        words.push(
          prefix.concat(generateRandom(alphaNumaric, length)).concat(suffix)
        );
        i++;
      }
    }
    axios.post("/api/generator/random-word", { words, ext }).then((res) => {
      dispatch(setDomains(res.data));
      setLoading(false);
    });
  };

  // generated domains count and available domains count
  useEffect(() => {
    if (domains) {
      setTotalCount(domains.length);
      setAvailableCount(
        domains.filter((x) => x.availability === "available").length
      );
    }
  }, [domains]);

  // show registered domains
  const changeShowRegistered = () => {
    dispatch(setShowRegistered());
  };
  return (
    <Card className="dark:border border-gray-700 m-2 py-4">
      <CardBody>
        <form onSubmit={RandomDomainGenerator} className="">
          <div
            gap={1}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4"
          >
            <div className="flex flex-col justify-center items-center lg:col-span-3">
              <Input
                label="Prefix"
                // placeholder="crypto"
                onChange={(e) => setPrefix(e.target.value)}
                color="default"
                clearable
                size="sm"
                labelLeft="prefix"
                borderWeight="light"
                aria-label="prefix"
              />
              <Spacer y={2} />
              <Input
                label="Suffix"
                size="sm"
                onChange={(e) => setSuffix(e.target.value)}
                color="default"
                labelLeft="suffix"
                clearable
                borderWeight="light"
                aria-label="suffix"
              />
            </div>
            <div className="flex justify-center items-center sm:justify-start lg:col-span-2">
              <RadioGroup
                // defaultValue="words"
                value={types}
                onValueChange={setTypes}
                aria-label="checkbox"
              >
                <Radio
                  aria-label="checkbox"
                  // size="sm"
                  value="words"
                  isSquared
                >
                  Letter
                </Radio>
                <Radio
                  aria-label="checkbox"
                  // size="sm"
                  value="numbers"
                  isSquared
                >
                  Number
                </Radio>
                <Radio
                  aria-label="checkbox"
                  // size="sm"
                  value="alphaNumaric"
                  isSquared
                >
                  Alpha-Numaric
                </Radio>
              </RadioGroup>
            </div>
            <div className="flex flex-col justify-center items-center md:col-span-2">
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
              <Input
                className="w-40"
                aria-label="length"
                type="number"
                label="Length"
                size="sm"
                min={1}
                onChange={(e) => setLength(e.target.value)}
                value={length}
              />
              <Spacer y={2} />
              <Checkbox
                color="primary"
                aria-label="include registered"
                size="sm"
                defaultSelected
                onChange={changeShowRegistered}
                checked={showRegistered}
              >
                Show Registered{" "}
              </Checkbox>
            </div>
            <div className="flex flex-col justify-between items-center sm:flex-row lg:col-span-5">
              <div className="flex flex-col justify-center items-center mr-2">
                <div>
                  <span className="text-sm">Total Domain Generated - </span>
                  <Chip
                    variant="flat"
                    color="warning"
                    radius="sm"
                    size="sm"
                    className="t"
                  >
                    {totalCount}
                  </Chip>
                </div>
                <Spacer y={2} />
                <div>
                  <span className="text-sm"> Available for Register - </span>
                  <Chip
                    variant="flat"
                    color="success"
                    radius="sm"
                    size="sm"
                    className="tex"
                  >
                    {availableCount}{" "}
                  </Chip>
                </div>
              </div>
              <div css={{ d: "flex", ai: "center" }}>
                <Button
                  isLoading={loading}
                  type="submit"
                  size="lg"
                  variant="shadow"
                  className="text-white w-full py-6 px-20 bg-gradient-to-r from-cyan-600 via-pink-600 to-blue-600 shadow-xl"
                >
                  {!loading && "Generate"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
