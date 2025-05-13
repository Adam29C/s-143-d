import React, { useState, useEffect } from "react";

const PaginatedTable = ({
  data,
  initialRowsPerPage,
  visibleFields,
  UserFullButtonList,
  showIndex,
  additional,
  Responsive,
  additionalnew,
  showSingleSearch,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage || 25);
  const [filteredData, setFilteredData] = useState(data || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [isResponsive, setIsResponsive] = useState(window.innerWidth < 768);
  const [isResponsive123, setIsResponsive123] = useState(
    Responsive && Responsive
  );


  const [showCounting, setShowCounting] = useState(
    "Showing 0 to 0 of 0 entries"
  );

  const maxPagesToShow = 10;

  // Sort and Filter data
  useEffect(() => {
    let sortedData = [...data];

    let abc = data.map(
      (item, index) => (currentPage - 1) * rowsPerPage + index + 1
    );

    const firstElement = abc.length > 0 ? abc[0] : 0;
    const lastElement = abc.length > 0 ? abc[abc.length - 1] : 0;

    // console.log(
    //   "Showing ${firstElement} to ${lastElement} of ${result.totalRows} entries",
    //   `Showing ${firstElement} to ${lastElement} of entries`
    // );

    // Apply sorting
    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    // Apply search filtering

    // if (showSingleSearch) {
    //   const searchResults = sortedData.filter((row) =>
    //     row.digit_id.includes(searchQuery)
    //   );

    //   setFilteredData(searchResults);

    //   setShowCounting(
    //     `Showing ${1} to ${searchResults.length} of ${
    //       searchResults.length
    //     } entries (filtered from ${data.length} total entries)`
    //   );
    //   return
    // }
    const searchResults = sortedData.filter((row) =>
      visibleFields.some(
        (field) =>
          !field.isButton &&
          row[field.value]
            ?.toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    );

    if (searchQuery === "") {
      setShowCounting(
        `Showing ${firstElement} to ${lastElement} of ${data.length} entries`
      );
    } else {
      setShowCounting(
        `Showing ${searchResults.length < 1 ? 0 : 1} to ${
          searchResults.length
        } of ${searchResults.length} entries (filtered from ${
          data.length
        } total entries)`
      );
    }

    setFilteredData(searchResults || []);
    setCurrentPage(1); // Reset to first page on search/sort
  }, [searchQuery, data, visibleFields, sortConfig]);

  // Handle column header click for sorting
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // Toggle sort direction if same column
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      // Default to ascending sort
      return { key, direction: "asc" };
    });
  };

  // Pagination details
  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);
  const currentData = filteredData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Calculate the range of pages to display
  const startPage =
    Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  // Render buttons dynamically
  const renderButton = (field, row) => {
    const buttonText =
      typeof field.value === "function" ? field.value(row) : field.value;

    return (
      <button
        key={field.name}
        // className={`btn btn-${field.buttonColor} btn-sm`}
        onClick={() => field.Conditions(row)}
        className={`btn ${
          // typeof field.buttonColor === "function"
          //   ? `btn-${field.buttonColor(row)}`
          //   : field.buttonColor
          //   ? `btn-${field.buttonColor}`
          //   : "unblock-btn"
          typeof field.buttonColor === "function"
            ? `btn-${field.buttonColor(row)} ${field.className}`
            : field.buttonColor
            ? `btn-${field.buttonColor}  `
            : `unblock-btn ${field.className}`
        } btn-sm me-2  ${
          typeof field.className === "function"
            ? field.className(row)
            : field.className || ""
        }`}
      >
        {buttonText}
      </button>
    );
  };

  const handleResize = () => {
    //  setIsResponsive123(false);
    setIsResponsive(window.innerWidth < 1024);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // console.log("Responsive && Responsive" ,Responsive && Responsive);

  return (
    <div className="container">
      {/* Controls */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <label htmlFor="rowsPerPage" className="form-label me-2">
            Show:
          </label>
          <select
            id="rowsPerPage"
            className="form-select w-auto"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            {[10, 25, 50, 100].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
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
        className={`table table-striped table-bordered  ${
          Responsive && Responsive === "test"
            ? ""
            : isResponsive
            ? "table-responsive"
            : ""
        }`}
      >
        <thead className="primary-color text-center">
          <tr>
            {showIndex && <th>Sr.</th>}
            {visibleFields.map((field) => (
              <th
                key={field.value}
                onClick={() => handleSort(field.value)}
                style={
                  field.notheader
                    ? {
                        color: "white", // Default color when notheader
                        cursor: "pointer",
                        // ...(field.style ? field.style(field) : {}),
                      }
                    : {
                        cursor: "pointer",
                        ...(field.style ? field.style(field) : {}),
                      }
                }
              >
                {field.name}
                {sortConfig.key === field.value && (
                  <span>{sortConfig.direction === "asc" ? " ↑ " : " ↓ "}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {currentData?.length ? (
            <>
              {additionalnew && (
                <tr>
                  <td
                    className="primary-color text-center"
                    colSpan={visibleFields.length + (showIndex ? 1 : 0)}
                  >
                    {additionalnew}
                  </td>
                </tr>
              )}
              {currentData.map((row, index) => (
                <tr key={index}>
                  {showIndex && (
                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                  )}
                  {visibleFields.map((field) => (
                    <td
                      key={field.value}
                      style={field.style ? field.style(row) : {}}
                      onClick={() => {
                        if (field.onClick) {
                          field.onClick(row);
                        }
                      }}
                    >
                      {field.render
                        ? field.render(row)
                        : field.transform
                        ? field.transform(row[field.value], row) // Custom transformation
                        : field.isButton
                        ? renderButton(field, row)
                        : row[field.value]}
                    </td>
                  ))}
                </tr>
              ))}
              <tr> {additional}</tr>
            </>
          ) : (
            <tr>
              <td colSpan={visibleFields.length + (showIndex ? 1 : 0)}>
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}

      <div className="row d-flex align-items-center">
        <div className="col-md-12">
          <span className="fw-bold">{showCounting}</span>
        </div>
        <div className="col-md-12">
          <nav>
            <ul className="pagination justify-content-end">
              {/* "First" Button */}
              {currentPage > 1 && (
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(1)}
                  >
                    First
                  </button>
                </li>
              )}
              {/* "Previous" Button */}
              {currentPage > 1 && (
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
              )}

              {/* Range of Pages */}
              {startPage > 1 && <li className="page-item disabled"></li>}
              {/* {[...Array(endPage - startPage + 1)].map((_, i) => {
                const pageNum = startPage + i;
                return (
                  <li
                    key={pageNum}
                    className={`page-item ${
                      currentPage === pageNum ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  </li>
                );
              })} */}
              {endPage < totalPages && <li className="page-item disabled"></li>}

              {/* "Next" Button */}
              {currentPage < totalPages && (
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              )}

              {/* "Last" Button */}
              {currentPage < totalPages && (
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    Last
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PaginatedTable;
