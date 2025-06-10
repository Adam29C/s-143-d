import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import "../../../assets/css/Data_Table.css"; // Ensure you import your CSS or put styles globally

const Data_Table = ({
  columns,
  data,
  isLoading,
  showFilter,
  selectableRows,
  onSelectedRowsChange,
}) => {
  const [deviceType, setDeviceType] = useState("desktop");
  const [visibleColumns, setVisibleColumns] = useState(columns);

  const customStyles = {
    rows: {
      style: {
        whiteSpace: "normal",
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        justifyContent: "center",
        textAlign: "center",
        whiteSpace: "normal",
      },
    },
    cells: {
      style: {
        border: "1px solid #dee2e6",
        justifyContent: "center",
        textAlign: "center",
        whiteSpace: "normal",
      },
    },
  };

  const handleResizeColumns = () => {
    let newVisibleColumns;
    if (window.innerWidth <= 320) {
      newVisibleColumns = columns.slice(0, 1);
      setDeviceType("mobile");
    } else if (window.innerWidth <= 425) {
      newVisibleColumns = columns.slice(0, 2);
      setDeviceType("mobile");
    } else if (window.innerWidth <= 768) {
      newVisibleColumns = columns.slice(0, 4);
      setDeviceType("tablet");
    } else {
      newVisibleColumns = columns;
      setDeviceType("desktop");
    }
    setVisibleColumns(newVisibleColumns);
  };

  useEffect(() => {
    handleResizeColumns();
    window.addEventListener("resize", handleResizeColumns);
    return () => window.removeEventListener("resize", handleResizeColumns);
  }, [columns]);

  const columns1 = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      width: "70px",
    },
    ...visibleColumns,
  ];

  const ExpandedComponent = ({ data }) => {
    const hiddenColumns = columns.filter(
      (col) => !visibleColumns.includes(col)
    );

    return (
      <div className="short-datatable-main">
        {hiddenColumns.map((col, index) => {
          const key = col.selector ? col.selector(data) : data[col.name];
          return (
            <p className="short-datatable-data" key={index}>
              <strong>{col.name}:</strong> {key}
            </p>
          );
        })}
      </div>
    );
  };

  const CustomLoader = () => (
    <div className="custom-loader-wrapper">
      <div className="custom-spinner"></div>
      <div className="loader-text">Loading Data...</div>
    </div>
  );

  return (
    <>
      <DataTableExtensions
        columns={columns1}
        data={ data}
        print={false}
        export={false}
        filter={showFilter}
        pagination={false}
      >
        <DataTable
          className="custom-datatable-design"
          defaultSortAsc={false}
          pagination={false}
          highlightOnHover
          customStyles={customStyles}
          subHeaderComponent={false}
          selectableRows={selectableRows}
          onSelectedRowsChange={onSelectedRowsChange}
          noDataComponent={
            isLoading ? <CustomLoader /> : "There are no records to display"
          }
          // noDataComponent={
          //   isLoading ? (
          //     <div className="user-loading-main">
          //       <div className="loader" />
          //       testng Gan[at]
          //     </div>
          //   ) : (
          //     "There are no records to display"
          //   )
          // }
          expandableRows={deviceType === "mobile" || deviceType === "tablet"}
          expandableRowsComponent={ExpandedComponent}
          responsive
        />
      </DataTableExtensions>
    </>
  );
};

export default Data_Table;
