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
  Textarea,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
import winkNLP from "wink-nlp";
import model from "wink-eng-lite-web-model";
const nlp = winkNLP(model);
const its = nlp.its;
const extensions = ["com", "net", "org", "co", "in", "ai", "info", "xyz", "cc"];

export default function BulkDomainGenerator() {
  const domains = useSelector((state) => state.domains);
  const showRegistered = useSelector((state) => state.showRegistered);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [ext, setExt] = useState("com");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);
  let [words, setWords] = useState("your-custom-word");
  const [text, setText] = useState("");
  const doc = nlp.readDoc(text);
  // this function generate random words
  const handleChange = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(setDomains(null));
    dispatch(setShowCard(true));
    setTotalCount(0);
    setAvailableCount(0);

    words = [
      ...new Set(
        doc
          .tokens()
          .filter((t) => t.out(its.type) === "word")
          .out()
          .map((x) =>
            prefix
              .slice(0, 1)
              .toUpperCase()
              .concat(prefix.slice(1))
              .concat(x.slice(0, 1).toUpperCase().concat(x.slice(1)))
              .concat(suffix.slice(0, 1).toUpperCase().concat(suffix.slice(1)))
          )
      ),
    ];
    console.log(words);
    axios.post("/api/generator/random-word", { words, ext }).then((res) => {
      dispatch(setDomains(res.data));

      setLoading(false);
    });
  };

  useEffect(() => {
    if (domains) {
      setTotalCount(domains.length);
      setAvailableCount(
        domains.filter((x) => x.availability === "available").length
      );
    }
  }, [domains]);

  const changeShowRegistered = () => {
    dispatch(setShowRegistered());
  };
  return (
    <Card className="py-4 dark:border dark:border-gray-700 m-2">
      <CardBody>
        <form onSubmit={handleChange}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
            <div className="col-span-3">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                label="Enter list of words or paragraph article. Max 300 words."
                maxRows={4}
              />
            </div>
            <div className="flex flex-col justify-center items-center col-span-12 sm:col-span-2">
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

            <div className="flex flex-col justify-center items-center col-span-12 sm:col-span-2">
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
                defaultSelected={true}
                // isRounded
                color="primary"
                // labelColor="#004799"
                onChange={changeShowRegistered}
                checked={showRegistered}
              >
                Show Registered
              </Checkbox>
            </div>

            <div className="flex flex-col justify-between items-center sm:flex-row col-span-12 lg:col-span-5">
              <div className="flex flex-col justify-center items-center mr-2">
                <div>
                  Total Domain Generated -{" "}
                  <Chip variant="flat" color="warning" radius="sm">
                    {totalCount}
                  </Chip>
                </div>
                <Spacer y={2} />
                <div>
                  Available for Register -{" "}
                  <Chip variant="flat" color="success" radius="sm">
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
