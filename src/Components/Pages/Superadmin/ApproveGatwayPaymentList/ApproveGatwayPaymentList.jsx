import React, { useEffect, useMemo } from "react";
import PagesIndex from "../../PagesIndex";
import {
  abc,
  get_Time_From_Unix_Dete_string,
  Get_Year_With_Time_With_Column_Saprate,
  show,
} from "../../../Utils/Common_Date";
import { Api } from "../../../Config/Api";
import { parseDate } from "../../../Utils/ManageSorting";

const ManualRequest = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");

  //all state
  const [activeTabIndex, setActiveTabIndex] = PagesIndex.useState(0);
  const [GetIds, setGetIds] = PagesIndex.useState([]);
  const [getTotals, setgetTotals] = PagesIndex.useState({
    admin_profit: 0,
    user_profit: 0,
  });

  console.log("getTotals", getTotals);

  const [data, setData] = PagesIndex.useState([]);

  // Log the corresponding tab name
  const tabTitles = ["pending", "processing", "approved", "rejected", "failed"];
  const status = tabTitles[activeTabIndex];

  //get fund requestdata

  const getFundRequestList = async () => {
    let abcccc = `${
      status == "pending" ? Api.PENDINGGATWAYPAYMENTLIST : Api.GATWAYPAYMENTLIST
    }?start_date=${abc(new Date())}&end_date=${abc(
      new Date()
    )}&status=${status}`;

    const res = await PagesIndex.admin_services.GATWAY_PAYMENT_LIST(
      abcccc,
      token
    );

    let aarrrr = [];
    let admin_profit = 0;
    let user_profit = 0;
    res.data.forEach((item) => {
      let dateObj = new Date(item.created_at);

      admin_profit += parseFloat(item.admin_profit_loss || 0);
      user_profit += parseFloat(item.user_profit_loss || 0);

      let formattedDate = dateObj.toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      aarrrr.push({ ...item, created_at: formattedDate });
      return;
    });

    aarrrr.sort((a, b) => parseDate(b.created_at) - parseDate(a.created_at));

    console.log("aarrrr", aarrrr);

    if (res?.status) {
      setData(aarrrr);
      setgetTotals({
        admin_profit: admin_profit,
        user_profit: user_profit,
      });
    }
  };

  useEffect(() => {
    getFundRequestList();
  }, [activeTabIndex]);

  //handle status change

  // const handleStatusChange = async (id, value) => {
  //   const apidata = {
  //     request_id: id,
  //     action: value,
  //   };

  //   value === "APPROVE";
  //   if (window.confirm("Do you really want to proceed?")) {
  //   } else {
  //     console.log("User canceled the action.");
  //   }

  //   const res =
  //     await PagesIndex.admin_services.GATWAY_PAYMENT_DEPOSITE_OR_DECLINED(
  //       apidata,
  //       token
  //     );

  //   if (res.status) {
  //     PagesIndex.toast.success(res.message);
  //     getFundRequestList();
  //   }
  //   console.log("dfdffsfsfds", res);
  // };

  const handleStatusChange = async (id, value) => {
    const apidata = {
      request_id: id,
      action: value,
    };

    if (value === "APPROVE") {
      const userConfirmed = window.confirm("Do you really want to approve?");
      if (!userConfirmed) {
        return;
      }
    }

    // API Call
    const res =
      await PagesIndex.admin_services.GATWAY_PAYMENT_DEPOSITE_OR_DECLINED(
        apidata,
        token
      );

    if (res.status) {
      value = "";
      PagesIndex.toast.success(res.message);
      getFundRequestList();
    } else {
      PagesIndex.toast.error(res.response.data.error);
    }
  };

  const totalAmount = useMemo(
    () => data.reduce((acc, item) => acc + (parseFloat(item?.amount) || 0), 0),
    [data]
  );

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Contact No",
      selector: (row) => row.mobile,
      wrap: true,
      width: "130px",
      sortable: true,
    },

    {
      name: "Account No.",
      selector: (row) => row.account_no,
      wrap: true,
      width: "130px",
      sortable: true,
      color: "red",
    },
    {
      name: "IFSC",
      selector: (row) => row.ifsc_code,
      wrap: true,
      width: "130px",
      sortable: true,
    },
    {
      name: "Wallet Amount",
      selector: (row) => row.wallet_balance,
      wrap: true,
      width: "150px",
      sortable: true,
    },
    {
      name: "Req. Amount",
      selector: (row) => row.amount,
      wrap: true,
      width: "150px",
      sortable: true,
    },
    {
      name: "Profit/Loss",
      // selector: (row) => row.admin_profit_loss,
      wrap: true,
      width: "150px",
      sortable: true,
      cell: (row) => (
        <span
          style={{
            color:
              parseInt(row.admin_profit_loss - row.amount) > 0
                ? "green"
                : "red",
            fontWeight: "900",
          }}
        >
          {parseInt(row.admin_profit_loss - row.amount)}
        </span>
      ),
    },
    // {
    //   name: "User Profit",
    //   // selector: (row) => row.user_profit_loss,
    //   wrap: true,
    //   width: "150px",
    //   sortable: true,
    //   cell: (row) => (
    //     <span
    //       style={{
    //         color: parseInt(row.user_profit_loss) > 0 ? "green" : "red",
    //         fontWeight: "900",
    //       }}
    //     >
    //       {row.user_profit_loss}
    //     </span>
    //   ),
    // },
    {
      name: "Transaction Id",
      selector: (row) => {
        return row.transaction_id || row.order_id || "null";
      },
      wrap: true,
      width: "150px",
      sortable: true,
      omit: status === "pending" ? true : false,
    },
    {
      name: "Date & Time",
      // selector: (row) => row.created_at,

      selector: (row) => {
        let dateObj = row.created_at;
        return dateObj.toLocaleString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true, // 12-hour format with AM/PM
        });
      },
      wrap: true, // Text wrap enable karega
      width: "200px",
      sortable: true,
    },

    {
      name: "Action",
      wrap: true, // Text wrap enable karega
      width: "120px",
      selector: (row) => (
        <div>
          {status === "pending" ? (
            <select
              className="p-1"
              aria-label="Default select example"
              // value={row.status}
              onChange={(e) => {
                handleStatusChange(row?.request_id, e.target.value);
              }}
            >
              <option disabled selected value="">
                select
              </option>
              <option value="APPROVE">Approve</option>
              <option value="REJECT">Decline</option>
            </select>
          ) : (
            row.status
          )}
        </div>
      ),
    },
  ];

  const handleChange = ({ selectedRows }) => {
    let aaa = selectedRows.map((items) => {
      return items.request_id;
    });

    setGetIds({ request_id: aaa, action: "APPROVE_ALL" });
  };

  const ApprovedAll = () => {};

  // console.log("GetIds", GetIds);

  const tabs = [
    {
      title: "Pending Request",
      content: (
        <>
          <div className="mt-4">
            <PagesIndex.Data_Table
              columns={columns}
              data={data}
              // selectableRows
              onSelectedRowsChange={handleChange}
            />
            <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">
              Total Amount - {totalAmount}/-
            </h3>
          </div>
        </>
      ),
    },
    {
      title: "Processing Request",
      content: (
        <>
          <div className="mt-4">
            <PagesIndex.Data_Table
              columns={columns}
              data={data}
              // selectableRows
              // onSelectedRowsChange={handleChange}
            />
            <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">
              Total Amount -{totalAmount}/-
            </h3>
          </div>
        </>
      ),
    },
    {
      title: "Approved Request",
      content: (
        <div className="mt-4">
          <PagesIndex.Data_Table columns={columns} data={data} />
          <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">
            Total Amount - {totalAmount}/-
          </h3>
        </div>
      ),
    },
    {
      title: "Declined Request",
      content: (
        <div className="mt-4">
          <PagesIndex.Data_Table columns={columns} data={data} />{" "}
          <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">
            Total Amount - {totalAmount}/-
          </h3>
        </div>
      ),
    },
    {
      title: "Failed Request",
      content: (
        <>
          <div className="mt-4">
            <PagesIndex.Data_Table
              columns={columns}
              data={data}
              // selectableRows
              // onSelectedRowsChange={handleChange}
            />
            <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">
              Total Amount - {totalAmount}/-
            </h3>
          </div>
        </>
      ),
    },
  ];
  return (
    <PagesIndex.Main_Containt title="Gatway Payment List">
      {/* {status === "pending" && (
        <button className="submitBtn btn" onClick={() => ApprovedAll()}>
          Approve All
        </button>
      )} */}
      <PagesIndex.MultiTabs
        tabs={tabs}
        activeTabIndex={activeTabIndex}
        onTabSelect={(index) => {
          setActiveTabIndex(index);
        }}
      />
      <PagesIndex.Toast />
    </PagesIndex.Main_Containt>
  );
};

export default ManualRequest;
