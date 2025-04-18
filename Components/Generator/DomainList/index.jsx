import { Card, CardHeader, Chip, Link, useDisclosure } from "@heroui/react";
import DropDownLeft from "./DropDownLeft";
import DropDownRight from "./DropDownRight";
import { useState } from "react";
import Skeleton from "./Skeleton";
import { useDispatch, useSelector } from "react-redux";
import DomainModal from "./DomainModal";
// import { relatedQuestion } from "./DomainModal/RelatedQuestions/function";
// import { setRelatedQuestions } from "../../../../Redux/reducer";
const data = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 12, 14, 15];

export default function DomainList({ ext, header, tlds }) {
  const affiliateLinks = useSelector((state) => state?.affiliateLinks);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalData, setModalData] = useState("");
  const dispatch = useDispatch();

  const openModal = (data) => {
    onOpen();
    setModalData(data);
    // relatedQuestion(data?.domain?.split(".")[0], dispatch, setRelatedQuestions);
  };
  return (
    <>
      <DomainModal
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        data={modalData}
      />
      <Card className="p-0">
        <CardHeader className="flex justify-between">
          <p className="font-semibold text-gray-600 dark:text-gray-300">
            {header}
          </p>
        </CardHeader>
        {ext
          ? ext?.map((x, i) => (
              <div
                className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 rounded-xl p-3.5 box-shadow"
                key={i}
              >
                <div className="flex justify-between items-center">
                  <DropDownLeft domain={x} />
                  <Link
                    style={{ fontFamily: "jost" }}
                    href={`https://shareasale.com/r.cfm?b=1781996&u=1097615&m=46483&afftrack=&urllink=https://www.namecheap.com/domains/registration/results/?domain=${x?.domain}`}
                    isBlock
                    isExternal
                    className="mx-2 py-0 text-medium"
                    color="foreground"
                  >
                    {x?.domain}
                  </Link>
                </div>
                <div className="flex justify-between items-center">
                  <Chip
                    // as={Link}
                    // href={link(x)}
                    // target={"_blank"}
                    onClick={() => openModal(x)}
                    variant={
                      x?.availability === "available" ? "shadow" : "flat"
                    }
                    color={
                      x?.availability === "available" ? "success" : "danger"
                    }
                    radius="sm"
                    style={{ fontFamily: "jost" }}
                    className={`px-4 !py-3 text-white text-xs font-jost cursor-pointer mx-3 ${
                      x?.availability === "available"
                        ? "hover:bg-green-600"
                        : "hover:bg-pink-500"
                    }`}
                  >
                    {x?.availability === "available"
                      ? "Available"
                      : "Registered"}
                  </Chip>
                  <DropDownRight domain={x?.domain} />
                </div>
              </div>
            ))
          : data.map((x, i) => <Skeleton key={i} />)}
      </Card>
    </>
  );
}
