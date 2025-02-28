import { Card, CardBody, Input } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import CountdownTimer from "./CountdownTimer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import axios from "axios";

export default function DomainCard({ cards, setCards }) {
  const handleBidChange = (index, event) => {
    const newCards = [...cards];
    newCards[index].bidAmount = event.target.value;
    setCards(newCards);
  };

  const removeCard = (index) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
  };
  const token = JSON.parse(localStorage.getItem("lg_tk"));

  return (
    <>
      {cards?.map((card, index) => (
        <Card>
          <CardBody className="flex flex-col gap-3">
            <div className="flex justify-between">
              <p>{card?.fqdn}</p>
              <span
                className="cursor-pointer"
                onClick={() => removeCard(index)}
              >
                <FontAwesomeIcon
                  icon={faClose}
                  className="text-gray-300 hover:text-red-500 transition-colors duration-300"
                />
              </span>
              <p>{card?.auction_id}</p>
            </div>
            <div className="grid grid-cols-2 justify-between items-center gap-3">
              <Input
                label="Your Bid"
                size="sm"
                type="number"
                color="secondary"
                value={card?.bidAmount}
                onChange={(e) => handleBidChange(index, e)}
              />
              <div className="flex justify-end">
                <CountdownTimer auctionEndTime={card?.end_time} />
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </>
  );
}
