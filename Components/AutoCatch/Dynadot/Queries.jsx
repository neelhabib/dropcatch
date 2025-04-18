import { useState } from "react";
import { Card, CardBody, CardHeader, Chip, useDisclosure } from "@heroui/react";
import Modal from "./Modal";

export default function DynadotQueries({
  apiQueries,
  title = "API Queries",
  icon,
  success = 0,
}) {
  const [modalData, setModalData] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const openModal = (data) => {
    onOpen();
    setModalData(data);
  };
  const cornerImg_2 = `${window.location.origin}/images/corner-2.png`;
  return (
    <>
      <Modal onOpenChange={onOpenChange} isOpen={isOpen} data={modalData} />
      <Card
        className="relative"
        isPressable
        onPress={() => openModal(apiQueries)}
      >
        <CardHeader>
          <span className="mr-2">{icon}</span>
          <h4 className="text-medium">{title}</h4>
        </CardHeader>
        {/* <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-contain object-right absolute"
          src={cornerImg_2}
        /> */}
        <CardBody>
          <div className="flex justify-between items-center">
            <h4
              className="text-3xl text-gray-800 font-semibold"
              // style={{ fontFamily: "jost" }}
            >
              {apiQueries?.length || 0}
            </h4>
            <Chip color="success" variant="flat" radius="sm">
              {success}
            </Chip>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
