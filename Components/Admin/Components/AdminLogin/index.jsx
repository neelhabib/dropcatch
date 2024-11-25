import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../../../Redux/reducer";
import axios from "axios";
import ErrorModal from "./Error";
import { Button, useDisclosure } from "@nextui-org/react";
export default function AdminLogin() {
  const dispatch = useDispatch();
  const [adminId, setAdminID] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/admin-credential/login", { adminId, adminPassword })
      .then((res) => {
        if (!res.data?.status) {
          localStorage.removeItem("lg_tk");
          dispatch(setLoggedIn(res.data?.status));
          setError(true);
          onOpen();
        } else {
          localStorage.setItem("lg_tk", JSON.stringify(res.data));
          dispatch(setLoggedIn(res.data?.status));
          setError(false);
        }
      });
  };
  useEffect(() => {
    if (localStorage.getItem("lg_tk")) {
      axios
        .post(
          "/api/admin-credential/is-logged-in",
          JSON.parse(localStorage.getItem("lg_tk"))
        )
        .then((res) => {
          if (res.data?.status) {
            dispatch(setLoggedIn(res.data?.status));
          } else {
            dispatch(setLoggedIn(res.data?.status));
          }
        });
    }
  }, []);

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <ErrorModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <img
            src="/images/logo/logo/logo.png"
            width={300}
            className="mx-auto"
          />
          <div className="mt-5">
            <h3 className="text-gray-800 dark:text-gray-300 text-center text-2xl font-bold sm:text-3xl">
              Log in to your admin panel
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              value={adminId}
              onChange={(e) => setAdminID(e.target.value)}
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              type="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-x-3">
              <input
                type="checkbox"
                id="remember-me-checkbox"
                className="checkbox-item peer hidden"
              />
              <label
                htmlFor="remember-me-checkbox"
                className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
              ></label>
              <span>Remember me</span>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Sign in
          </Button>
        </form>
      </div>
    </main>
  );
}
