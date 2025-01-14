import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowRegistered,
  setDomains,
  setShowCard,
  setSuggestedDomains,
  setSuffix,
  setPrefix,
} from "../../../Redux/reducer";
import { Card } from "@nextui-org/react";
const extensions = ["com", "net", "org", "co", "in", "ai", "info", "xyz", "cc"];

export default function RandomDomainGenerator({ data }) {
  const domains = useSelector((state) => state.domains);
  const showRegistered = useSelector((state) => state.showRegistered);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [ext, setExt] = useState("com");
  const [words, setWords] = useState("");
  // const [prefix, setPrefix] = useState("");
  // const [suffix, setSuffix] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);
  const results = (rs) =>
    rs.map((x) => ({
      domain: x?.name,
      availability: x?.availability,
    }));
  // this function generate random words
  const handleChange = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(setShowCard(true));
    dispatch(setSuggestedDomains(null));
    dispatch(setPrefix(null));
    dispatch(setSuffix(null));
    setTotalCount(0);
    setAvailableCount(0);

    const params = {
      name: words,
      "max-results": 100,
      // tlds: req.body.tld,
      "sensitive-content-filter": true,
      "include-registered": true,
    };

    setTimeout(() => {
      axios
        .get("https://sugapi.verisign-grs.com/ns-api/2.0/suggest?", {
          params,
        })
        .then((res) =>
          dispatch(setSuggestedDomains(results(res.data?.results)))
        );
    }, 400);
    // prefix
    setTimeout(() => {
      axios
        .get("https://sugapi.verisign-grs.com/ns-api/2.0/add-prefix?", {
          params,
        })
        .then((res) => dispatch(setPrefix(results(res.data?.results))));
    }, 800);
    // Suffix
    setTimeout(() => {
      axios
        .get("https://sugapi.verisign-grs.com/ns-api/2.0/add-suffix?", {
          params,
        })
        .then((res) => {
          dispatch(setSuffix(results(res.data?.results)));
          setLoading(false);
        });
    }, 1000);
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
    <Card className="dark:bg-gradient-to-r dark:from-slate-900dark: to-slate-700 dark:bg-gray-900 relative m-2">
      <div
        className="absolute inset-0 m-auto max-w-xs blur-[50px] sm:max-w-md md:max-w-lg"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
        }}
      ></div>
      <section className="relative">
        <div className="relative max-w-screen-xl mx-auto px-4 lg:py-16 md:px-8">
          <div className="space-y-5 max-w-4xl mx-auto text-center relative">
            <form
              onSubmit={handleChange}
              className="justify-between items-center gap-x-3 sm:flex relative"
            >
              <input
                required
                type="text"
                value={words}
                onChange={(e) => setWords(e.target.value)}
                placeholder={"Type a word and press Enter"}
                className="w-full block border border-gray-300 dark:border-gray-800 px-3 py-5 text-gray-600 dark:text-gray-400 text-lg bg-transparent focus:bg-gray-50 focus:shadow-md dark:bg-gray-900 dark:focus:bg-gray-900 dark:focus:border-gray-700 duration-150 outline-none rounded-3xl shadow relative"
              />
            </form>
          </div>
        </div>
      </section>
    </Card>
  );
}
