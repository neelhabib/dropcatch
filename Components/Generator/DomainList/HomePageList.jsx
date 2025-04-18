import { Card, CardHeader, Chip, Link, useDisclosure } from "@heroui/react";
import DropDownLeft from "./DropDownLeft";
import DropDownRight from "./DropDownRight";
import { useState } from "react";
import Skeleton from "./Skeleton";
import { useDispatch, useSelector } from "react-redux";
import DomainModal from "./DomainModal";
import { relatedQuestion } from "./DomainModal/RelatedQuestions/function";
import { setRelatedQuestions } from "../../../../Redux/reducer";
const data = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 12, 14, 15];

export default function HomePageList({ ext, header, tlds }) {
  const affiliateLinks = useSelector((state) => state?.affiliateLinks);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalData, setModalData] = useState("");
  const dispatch = useDispatch();
  const link = (x) => {
    if (x?.availability === "available") {
      return affiliateLinks?.affiliateProvider === "godaddy"
        ? `${affiliateLinks?.godaddyLink}https://in.godaddy.com/domainsearch/find?domainToCheck=${x?.domain}`
        : affiliateLinks?.affiliateProvider === "namecheap"
        ? `${affiliateLinks?.nameCheapLink}https%3A%2F%2Fwww.namecheap.com%2Fdomains%2Fregistration%2Fresults%2F%3Fdomain%3D${x.domain}&afftrack=`
        : affiliateLinks?.affiliateProvider === "domain.com"
        ? `https://www.domain.com/registration/?flow=domainDFE&search=${x?.domain}${affiliateLinks?.domainLink}`
        : affiliateLinks?.affiliateProvider === "dynadot"
        ? `${affiliateLinks?.dynadotLink}https%3A%2F%2Fwww.dynadot.com%2Fdomain%2Fsearch.html%3Fdomain%3D${x?.domain}`
        : affiliateLinks?.otherLink;
    }
    return `${affiliateLinks?.godaddyLink}https://in.godaddy.com/domainsearch/find?domainToCheck=${x?.domain}`;
  };
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
                    href={link(x)}
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
                    className={`${
                      x?.availability === "available" ? `px-3` : `px-[7px]`
                    } !py-3 text-white text-xs font-jost cursor-pointer mx-3`}
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
