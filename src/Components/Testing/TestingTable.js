import React from "react";

const TestingTable = () => {
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [TableData, setTableData] = PagesIndex.useState([]);

  const visibleFields = ["id", "name", "mobile", "wallet_balance"];
  return (
    <div>
      <TableWitCustomPegination
        data={TableData}
        // columns={columns}
        initialRowsPerPage={5}
        SearchInTable={SearchInTable}
        visibleFields={visibleFields}
        additional={`Total Registered Balance : ${TodayRegistedUserBalancefun()}`}
        searchInput={
          <input
            type="text"
            placeholder="Search..."
            value={SearchInTable}
            onChange={(e) => setSearchInTable(e.target.value)}
            className="form-control ms-auto"
          />
        }
      />
    </div>
  );
};

export default TestingTable;
