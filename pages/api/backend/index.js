import os from "os";
import isLoggedIn from "../isLoggedIn";
export default async function handler(req, res) {
  const { arch, cpus, freemem, hostname, totalmem, type, uptime } = os;
  const token = req.body.token?.token;

  // Getting os details of server
  if (isLoggedIn(token)) {
    res.json({
      arch: arch(),
      cpus: cpus(),
      totalMemory: totalmem(),
      freeMemory: freemem(),
      hostName: hostname(),
      type: type(),
      upTime: uptime(),
    });
  } else {
    res.json("Error, please try again");
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
