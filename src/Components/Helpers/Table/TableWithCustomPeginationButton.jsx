import React, { useState, useEffect } from "react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import PagesIndex from "../../Pages/PagesIndex";
const PaginatedTable = ({
  data,
  initialRowsPerPage = 5,
  SearchInTable,
  visibleFields,
  additional,
  UserFullButtonList,
  confirm_button,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  //
  const columns = useMemo(() => {
    if (data?.length > 0) {
      return Object.keys(data[0]).map((key) => ({
        header: key.charAt(0).toUpperCase() + key.slice(1),
        field: key,
        visible: visibleFields.includes(key),
      }));
    }
    return [];
  }, [data, visibleFields]);

  const ddd = () => {
    const filtered = data?.filter((row) =>
      columns.some((column) =>
        row[column.field]
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    ddd();
  }, [searchQuery, data, columns]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);

  // Get current page data
  const currentData = filteredData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  // Render pagination items
  const renderPagination = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  const toggleResponsiveTable = () => {
    const table = document.getElementById("myTable");
    if (window.innerWidth <= 425) {
      table?.classList.add("table-responsive");
    } else {
      table?.classList.remove("table-responsive");
    }
  };

  useEffect(() => {
    toggleResponsiveTable();
    window.addEventListener("resize", toggleResponsiveTable);
    return () => {
      window.removeEventListener("resize", toggleResponsiveTable);
    };
  }, []);
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        {confirm_button}

        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <table
        id="myTable"
        className="table table-striped table-bordered table-responsive"
      >
        <thead className="text-center table-header-backeground">
          {data && data?.length > 0 && (
            <tr>
              <th>ID</th>
              {columns.map(
                (column, id) =>
                  column.visible && (
                    <>
                      <th key={column.field}>{column.header}</th>
                    </>
                  )
              )}

              {UserFullButtonList &&
                UserFullButtonList?.map((items) => {
                  return (
                    <>
                      <th>{items.buttonName}</th>
                    </>
                  );
                })}
            </tr>
          )}
        </thead>
        <tbody className="text-center">
          {currentData?.length > 0 ? (
            <>
              {currentData?.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {columns.map((column) =>
                    column.visible ? (
                      <td key={column.field}>
                        {column.field === "activeStatus"
                          ? row.activeStatus
                            ? "Market Is Active"
                            : "Market Is Inactive"
                          : row[column.field]}
                      </td>
                    ) : null
                  )}

                  {/* Render buttons only in the last column */}
                  {UserFullButtonList?.length > 0 &&
                    UserFullButtonList?.map((items) => {
                      return (
                        <td>
                          <span key={items.buttonName}>
                            {items.type === "link" ? (
                              <Link
                                to={items.route}
                                className={`btn btn-${items.buttonColor} btn-sm me-2`}
                              >
                                {items.buttonName}
                              </Link>
                            ) : items.type === "button" ? (
                              <button
                                className={`btn ${
                                  items.buttonColor
                                    ? `btn-${items.buttonColor}`
                                    : "unblock-btn"
                                } btn-sm me-2`}
                                onClick={() => items.Conditions(row)}
                              >
                                {items.buttonName}
                              </button>
                            ) : items.type === "check" ? (
                              <PagesIndex.ChangeStatus
                                apiRoute={""}
                                req={""}
                                checkboxStatus={""}
                                rowData={""}
                              />
                            ) :
                            //  items.type === "confirm" ? (
                            //   <>
                            //     <button
                            //       className={`btn ${
                            //         items.buttonColor
                            //           ? `btn-${items.buttonColor}`
                            //           : "unblock-btn"
                            //       } btn-sm me-2`}
                            //       onClick={() => <items.ShowNewComponent />}
                            //     >
                            //       {items.buttonName}
                            //     </button>
                            //   </>
                            // ) :
                             null}
                          </span>
                        </td>
                      );
                    })}
                </tr>
              ))}
            </>
          ) : (
            <h4 className="text-center">No Data Available</h4>
          )}

          {additional && (
            <tr>
              <td colSpan={columns.length + 1}>{additional}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <label htmlFor="rowsPerPage" className="form-label me-2">
            Show:
          </label>
          <select
            id="rowsPerPage"
            className="form-select w-auto"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <ul className="pagination justify-content-end">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {renderPagination()}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginatedTable;
