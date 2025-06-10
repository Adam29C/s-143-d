import React, { useEffect, useMemo } from "react";
import PagesIndex from "../../PagesIndex";
import { abc } from "../../../Utils/Common_Date";
import { Api } from "../../../Config/Api";
import { parseDate } from "../../../Utils/ManageSorting";
import ReusableModal from "../../../Helpers/Modal/ModalComponent_main";

const ManualRequest = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");

  //all state
  const [activeTabIndex, setActiveTabIndex] = PagesIndex.useState(0);
  const [GetIds, setGetIds] = PagesIndex.useState([]);
  const [ModalStateHistory, setModalStateHistory] = PagesIndex.useState(false);
  const [ProfileData, setProfileData] = PagesIndex.useState(false);
  const [loading, setLoading] = PagesIndex.useState(true);
  const [getTotals, setgetTotals] = PagesIndex.useState({
    admin_profit: 0,
    user_profit: 0,
  });

  const [data, setData] = PagesIndex.useState([]);
  const [data12, setData12] = PagesIndex.useState([]);

  // Log the corresponding tab name
  const tabTitles = [
    "pending",
    "processing",
    "inprocess",
    "approved",
    "rejected",
    "failed",
  ];
  const status = tabTitles[activeTabIndex];

  //get fund requestdata

  const getFundRequestList = async () => {
    setData([]);
    setData12([]);

    if (status == "pending") {
      setLoading(true);
      let abcccc1 = `${Api.PENDINGGATWAYPAYMENTLIST}?start_date=${abc(
        new Date()
      )}&end_date=${abc(new Date())}&status=${status.toUpperCase()}`;
      setLoading(false);

      const res = await PagesIndex.admin_services.GATWAY_PAYMENT_LIST(
        abcccc1,
        token
      );
      setLoading(false);

      let aarrrr = [];
      let admin_profit = 0;
      let user_profit = 0;

      if (res?.status) {
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

        aarrrr.sort(
          (a, b) => parseDate(b.created_at) - parseDate(a.created_at)
        );

        setData12(aarrrr);

        setgetTotals({
          admin_profit: admin_profit,
          user_profit: user_profit,
        });
      }
    } else {
      setLoading(true);

      let abcccc12 = `${Api.GATWAYPAYMENTLIST}?start_date=${abc(
        new Date()
      )}&end_date=${abc(new Date())}&status=${
        status == "inprocess" ? "INPROGRESS" : status.toUpperCase()
      }`;

      const res12 = await PagesIndex.admin_services.GATWAY_PAYMENT_LIST(
        abcccc12,
        token
      );
      // setLoading(false);

      if (res12?.status) {
        let newarrr = [];
        res12.data.forEach((item) => {
          let dateObj = new Date(item.created_at);

          let formattedDate = dateObj.toLocaleString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          });

          newarrr.push({ ...item, created_at: formattedDate });
        });

        newarrr.sort(
          (a, b) => parseDate(b.created_at) - parseDate(a.created_at)
        );

        setLoading(false);

        setData(newarrr);
      }
    }
  };

  useEffect(() => {
    getFundRequestList();
  }, [activeTabIndex]);

  const handleStatusChange = async (id, value) => {
    try {
      const apidata = {
        request_id: id,
        action: value,
      };

      if (value === "APPROVE" || value === "REJECT") {
        const userConfirmed = window.confirm("Do you really want to approve?");
        if (!userConfirmed) {
          return;
        }
      }

      // API Call

      let response = "";

      status === "pending"
        ? (response =
            await PagesIndex.admin_services.GATWAY_PAYMENT_DEPOSITE_OR_DECLINED(
              apidata,
              token
            ))
        : status === "processing" || status === "failed"
        ? (response =
            await PagesIndex.admin_services.GATWAY_PAYMENT_DEPOSITE_OR_DECLINED123(
              apidata,
              token
            ))
        : "";

      console.log("response", response);

      if (response.status) {
        value = "";
        PagesIndex.toast.success(response.message);
        getFundRequestList();
      } else {
        PagesIndex.toast.error(response.error);
        PagesIndex.toast.error(response.response.data.error);
      }
    } catch (error) {
      PagesIndex.toast.error(response.response.data.error);
    }
  };
  const getProfile = async (id) => {
    setProfileData(id);
    setModalStateHistory(!ModalStateHistory);
  };

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.username,
      width: "130px",
      sortable: true,
    },
    {
      name: "Mobile No",
      selector: (row) => row.mobile,
      wrap: true,
      width: "130px",
      sortable: true,
    },

    {
      name: "Account No.",
      selector: (row) => row.account_no,
      wrap: true,
      width: "140px",
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
      omit: status === "pending" ? false : true,
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
      wrap: true,
      width: "130px",
      sortable: true,
      omit: status === "pending" ? false : true,

      cell: (row) => {
        const diff = parseInt(row.admin_profit_loss) - parseInt(row.amount);
        return (
          <span
            style={{
              color: diff > 0 ? "green" : "red",
              fontWeight: "900",
            }}
          >
            {diff > 0 ? `PROFIT + ${diff}` : `LOSS - ${Math.abs(diff)}`}
          </span>
        );
      },
    },
    {
      name: "status",
      wrap: true,
      width: "150px",
      sortable: true,
      cell: (row) => {
        return (
          <h1 className={`profit`}>
            {row.status === "PROCESSING" ? "PENDING" : row.status}
          </h1>
        );
      },
    },
    {
      name: "Transaction Id",
      selector: (row) => {
        return row.transaction_id || row.order_id || "null";
      },
      wrap: true,
      width: "10px",
      sortable: true,
      omit: status === "pending" ? true : true,
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
      width: "150px",
      sortable: true,
    },
    {
      name: "View",
      wrap: true,
      width: "90px",
      sortable: true,
      selector: (row) => (
        <div>
          <i
            className="fa-solid fa-eye view  text-primary"
            style={{ fontSize: "17px" }}
            onClick={() => getProfile(row)}
          ></i>
        </div>
      ),
    },
    {
      name: "Action",
      wrap: false, // Text wrap enable karega
      omit:
        status === "rejected" || status === "approved" || status === "inprocess"
          ? true
          : false,
      // width: "300px",
      selector: (row) => (
        <div>
          <div className="d-flex">
            {status === "processing" ||
            status === "pending" ||
            status === "failed" ? (
              <>
                <button
                  type="button"
                  className="btn  btn-primary px-2 py-1 mx-1"
                  onClick={(e) => {
                    handleStatusChange(row?.request_id, "APPROVE");
                  }}
                >
                  {status === "failed" ? "RETRY" : "APPROVE"}
                </button>
                {status !== "failed" && (
                  <button
                    type="button"
                    className="btn  btn-danger px-2 py-1 "
                    onClick={(e) => {
                      handleStatusChange(
                        row?.request_id,

                        "REJECT"
                      );
                    }}
                  >
                    {status === "processing" ? "REJECT & REFUND" : "Reject"}
                  </button>
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      ),
    },
  ];

  const columns1 = [
    {
      name: "User Name",
      selector: (row) => row.username,
      width: "130px",
      sortable: true,
    },
    {
      name: "Contact No",
      selector: (row) => row.mobile,
      wrap: true,
      width: "130px",
      sortable: true,
    },

    // {
    //   name: "Account No.",
    //   selector: (row) => row.account_no,
    //   wrap: true,
    //   width: "140px",
    //   sortable: true,
    //   color: "red",
    // },
    // {
    //   name: "IFSC",
    //   selector: (row) => row.ifsc_code,
    //   wrap: true,
    //   width: "130px",
    //   sortable: true,
    // },
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
      name: "status",
      wrap: true,
      width: "150px",
      sortable: true,
      cell: (row) => {
        return <h1 className={`pending-status`}>{row.status}</h1>;
      },
    },
    {
      name: "Profit/Loss",
      wrap: true,
      width: "130px",
      sortable: true,
      cell: (row) => {
        const diff = parseInt(row.admin_profit_loss) - parseInt(row.amount);
        return (
          <h1 className={`${diff > 0 ? "profit" : "losss"}`}>
            {diff > 0 ? (
              <>
                PROFIT <br />
                <span>{`₹ ${parseFloat(diff).toFixed(2)}`}</span>
              </>
            ) : (
              <>
                LOSS <br />
                <span>{`₹ ${parseFloat(Math.abs(diff)).toFixed(2)}`}</span>
              </>
            )}
          </h1>
        );
      },
    },

    {
      name: "Date & Time",
      selector: (row) => {
        let dateObj = row.created_at;
        return dateObj.toLocaleString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
      },
      wrap: true,
      width: "150px",
      sortable: true,
    },
    {
      name: "View",
      wrap: true,
      width: "90px",
      sortable: true,
      selector: (row) => (
        <div>
          <i
            className="fa-solid fa-eye view  text-primary"
            style={{ fontSize: "17px" }}
            onClick={() => getProfile(row)}
          ></i>
        </div>
      ),
    },
    {
      name: "Action",
      wrap: false,
      omit: status === "rejected" || status === "approved" ? true : false,
      width: "280px",
      selector: (row) => (
        <div>
          <div className="d-flex">
            <>
              <button
                type="button"
                className="btn  btn-primary px-2 py-1 mx-1"
                onClick={(e) => {
                  handleStatusChange(row?.request_id, "APPROVE");
                }}
              >
                APPROVE
              </button>
              {status !== "failed" && (
                <button
                  type="button"
                  className="btn  btn-danger px-2 py-1 w-50"
                  onClick={(e) => {
                    handleStatusChange(row?.request_id, "REJECT");
                  }}
                >
                  REJECT
                </button>
              )}
            </>
          </div>
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

  const totalAmount = useMemo(
    () =>
      data12.reduce((acc, item) => acc + (parseFloat(item?.amount) || 0), 0),
    [data12]
  );

  const totalAmount122 = useMemo(
    () => data.reduce((acc, item) => acc + (parseFloat(item?.amount) || 0), 0),
    [data]
  );

  const CustomLoader = () => (
    <div className="custom-loader-wrapper">
      <div className="custom-spinner"></div>
      <div className="loader-text">Loading Data...</div>
    </div>
  );
  const tabs = [
    {
      title: "Pending Request",
      content: (
        <>
          <div className="mt-4">
            <PagesIndex.Data_Table
              columns={columns1}
              data={data12}
              isLoading={loading}
              // selectableRows
              onSelectedRowsChange={handleChange}
            />
            <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">
              Total Amount - {totalAmount}/-
            </h3>

            <CustomLoader />
          </div>
        </>
      ),
    },
    {
      title: "Payout Requests",
      content: (
        <>
          <div className="mt-4">
            <PagesIndex.Data_Table
              columns={columns}
              data={data}
              // selectableRows
              isLoading={loading}
              // onSelectedRowsChange={handleChange}
            />
            <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">
              Total Amount -{totalAmount122}/-
            </h3>
          </div>
        </>
      ),
    },
    {
      title: "Inprocess Request",
      content: (
        <>
          <div className="mt-4">
            <PagesIndex.Data_Table
              columns={columns}
              data={data}
              // selectableRows
              // onSelectedRowsChange={handleChange}
              isLoading={loading}
            />
            <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">
              Total Amount -{totalAmount122}/-
            </h3>
          </div>
        </>
      ),
    },
    {
      title: "Approved Request",
      content: (
        <div className="mt-4">
          <PagesIndex.Data_Table
            columns={columns}
            data={data}
            isLoading={loading}
          />
          <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">
            Total Amount - {totalAmount122}/-
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
            isLoading={loading}
          />{" "}
          <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">
            Total Amount - {totalAmount122}/-
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
              isLoading={loading}
              // selectableRows
              // onSelectedRowsChange={handleChange}
            />
            <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">
              Total Amount - {totalAmount122}/-
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

      <ReusableModal
        show={ModalStateHistory}
        onClose={setModalStateHistory}
        dialogClassName="modal-60w"
        title={"User Profile"}
        size={"md"}
        body={
          <>
            <div className="main">
              <div className="profile-content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6 ml-auto mr-auto">
                      <div className="profile">
                        <div className="name">
                          <h6 className="title" id="username">
                            User Name :{ProfileData.username}
                          </h6>
                          <p className="walletbalance" id="balance">
                            Wallet Balance : {ProfileData.wallet_balance}/-
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="user-data">
                <div className="container-fluid">
                  <table className="table table-bordered profile-content-table">
                    <tbody>
                      <tr>
                        <td className="font-weight-bold">Bank Name</td>
                        <td id="bankName">{ProfileData.bank_name}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Account Number</td>
                        <td id="accNo"> {ProfileData.account_no}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">IFSC Code</td>
                        <td id="ifsc">{ProfileData.ifsc_code}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">
                          Account Holder Name
                        </td>
                        <td id="accHolder">
                          {ProfileData.account_holder_name}
                        </td>
                      </tr>

                      <tr>
                        <td className="font-weight-bold">Personal Number</td>
                        <td id="regular">{ProfileData.mobile}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        }
        primaryButtonText="Save Changes"
        secondaryButtonText="Close"
        showFooter={false}
      />
      <PagesIndex.Toast />
    </PagesIndex.Main_Containt>
  );
};

export default ManualRequest;
