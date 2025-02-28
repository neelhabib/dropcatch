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

  const handleMaxBidChange = (index, event) => {
    const newCards = [...cards];
    newCards[index].maxBidAmount = event.target.value;
    setCards(newCards);
  };

  const handleIncrementChange = (index, event) => {
    const newCards = [...cards];
    newCards[index].incrementalAmount = event.target.value;
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
                classNames={{ inputWrapper: "bg-violet-50" }}
                endContent={
                  <span className="text-default-400 text-small">
                    bid_amount
                  </span>
                }
                color="secondary"
                type="number"
                value={card?.bidAmount}
                onChange={(e) => handleBidChange(index, e)}
              />
              <Input
                endContent={
                  <span className="text-default-400 text-small">increment</span>
                }
                value={card?.incrementalAmount}
                onChange={(e) => handleIncrementChange(index, e)}
                classNames={{ inputWrapper: "bg-green-50" }}
                type="number"
                color="success"
              />
              <Input
                endContent={
                  <span className="text-default-400 text-small">max_bid</span>
                }
                color="danger"
                classNames={{ inputWrapper: "bg-red-50" }}
                value={card?.maxBidAmount}
                onChange={(e) => handleMaxBidChange(index, e)}
                type="number"
              />

              <CountdownTimer auctionEndTime={card?.end_time} />
            </div>
          </CardBody>
        </Card>
      ))}
    </>
  );
}
