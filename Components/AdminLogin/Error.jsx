import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export default function ErrorModal({ isOpen, onOpenChange }) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      // isDismissable={false}
      backdrop="blur"
      scrollBehavior="outside"
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-gray-500">
              Login Error!
            </ModalHeader>
            <ModalBody>
              <p className="bg-danger-400 py-3 text-white rounded-md text-xl font-semibold text-center">
                You have entered incorrect credentials
              </p>
              <p className="text-sm text-gray-500 text-center">
                Please enter correct admin id and password
              </p>
            </ModalBody>
            <ModalFooter>
              <Button size="sm" color="danger" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
