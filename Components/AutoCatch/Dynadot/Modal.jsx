import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Pagination,
  Divider,
} from "@heroui/react";
import { useState } from "react";

const headers = [
  "API",
  "Domain",
  "Date",
  "Time",
  "Status",
  "Error Status",
  "Response Code",
];
const Header = () => {
  return (
    <>
      {headers?.map((x, i) => (
        <th scope="col" className="py-3  text-center" key={i}>
          <div className="flex items-center justify-center gap-x-2">
            <span className="text-xs font-semibold  tracking-wide text-gray-800 dark:text-gray-400">
              {x}
            </span>
          </div>
        </th>
      ))}
    </>
  );
};
const Rows = ({ item }) => {
  return (
    <td className="size-px whitespace-nowrap border">
      <div className="mx-6 py-2">
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          {item}
        </p>
      </div>
    </td>
  );
};

export default function Modals({ data, isOpen, onOpenChange }) {
  const [page, setPage] = useState(1);
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="full"
      hideCloseButton
      scrollBehavior="inside"
      className="z-[250]"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="py-2">
              <h3 className="text-secondary-600">DropCatch Queries</h3>
            </ModalHeader>
            <Divider />
            <ModalBody className="overflow-x-auto overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-600">
                  <tr>
                    <Header />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.slice((page - 1) * 20, page * 20).map((x, i) => (
                    <tr key={i}>
                      <Rows item={x?.api} />
                      <Rows item={x?.domain} />
                      <Rows item={x?.date} />
                      <Rows item={x?.time} />
                      <Rows item={x?.status} />
                      <Rows item={x?.errorStatus} />
                      <Rows item={x?.responseCode} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <Pagination
                showControls
                showShadow
                color="secondary"
                page={page}
                total={Math.ceil(data?.length / 20)}
                onChange={setPage}
              />
              <Button color="danger" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
