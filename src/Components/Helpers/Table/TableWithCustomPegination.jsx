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
  showIndex,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCounting, setShowCounting] = useState("");


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

    console.log("data", data);

    let abc = filtered.map(
      (item, index) => (currentPage - 1) * rowsPerPage + index + 1
    );

    const firstElement = abc[0];
    const lastElement = abc[abc.length - 1];

    setShowCounting(`Showing ${firstElement} to ${lastElement} of entries`);

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
  // const renderPagination = () => {
  //   let pages = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     pages.push(
  //       <li
  //         key={i}
  //         className={`page-item ${i === currentPage ? "active" : ""}`}
  //       >
  //         <button className="page-link" onClick={() => setCurrentPage(i)}>
  //           {i}
  //         </button>
  //       </li>
  //     );
  //   }
  //   return pages;
  // };

  const renderPagination = () => {
    const visiblePageLinks = 5; // Number of visible page links at a time
    let pages = [];

    // Determine start and end of page links
    const startPage = Math.max(
      1,
      currentPage - Math.floor(visiblePageLinks / 2)
    );
    const endPage = Math.min(totalPages, startPage + visiblePageLinks - 1);

    // Ensure there's a consistent number of visible links
    const adjustedStartPage = Math.max(1, endPage - visiblePageLinks + 1);

    // Add "Previous" and "First" if not on the first page
    if (currentPage > 1) {
      pages.push(
        <li key="first" className="page-item">
          <button className="page-link" onClick={() => setCurrentPage(1)}>
            &laquo;
          </button>
        </li>
      );
    }

    // Render ellipsis if there's a gap before the first visible page
    if (adjustedStartPage > 1) {
      pages.push(
        <li key="start-ellipsis" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }

    // Render visible page links
    for (let i = adjustedStartPage; i <= endPage; i++) {
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

    // Render ellipsis if there's a gap after the last visible page
    if (endPage < totalPages) {
      pages.push(
        <li key="end-ellipsis" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }

    // Add "Next" and "Last" if not on the last page
    if (currentPage < totalPages) {
      pages.push(
        <li key="last" className="page-item">
          <button
            className="page-link"
            onClick={() => setCurrentPage(totalPages)}
          >
            &raquo;
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
  }, [window]);
  return (
    <div className="container">
      <div className="main-table-fields">
        <div className="select-search-main">
          <label htmlFor="rowsPerPage" className="form-label me-2">
            Show:
          </label>
          <select
            id="rowsPerPage"
            className="form-select w-auto custom-select"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            className="form-control custom-search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <table className="table table-striped table-bordered table-responsive">
        <thead className="text-center table-header-backeground">
          {data && data?.length > 0 && (
            <tr>
              {showIndex && <th>Sr.No.</th>}
              {columns.map(
                (column, id) =>
                  column.visible && (
                    <>
                      <th key={column.field}>{column.header}</th>
                    </>
                  )
              )}

              {UserFullButtonList &&
                UserFullButtonList?.map((items, index) => {
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
                  {showIndex && (
                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                  )}
                  {columns.map((column) =>
                    column.visible ? (
                      <td key={column.field}>
                        {column.field === "activeStatus"
                          ? row.activeStatus
                            ? "Market Is Active"
                            : "Market Is Inactive"
                          : column.field === "is_Active"
                          ? row.is_Active
                            ? "Active"
                            : "Disabled"
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
                                  typeof items.buttonColor === "function"
                                    ? `btn-${items.buttonColor(row)}`
                                    : items.buttonColor
                                    ? `btn-${items.buttonColor}`
                                    : "unblock-btn"
                                } btn-sm me-2`}
                                onClick={() => items.Conditions(row)}
                              >
                                {typeof items.buttonName === "function"
                                  ? items.buttonName(row)
                                  : items.buttonName}
                              </button>
                            ) : items.type === "check" ? (
                              <PagesIndex.ChangeStatus
                                apiRoute={""}
                                req={""}
                                checkboxStatus={""}
                                rowData={""}
                              />
                            ) : items.type === "ankertag" ? (
                              <button
                                className={`btn  me-2`}
                                onClick={() => items.Conditions(row)}
                              >
                                {items.buttonName}
                              </button>
                            ) : null}
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

      <div className="row d-flex align-items-center">
        <div className="col-md-6">
          <span className="fw-bold">{showCounting}</span>
        </div>
        <div className="col-md-6">
          <nav>
            <ul className="pagination justify-content-end">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
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
      </div>
    </div>
  );
};

export default PaginatedTable;
