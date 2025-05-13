import React, { useEffect, useMemo } from "react";
import PagesIndex from "../../PagesIndex";
import {
  get_Time_From_Unix_Dete_string,
  Get_Year_With_Time_With_Column_Saprate,
  show,
} from "../../../Utils/Common_Date";
import { parseDate } from "../../../Utils/ManageSorting";

const ManualRequest = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");

  //all state
  const [activeTabIndex, setActiveTabIndex] = PagesIndex.useState(0);
  const [data, setData] = PagesIndex.useState([]);

  // Log the corresponding tab name
  const tabTitles = ["SUCCESS", "FAILED", "decline"];
  const status = tabTitles[activeTabIndex];
  //get fund requestdata
  const getFundRequestList = async () => {
    const res = await PagesIndex.admin_services.SHOW_PAYMENT_HISTORY_API(
      status,
      token
    );

    let aarrrr = [];
    res.data.forEach((item) => {
      let dateObj = new Date(item.createTime);

      let formattedDate = dateObj.toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      aarrrr.push({ ...item, created_at: formattedDate });
      return;
    });

    aarrrr.sort((a, b) => parseDate(b.created_at) - parseDate(a.created_at));

    console.log("aarrrr", aarrrr);
 
    if (res?.status) {
      setData(aarrrr);
    }
  };

  useEffect(() => {
    getFundRequestList();
  }, [activeTabIndex]);

  //handle status change

  const handleStatusChange = async (id, value) => {
    const apidata = {
      id: id,
    };
    if (value === "approve") {
      const res = await PagesIndex.admin_services.APPROVED_FUND_REQUEST_API(
        apidata,
        token
      );

      if (res?.status) {
        PagesIndex.toast.success(res?.message);
        getFundRequestList();
      }
    } else if (value === "decline") {
      const res = await PagesIndex.admin_services.DECLINED_FUND_REQUEST_API(
        apidata,
        token
      );

      if (res?.status) {
        PagesIndex.toast.success(res?.message);
        getFundRequestList();
      }
    }
  };

  const totalAmount = useMemo(
    () =>
      data.reduce(
        (acc, item) => acc + (parseFloat(item?.transaction_amount) || 0),
        0
      ),
    [data]
  );

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.username,
      sortable: true,
    },

    {
      name: "Contact No.",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => <div>{row.description}</div>,
      wrap: true,
      sortable: true,
    },
    {
      name: "Transaction Id",
      selector: (row) => row.transaction_id,
      sortable: true,
      wrap: true, // Text wrap enable karega
      width: "200px",
    },
    {
      name: "Amount",
      selector: (row) => row.transaction_amount,
      sortable: true,
    },
    // {
    //   name: "Type",
    //   selector: (row) => (
    //     <div>
    //       {status === "pending" ? (
    //         <select
    //           className="p-1"
    //           aria-label="Default select example"
    //           value={row.status}
    //           onChange={(e) => {
    //             handleStatusChange(row?._id, e.target.value);
    //           }}
    //         >
    //           <option disabled value="pending">
    //             Pending
    //           </option>
    //           <option value="approve">Approve</option>
    //           <option value="decline">Decline</option>
    //         </select>
    //       ) : (
    //         row.status
    //       )}
    //     </div>
    //   ),
    // },
    {
      name: "Date & Time",
      // selector: (row) => Get_Year_With_Time_With_Column_Saprate(row.createTime),
      sortable: true,
      wrap: true, // Text wrap enable karega
      width: "200px",
      selector: (row) => {
        let dateObj = new Date(row.createTime);
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
    },
  ];

  const tabs = [
    {
      title: "Approved Request",
      content: (
        <div className="mt-4">
          <PagesIndex.Data_Table columns={columns} data={data} />{" "}
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
          <PagesIndex.Data_Table
            columns={columns}
            data={data}
            showFilter={true}
          />
          <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">
            Total Amount {totalAmount}/-
          </h3>
        </div>
      ),
    },
  ];
  return (
    <PagesIndex.Main_Containt title="Gatway Payment History">
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
