import { Spacer } from "@nextui-org/react";
import SearchBar from "./SearchBar";
import DomainTable from "./DomainTable";

export default function DomainSearch() {
  return (
    <div className="m-4">
      <SearchBar />
      <Spacer y={"6"} />
      <DomainTable />
    </div>
  );
}
