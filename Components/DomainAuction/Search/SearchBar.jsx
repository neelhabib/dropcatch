import { Button, Input, Progress } from "@heroui/react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setGodaddyAuctions } from "../../../Redux/reducer";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("lg_tk"));
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(
        `https://auctions.godaddy.com/beta/findApiProxy/v4/aftermarket/find/auction/recommend?paginationSize=100&paginationStart=0&query=${value}&useExtRanker=true&useSemanticSearch=true`
      )
      .then((res) => {
        setLoading(false);
        dispatch(setGodaddyAuctions(res.data?.results));
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleDelete = (e) => {
    setLoading2(true);

    axios
      .delete("/api/bidding/selected-domains", { data: { token: token.token } })
      .then((res) => {
        toast.success(res.data?.message, {
          position: "bottom-right",
          duration: 5000,
        });
        setLoading2(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading2(false);
        toast.err(res.data?.message || "Some error occurred", {
          position: "bottom-right",
        });
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Toaster />
      <div className="">
        <div className="flex justify-between items-center gap-4">
          <Input
            size="lg"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="max-w-xl"
            placeholder="Search auction Domain and press enter"
          />
          <Button color="warning" onPress={handleDelete} isLoading={loading2}>
            Delete Added Domains
          </Button>
        </div>
        {loading ? (
          <Progress
            radius="full"
            isIndeterminate
            aria-label="Loading..."
            className="px-2 max-w-xl py-1"
            size="sm"
            color="secondary"
          />
        ) : (
          <>
            <p className="text-xs text-gray-400">
              Advance search not available
            </p>
          </>
        )}
      </div>
    </form>
  );
}
