import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const CountdownTimer = ({ auctionEndTime }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isEndingSoon, setIsEndingSoon] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = dayjs();
      const endTime = dayjs(auctionEndTime);
      const diff = endTime.diff(now);

      if (diff <= 0) {
        setTimeLeft("Auction Ended");
        setIsEndingSoon(false);
        return;
      }

      const formattedTime = dayjs.duration(diff).format("HH:mm:ss");
      setTimeLeft(formattedTime);

      // Check if less than 30 seconds left
      setIsEndingSoon(diff <= 30000);
    };

    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [auctionEndTime]);

  return (
    <span className={isEndingSoon ? "text-red-500 font-semibold text-lg" : ""}>
      {timeLeft}
    </span>
  );
};

export default CountdownTimer;
