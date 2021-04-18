import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSortBy, usePagination, useTable } from "react-table";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { setTablePageSize } from "../../redux/Actions/table.js";

import "./Table.scss";

import Button from "../Button/Button";

const Table = ({
  columns,
  data,
  pagination = true,
  paginationTop = true,
  paginationBottom = true,
  striped = true,
}) => {
  const customPageSize = useSelector((state) => state.table.pageSize);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: customPageSize } },
    useSortBy,
    usePagination
  );

  const onChangePageSize = useCallback(
    (value) => {
      dispatch(setTablePageSize({ pageSize: value }));
      setPageSize(value);
    },
    [dispatch, setPageSize]
  );

  const RenderPagination = () => {
    return (
      <div className="pagination">
        <div className="pagination-options">
          <Button
            variant="transparent"
            className="pagination-button"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="pagination-text">
            {t("global.paginationPage", {
              page: pageIndex + 1,
              pageLength: pageOptions.length,
            })}
          </span>
          <Button
            variant="transparent"
            className="pagination-button"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <ChevronRightIcon />
          </Button>
        </div>
        <select
          value={pageSize}
          onChange={(e) => {
            onChangePageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {t("global.paginationShow", { size: pageSize })}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <>
      {pagination && paginationTop && <RenderPagination />}
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="th"
                >
                  <span className="header-text">
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )
                    ) : (
                      <span className="sort-placeholder"></span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className={striped ? "table-striped" : ""}
        >
          {page.map((row, i) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="td">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {pagination && !canNextPage && page.length < pageSize
            ? [...Array(pageSize - page.length).keys()].map((index) => (
                <tr key={`header-${index}`}>
                  {headerGroups.map((headerGroup, keyIndex) => (
                    <React.Fragment key={keyIndex}>
                      {headerGroup.headers.map((key) => (
                        <td key={`${index}-${key.id}`} className="td">
                          <span>&nbsp;</span>
                        </td>
                      ))}
                    </React.Fragment>
                  ))}
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {pagination && paginationBottom && <RenderPagination />}
    </>
  );
};

export default Table;
