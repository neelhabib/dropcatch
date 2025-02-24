import { Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setGodaddyAuctions } from "../../../Redux/reducer";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://auctions.godaddy.com/beta/findApiProxy/v4/aftermarket/find/auction/recommend?paginationSize=100&paginationStart=0&query=${value}&useExtRanker=true&useSemanticSearch=true`
      )
      .then((res) => {
        console.log(res.data);
        dispatch(setGodaddyAuctions(res.data?.results));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        size="lg"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="max-w-xl mx-auto"
        placeholder="Search auction Domain and press enter"
      />
    </form>
  );
}
