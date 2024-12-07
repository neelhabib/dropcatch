import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
  TableBody,
} from "@nextui-org/react";

export default function Modals({ data, isOpen, onOpenChange }) {
  const headers = [
    "API",
    "Domain",
    "Date",
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
          <span className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {item}
          </span>
        </div>
      </td>
    );
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
      hideCloseButton
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="py-2">
              <h3>TLDs</h3>
            </ModalHeader>

            <ModalBody className="overflow-x-auto overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-600">
                  <tr>
                    <Header />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.map((x, i) => (
                    <>
                      <tr key={i}>
                        <Rows item={x?.api} />
                        <Rows item={x?.domain} />
                        <Rows item={x?.date} />
                        <Rows item={x?.status} />
                        <Rows item={x?.errorStatus} />
                        <Rows item={x?.responseCode} />
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
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
  );
}
