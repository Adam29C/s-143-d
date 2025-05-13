import React, { useEffect, useMemo } from "react";
import PagesIndex from "../../PagesIndex";

const ManualRequest = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");
  
  //all state
  const [activeTabIndex, setActiveTabIndex] = PagesIndex.useState(0);
  const [data, setData] = PagesIndex.useState([]);

  // Log the corresponding tab name
  const tabTitles = ["pending", "approve", "decline"];
  const status = tabTitles[activeTabIndex];
  //get fund requestdata
  const getFundRequestList = async () => {
   
    const res = await PagesIndex.admin_services.FUND_REQUEST_LIST_API(
      status,
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

  const handleStatusChange = async(id,value)=>{
   const apidata = {
    id:id
   }
    if(value === "approve"){
    const res = await PagesIndex.admin_services.APPROVED_FUND_REQUEST_API(apidata,token)
    
    if(res?.status){
      PagesIndex.toast.success(res?.message)
      getFundRequestList();
    }

    }else if(value === "decline"){
      const res = await PagesIndex.admin_services.DECLINED_FUND_REQUEST_API(apidata,token)
     
      if(res?.status){
        PagesIndex.toast.success(res?.message)
        getFundRequestList();
      }
    }
  }
 
  const totalAmount = useMemo(
    () => data.reduce((acc, item) => acc + (parseFloat(item?.amount) || 0), 0),
    [data]
  );

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.userName,
    },

    {
      name: "Contact No.",
      selector: (row) => row.mobileNumber,
    },
    {
      name: "UPI Name",
      selector: (row) => row.upiId,
    },
    {
      name: "UTR No.",
      selector: (row) => row.utrNumber,
    },
    {
      name: "ScreenShot",
      selector: (row) => row.imageUrl,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Type",
      selector: (row) => (
        <div>
          {status === "pending" ? (       <select
            className="p-1"
            aria-label="Default select example"
            value={row.status}
            onChange={(e) => {
               handleStatusChange(row?._id,e.target.value);
            }}
          >
            <option disabled value="pending">
              Pending
            </option>
            <option value="approve">Approve</option>
            <option value="decline">Decline</option>
          </select>) :row.status}
   
        </div>
      ),
    },
    {
      name: "Date & Time",
      selector: (row) => row.createdAt,
    },
  ];

  const tabs = [
    {
      title: "Pending Request",
      content: (
        <div className="mt-4">
          <PagesIndex.Data_Table columns={columns} data={data} />{" "}
          <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">Total Amount {totalAmount}/-</h3>
        </div>
      ),
    },
    {
      title: "Approved Request",
      content: (
        <div className="mt-4">
          <PagesIndex.Data_Table columns={columns} data={data} />{" "}
          <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">Total Amount {totalAmount}/-</h3>
        </div>
      ),
    },
    {
      title: "Declined Request",
      content: (
        <div className="mt-4">
          <PagesIndex.Data_Table columns={columns} data={data} />{" "}
          <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">Total Amount {totalAmount}/-</h3>
        </div>
      ),
    },
  ];
  return (
    <PagesIndex.Main_Containt title="Manual Payment Request">
      <PagesIndex.MultiTabs
        tabs={tabs}
        activeTabIndex={activeTabIndex}
        onTabSelect={(index) => {
          setActiveTabIndex(index); // Update active tab index
        }}
      />
      <PagesIndex.Toast/>
    </PagesIndex.Main_Containt>
  );
};

export default ManualRequest;
