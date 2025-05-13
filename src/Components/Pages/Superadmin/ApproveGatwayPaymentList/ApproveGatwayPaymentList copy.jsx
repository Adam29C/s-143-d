import React, { useEffect, useMemo } from "react";
import PagesIndex from "../../PagesIndex";
import {
  abc,
  get_Time_From_Unix_Dete_string,
  Get_Year_With_Time_With_Column_Saprate,
  show,
} from "../../../Utils/Common_Date";
import { Api } from "../../../Config/Api";

const ManualRequest = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");

  //all state
  const [activeTabIndex, setActiveTabIndex] = PagesIndex.useState(0);
  const [GetIds, setGetIds] = PagesIndex.useState([]);

  const [data, setData] = PagesIndex.useState([]);

  // Log the corresponding tab name
  const tabTitles = ["pending", "approved", "rejected"];
  const status = tabTitles[activeTabIndex];
  //get fund requestdata
  const getFundRequestList = async () => {
    let abcccc = `${Api.GATWAYPAYMENTLIST}?start_date=${abc(
      new Date()
    )}&end_date=${abc(new Date())}&status=${status}`;

    const res = await PagesIndex.admin_services.GATWAY_PAYMENT_LIST(
      abcccc,
      token
    );

    if (res?.status) {
      setData(res?.data);
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
        console.log("User canceled the approval.");
        return; // Agar user cancel kare to function yahi stop ho jaye
      }
    }

    // API Call
    const res =
      await PagesIndex.admin_services.GATWAY_PAYMENT_DEPOSITE_OR_DECLINED(
        apidata,
        token
      );

    if (res.status) {
      PagesIndex.toast.success(res.message);
      getFundRequestList();
    }

    console.log("API Response:", res);
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
      wrap: true, // Text wrap enable karega
      width: "130px",
      sortable: true,
    },

    {
      name: "Account No.",
      selector: (row) => row.account_no,
      wrap: true, // Text wrap enable karega
      width: "130px",
      sortable: true,
    },
    {
      name: "IFSC",
      selector: (row) => row.ifsc_code,
      wrap: true, // Text wrap enable karega
      width: "130px",
      sortable: true,
    },
    {
      name: "Wallet Amount",
      selector: (row) => row.wallet_balance,
      wrap: true, // Text wrap enable karega
      width: "150px",
      sortable: true,
    },
    {
      name: "Req. Amount",
      selector: (row) => row.amount,
      wrap: true, // Text wrap enable karega
      width: "150px",
      sortable: true,
    },
    {
      name: "Transaction Id",
      selector: (row) => {
        return row.transaction_id || row.order_id || "null";
      },
      wrap: true, // Text wrap enable karega
      width: "150px",
      sortable: true,
      omit: status === "pending" ? true : false,
    },
    {
      name: "Date & Time",
      // selector: (row) => row.created_at,

      selector: (row) => {
        let dateObj = new Date(row.created_at);
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
              Total Amount {totalAmount}/-
            </h3>
          </div>
        </>
      ),
    },
    // {
    //   title: "Processing Request",
    //   content: (
    //     <>
    //       <div className="mt-4">
    //         <PagesIndex.Data_Table
    //           columns={columns}
    //           data={data}
    //           // selectableRows
    //           // onSelectedRowsChange={handleChange}
    //         />
    //         <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">
    //           Total Amount {totalAmount}/-
    //         </h3>
    //       </div>
    //     </>
    //   ),
    // },
    {
      title: "Approved Request",
      content: (
        <div className="mt-4">
          <PagesIndex.Data_Table columns={columns} data={data} />
          <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">
            Total Amount {totalAmount}/-
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
            Total Amount {totalAmount}/-
          </h3>
        </div>
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
          setActiveTabIndex(index); // Update active tab index
        }}
      />
      <PagesIndex.Toast />
    </PagesIndex.Main_Containt>
  );
};

export default ManualRequest;
