const WhoisLight = require("whois-light");
const { connectToMongoDB } = require("../../db");
const dayjs = require("dayjs");

async function whois(domain) {
  try {
    const { db } = await connectToMongoDB();
    const res = await WhoisLight.lookup({ format: true }, domain);

    // Consolidate possible indicators of registration
    const isRegistered = [
      res?.["Creation Date"],
      res?.registered,
      res?.created,
      res?.registrant,
      res?.["Registered on"],
      res?.["Created on"],
      res?.Registrant,
      res?.Domain,
      res?.["created............"],
    ].some(Boolean);

    const hasActiveStatus = ["connect", "ok", "active"].includes(
      res?.Status?.toLowerCase()
    );

    const isAvailable =
      res?.["registration status"]?.toLowerCase() === "available" ||
      (!isRegistered && !hasActiveStatus);

    const availability =
      isRegistered || hasActiveStatus
        ? "registered"
        : isAvailable
        ? "available"
        : "unknown";

    // Save whois to database
    await await db.collection("domains-whois").insertOne({
      domain,
      availability,
      time: dayjs().format("HH:mm:ss"),
      date: dayjs().format("D MMM YYYY"),
    });
    return availability;
  } catch (err) {
    console.error("WHOIS lookup failed:", err);
    return "unknown"; // Return a default status in case of an error
  } finally {
  }
}

module.exports = whois;
