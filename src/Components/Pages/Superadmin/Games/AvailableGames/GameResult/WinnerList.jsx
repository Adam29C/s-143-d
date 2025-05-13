import React, { useEffect, useState } from "react";
import PagesIndex from "../../../../PagesIndex";
import Split_Main_Containt from "../../../../../Layout/Main/Split_Main_Content";
import ReusableModal from "../../../../../Helpers/Modal/ReusableModal";
import { Api } from "../../../../../Config/Api";
import { Navigate, useNavigate } from "react-router-dom";

const WinnerList = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");
  const { user_id } = JSON.parse(localStorage.getItem("userdetails"));
  const navigate = useNavigate();
  //get previous page single game result data
  const location = PagesIndex.useLocation();
  //data destructure
  const data = location.state?.rowdata;

  //all state
  const [remainingWinnerData, setRemainingWinnerData] = PagesIndex.useState([]);
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [getStatus, setGetStatus] = PagesIndex.useState("0");
  const [ModalState, setModalState] = useState(false);
  const [Refresh, setRefresh] = PagesIndex.useState(false);
  const [GetResultStatus, setGetResultStatus] = PagesIndex.useState([]);
  const [ShowTotal, setShowTotal] = PagesIndex.useState(0);

  const [BtnVisiably, setBtnVisiably] = PagesIndex.useState(false);

  const handleChange = (state) => {
    setGetStatus(state);
    setModalState(true);
  };
  const fetchData = async (page, rowsPerPage, searchQuery) => {
   
    const apidata = {
      providerId: data.providerId,
      date: data.resultDate,
      session: data?.session,
      page: page,
      limit: rowsPerPage,
      search: searchQuery,
    };

    try {
      const res1 =
        await PagesIndex.admin_services.GAME_REMAINING_WINNER_LIST_API(
          apidata,
          token
        );

      if (res1.status) {
        const nonEmptyCategories1 = [];

        Object.entries(res1?.data?.winnerList).forEach(([key, value]) => {
          if (value.length > 0) {
            nonEmptyCategories1.push(...value);
          }
        });

        const totalRows = res1.data.pagination.totalItems || 10;
        let mainRes = nonEmptyCategories1;
        console.log("mainRes", mainRes);

        let total = 0;
        mainRes.forEach((item) => {
          total += item.biddingPoints * item.gameTypePrice;
        });

        setShowTotal(total);

        setRemainingWinnerData(mainRes.length);
        return { mainRes, totalRows };
      }
    } catch {}
  };

  const fetchData1 = async (page, rowsPerPage, searchQuery) => {
    const apidata1 = {
      digit: data.winningDigit,
      provider: data.providerId,
      gamedate: data.resultDate,
      resultId: data._id,
      resultStatus: String(data.status),
      digitFamily: String(data.winningDigitFamily),
      sessionType: data?.session,
      providerName: data.providerName,
      page: page,
      limit: rowsPerPage,
      searchQuery,
    };

    try {
      const res = await PagesIndex.admin_services.GAME_MAIN_WINNER_LIST_API(
        apidata1,
        token
      );

      if (res.status) {
        setGetResultStatus(res.data);
        const nonEmptyCategories = [];

        Object.entries(res?.data?.winnerList).forEach(([key, value]) => {
          if (value.length > 0) {
            nonEmptyCategories.push(...value);
          }
        });

        console.log("nonEmptyCategories", nonEmptyCategories);

        const totalRows = res.data.pagination.totalItems || 5;
        let mainRes = nonEmptyCategories;

        let total = 0;
        mainRes.forEach((item) => {
          total += item.biddingPoints * item.gameTypePrice;
        });

        setShowTotal(total);

        return { mainRes, totalRows };
      }
    } catch {}
  };

  PagesIndex.useEffect(() => {
    fetchData();
    fetchData1();
  }, []);

  const visibleFields = [
    {
      name: "Winner Name",
      value: "userName",
      sortable: false,
    },
    {
      name: "Mobile Number",
      value: "mobileNumber",
      sortable: false,
    },
    {
      name: "Game",
      value: "gameTypeName",
      sortable: false,
    },
    {
      name: "Bid Digit",
      value: "bidDigit",
      sortable: false,
      className: "badge badge-purple",
    },
    {
      name: "Bid Date",
      value: "gameDate",
      sortable: false,
    },
    {
      name: "Bidding Amount",
      value: "biddingPoints",
      sortable: false,
    },
    {
      name: "Rate",
      value: "gameTypePrice",
      sortable: false,
    },
    {
      name: "Total Amount",
      value: "gameWinPoints",
      sortable: false,
      transform: (row, item) => {
        return item.biddingPoints * item.gameTypePrice;
      },
    },
  ];

  const confirmPayment = async (status) => {
    setBtnVisiably(true);

    const payload = {
      providerId: GetResultStatus.provider,
      windigit: GetResultStatus.winDigit,
      gameDate: GetResultStatus.gameDate,
      digitFamily: String(GetResultStatus.digitFamily),
      session: GetResultStatus.session,
      jodiDigit: GetResultStatus.jodiDigit,
      halfSangam1: GetResultStatus.halfSangam2,
      halfSangam2: GetResultStatus.halfSangam1,
      fullSangam: GetResultStatus.fullSangam,
      resultId: GetResultStatus.resultId,
      reqType: "main",
      adminId: user_id,
      page: 1,
      limit: 10,
    };

    console.log("dsfsdfdsf", payload);

    // return;

    let res = "";
    if (getStatus && getStatus === "0") {
      res =
        await PagesIndex.game_service.STARLINE_GAME_DISTIBUTE_FUND_WINNERS_API(
          Api.CONFIRM_PAYMENT_API,
          payload,
          token
        );
    } else {
      // console.log("remain");

      res =
        await PagesIndex.game_service.STARLINE_GAME_DISTIBUTE_FUND_WINNERS_API(
          Api.REMENAINING_CONFIRM_PAYMENT_API,
          payload,
          token
        );
    }

    // console.log("remain", res);

    if (res.status) {
      setBtnVisiably(false);
      PagesIndex.toast.success(res.message);
      navigate("/admin/game/results");
    } else {
      PagesIndex.toast.error(res.response.data.message);
    }
  };

  const cardLayouts = [
    {
      size: 12,
      body: (
        <div>
          <h4 className="winner-list-text-main">
            Game Winners Of Date : {data?.resultDate}, Provider :{" "}
            {data?.providerName}, Session : {data?.session}, Digit :{" "}
            {data?.winningDigit}-{data?.winningDigitFamily}
          </h4>
        </div>
      ),
    },

    {
      size: 12,
      body: (
        <div>
          {GetResultStatus.resultStatus === 0 ? (
            <div class="d-flex justify-content-end mb-3">
              <button
                onClick={() => {
                  handleChange("0");
                }}
                className="btn btn-dark"
              >
                Confirm Payment
              </button>
            </div>
          ) : (
            ""
          )}
          <PagesIndex.TableWithCustomPeginationNew
            fetchData={fetchData1}
            columns={visibleFields}
            // UserFullButtonList={UserFullButtonList}
            showIndex={true}
            Refresh={Refresh}
            show_additional={false}
            showName={true}
            additional={
              <h4 clas>Total Payable Amount : {ShowTotal && ShowTotal}</h4>
            }
          />
        </div>
      ),
    },

    // {
    //   size: 12,
    //   body: (
    //     <div>
    //       {/* {remainingWinnerData === 0 ? ( */}
    //         <div class="d-flex justify-content-end mb-3">
    //           <button
    //             className={`btn btn-dark  mx-2 ${
    //               BtnVisiably ? "d-none" : "d-block"
    //             }`}
    //             onClick={() => {
    //               handleChange("1");
    //             }}
    //           >
    //             Confirm Payment
    //           </button>
    //         </div>
    //       {/* ) : (
    //         ""
    //       )} */}
    //       <PagesIndex.TableWithCustomPeginationNew
    //         fetchData={fetchData}
    //         columns={visibleFields}
    //         // UserFullButtonList={UserFullButtonList}
    //         showIndex={true}
    //         Refresh={Refresh}
    //       />
    //     </div>
    //   ),
    // },
  ];

  return (
    <>
      <Split_Main_Containt
        title="Game Winners"
        add_button={false}
        cardLayouts={cardLayouts}
      />
      <ReusableModal
        // ModalTitle="ghghu"
        ModalState={ModalState}
        setModalState={setModalState}
        ModalBody={
          <div className="">
            <h1 className="confirm-payment-text">
              Are You Sure Want To Confirm Payment?
            </h1>
            <div className="d-flex justify-content-end">
              <button
                className={`btn btn-dark  mx-2 ${
                  BtnVisiably ? "d-none" : "d-block"
                }`}
                onClick={() => confirmPayment(1)}
              >
                Confirm
              </button>

              <button
                className={`btn btn-dark  mx-2 ${
                  !BtnVisiably ? "d-none" : "d-block"
                }`}
                disabled
              >
                Confirm
              </button>

              <button
                onClick={() => setModalState(false)}
                className="btn btn-dark  mx-2"
              >
                Close
              </button>
            </div>
          </div>
        }
      />
    </>
  );
};

export default WinnerList;
