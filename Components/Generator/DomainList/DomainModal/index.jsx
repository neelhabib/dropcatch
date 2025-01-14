import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tabs,
  Tab,
  Card,
  Link,
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { relatedQuestion } from "./RelatedQuestions/function";
import {
  setGodaddyAuctions,
  setRelatedQuestions,
  setSedoDomains,
} from "../../../../Redux/reducer";
import QTable from "./RelatedQuestions/QTable";
import axios from "axios";
import RelatedDomains from "./RelatedDomains";
import RegistrarList from "./RegistrarList";
import Auction from "./Auction";
import SedoDomains from "./SedoDomains";

export default function DomainModal({ data, isOpen, onOpenChange }) {
  const barChart = `${window?.location?.origin}/images/modal_header/crm-bar-chart.png`;
  const lineChart = `${window.location.origin}/images/modal_header/crm-line-chart.png`;
  const relatedQuestions = useSelector((state) => state?.relatedQuestions);
  const questions = relatedQuestions?.map((x) => x[1])?.flat();
  const [relatedDomains, setRelatedDomains] = useState([]);
  const affiliateLinks = useSelector((state) => state?.affiliateLinks);
  const dispatch = useDispatch();
  const params = {
    name: data?.domain,
    "max-results": 100,
    // tlds: req.body.tld,
    "sensitive-content-filter": true,
    "include-registered": true,
  };
  useEffect(() => {
    if (data) {
      relatedQuestion(
        data?.domain?.split(".")[0],
        dispatch,
        setRelatedQuestions
      );

      axios
        .get("https://sugapi.verisign-grs.com/ns-api/2.0/suggest?", { params })
        .then((response) => setRelatedDomains(response.data?.results));
    }

    axios
      .get(
        `https://auctions.godaddy.com/beta/findApiProxy/v4/aftermarket/find/auction/recommend?paginationSize=100&paginationStart=0&query=${
          data?.domain?.split(".")?.[0]
        }&useExtRanker=true&useSemanticSearch=true`
      )
      .then((res) => {
        dispatch(setGodaddyAuctions(res.data?.results));
        // console.log(res.data);
      });

    axios
      .post("/api/generator/sedo", { value: data?.domain?.split(".")?.[0] })
      .then((res) => {
        dispatch(setSedoDomains(res.data));
        // console.log(res.data);
      });
  }, [data]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        hideCloseButton
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="py-2">
                {/* <h3>Domain Info</h3> */}
              </ModalHeader>

              <ModalBody>
                <Card className="w-full border-none rounded-" shadow="none">
                  <div className="flex justify-between items-center bg-slate-200 dark:bg-slate-700 pr-3">
                    <div className="flex items-center py-0 ">
                      <img
                        src={barChart}
                        width={90}
                        alt="..."
                        //   className="border border-red-500"
                      />

                      <Link
                        isExternal
                        href={`https://shareasale.com/r.cfm?b=1781996&u=1097615&m=46483&afftrack=&urllink=https://www.namecheap.com/domains/registration/results/?domain=${data?.domain}`}
                        className="text-blue-600 font-bold text-xl"
                      >
                        {data?.domain?.split(".")?.[0]}
                        <span className="text-info font-semibold text-sky-500">
                          {"."}
                          {data?.domain?.split(".")?.[1]}
                        </span>
                      </Link>

                      <img src={lineChart} width={130} alt="..." className="" />
                    </div>
                    <Link
                      isExternal
                      href={`https://shareasale.com/r.cfm?b=1781996&u=1097615&m=46483&afftrack=&urllink=https://www.namecheap.com/domains/registration/results/?domain=${data?.domain}`}
                      className={`text-medium ${
                        data?.availability != "available"
                          ? "text-red-400"
                          : "text-green-700"
                      }`}
                      style={{ fontFamily: "jost" }}
                    >
                      {data?.availability != "available"
                        ? "Not Available"
                        : "Available"}
                    </Link>
                  </div>
                </Card>
                <div>
                  <RegistrarList domain={data} />
                </div>

                <Tabs className="flex justify-center">
                  <Tab key="domains" title="Related Domains">
                    <RelatedDomains domains={relatedDomains} />
                  </Tab>
                  <Tab key="Auctions" title="Auctions">
                    <Auction />
                  </Tab>
                  <Tab key="Premium Domains" title="Premium Domains">
                    <SedoDomains />
                  </Tab>

                  <Tab key="question" title="Related Questions">
                    <QTable />
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
