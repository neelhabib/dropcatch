import Content from "./Content";
import DomainInput from "./DomainInput";

export default function BulkDomainLocation() {
  return (
    <div className="px-2 md:px-14 2xl:px-28 my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Content />
        <DomainInput />
      </div>
    </div>
  );
}
