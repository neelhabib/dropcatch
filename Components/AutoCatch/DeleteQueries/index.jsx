import { addToast, Button } from "@heroui/react";
import axios from "axios";
import { useState } from "react";

export default function DeleteQueries() {
  const token = JSON.parse(localStorage.getItem("lg_tk"));
  const [loading, setLoading] = useState(false);
  const handleDelete = (x) => {
    setLoading(true);
    axios
      .post("/api/auto-catch/api-queries", { token: token?.token })
      .then((res) => {
        // console.log(res.data);
        setLoading(false);
        addToast({
          title: res.data,
          color: "secondary",
          variant: "solid",
          timeout: 2000,
        });
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <Button
        isLoading={loading}
        onPress={handleDelete}
        color="danger"
        size="lg"
        className="mt-4"
      >
        Delete Old Queries
      </Button>
      <p className="mt-2 text-sm">
        Be careful. All old queries will be deteted.
      </p>
    </div>
  );
}
