/* eslint-disable react/prop-types */
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import IndeterminateCheckbox from "components/common/advance-table/IndeterminateCheckbox";

const selectionColumn = (selectionColumnWidth, selectionHeaderClassname) => {
  return {
    id: "selection",
    accessorKey: "",
    header: ({ table }) => (
      <IndeterminateCheckbox
        className="form-check mb-0"
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <IndeterminateCheckbox
        className="form-check mb-0"
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
    meta: {
      headerProps: {
        className: selectionHeaderClassname,
        style: {
          width: selectionColumnWidth,
        },
      },
      cellProps: {
        style: {
          width: selectionColumnWidth,
        },
      },
    },
  };
};

const useAdvanceTable = ({
  columns,
  data,
  sortable,
  selection,
  selectionColumnWidth,
  selectionHeaderClassname,
  pagination,
  initialState,
  perPage = 10,
}) => {
  const state = {
    pagination: { pageSize: pagination ? perPage : data.length },
    ...initialState,
  };
  const table = useReactTable({
    data,
    columns: selection
      ? [
          selectionColumn(selectionColumnWidth, selectionHeaderClassname),
          ...columns,
        ]
      : columns,
    enableSorting: sortable,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: state,
  });

  return table;
};

export default useAdvanceTable;
