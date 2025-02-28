import { Card, CardBody } from "@nextui-org/react";

export default function EmptyCard() {
  return (
    <div className="flex justify-center">
      <Card className="bg-primary-50">
        <CardBody>
          <p className="text-lg">
            Please add some domains from the search bar first.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
