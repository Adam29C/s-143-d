// import React, { useEffect, useState } from "react";
// import PagesIndex from "../../../Pages/PagesIndex";
// import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
// import ReusableModal from "../../../Helpers/Modal/ReusableModal";
// // import {Confirm_box} from "../../Confirm_Box";

// const WinnerList = () => {
//   //get token in localstorage
//   const token = localStorage.getItem("token");
//   const { user_id } = JSON.parse(localStorage.getItem("userdetails"));

//   //get previous page single game result data
//   const location = PagesIndex.useLocation();

//   console.log("location", location);

//   //data destructure
//   const data = location.state.row;
//   const api_Route = location.state.route;
//   const gameType = location.state.gameType;
//   const distribute_fund_Api = location.state.distribute_fund;

//   console.log("data", data);

//   //all state
//   const [remainingWinnerData, setRemainingWinnerData] = PagesIndex.useState([]);
//   const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
//   const [mainWinnerData, setMainWinnerData] = PagesIndex.useState([]);
//   const [ModalState, setModalState] = useState(false);

//   //get game winner list api
//   const getGameWinnerListApi = async () => {
//     // winnerlist
//     // digit, provider, date, resultId, resultStatus, digitFamily

//     // providerId, windigit, gameDate, digitFamily, resultId, adminId

//     const apidata = {
//       digit: data.winningDigit,
//       provider: data.providerId,
//       date: data.resultDate,
//       resultId: data._id,
//       resultStatus: data.status,
//       digitFamily: data.winningDigitFamily,
//     };

//     try {
//       const res = await PagesIndex.game_service.ALL_GAME_WINNER_LIST_API(
//         api_Route,
//         apidata,
//         token
//       );

//       //   const res = await PagesIndex.admin_services.GAME_MAIN_WINNER_LIST_API(
//       //     apidata1,
//       //     token
//       //   );
//       //   const res1 =
//       //     await PagesIndex.admin_services.GAME_REMAINING_WINNER_LIST_API(
//       //       apidata,
//       //       token
//       //     );

//       if (res.status) {
//         setMainWinnerData(res?.data?.winnerList);
//       }
//       //   if (res1.status) {
//       //     setRemainingWinnerData(res1?.data?.winnerList["Single Digit"]);
//       //   }
//     } catch (error) {}
//   };

//   useEffect(() => {
//     getGameWinnerListApi();
//   }, []);

//   const visibleFields = [
//     "id",
//     "userName",
//     "mobileNumber",
//     "gameTypeName",
//     "gameDate",
//     "bidDigit",
//     "biddingPoints",
//     "gameTypePrice",
//     "gameWinPoints",
//   ];

//   const visibleFields1 = [
//     "id",
//     "userName",
//     "mobileNumber",
//     "gameTypeName",
//     "gameDate",
//     "bidDigit",
//     "biddingPoints",
//     "gameTypePrice",
//     "gameWinPoints",
//   ];

//   const UserFullButtonList = [];

//   // ----------------  ------------------

//   const ConfirmPayment = async (row) => {
//     const apidata = {
//       //   resultId: row?._id,
//       //   providerId: row?.providerId,
//       //   session: row?.session,

//       windigit: data.winningDigit,
//       providerId: data.providerId,
//       gameDate: data.resultDate,
//       resultId: data._id,
//       resultStatus: String(data.status),
//       digitFamily: String(data.winningDigitFamily),
//       adminId: user_id,
//     };

//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this game?"
//     );
//     if (!confirmDelete) return;

//     return;
//     const res =
//       await PagesIndex.game_service.STARLINE_GAME_DISTIBUTE_FUND_WINNERS_API(
//         api_Route,
//         distribute_fund_Api,
//         token
//       );

//     try {
//       if (res.statusCode === 200) {
//         alert(res?.message);
//         getGameResultApi;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const cardLayouts = [
//     {
//       size: 12,
//       visiblity: "show",

//       body: (
//         <div>
//           <h4 className="winner-list-text-main">
//             Game Winners Of Date : {data?.resultDate}, Provider :{" "}
//             {data?.providerName}, Session : {data.session}, Digit :{" "}
//             {data?.winningDigit}-{data?.winningDigitFamily}
//           </h4>
//         </div>
//       ),
//     },

//     {
//       size: 12,
//       visiblity: "show",
//       body: (
//         <div>
//           <PagesIndex.TableWithCustomPeginationButton
//             data={mainWinnerData}
//             initialRowsPerPage={5}
//             SearchInTable={SearchInTable}
//             visibleFields={visibleFields}
//             UserFullButtonList={UserFullButtonList}
//             confirm_button={
//               <>
//                 {/* <Confirm_box
//                   title="Are you sure you want to delete this file?1212"
//                   text="This action cannot be undone."
//                   icon="warning"
//                   confirmButtonText="Yes, delete it!"
//                   cancelButtonText="No, cancel!"
//                   Buttontitle="Confirm"
//                   onConfirm={ConfirmPayment}
//                 /> */}

//                 <button
//                   className="btn btn-primary"
//                   onClick={() => ConfirmPayment()}
//                 >
//                   confirm121
//                 </button>
//               </>
//             }
//             searchInput={
//               <>
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={SearchInTable}
//                   onChange={(e) => setSearchInTable(e.target.value)}
//                   className="form-control ms-auto"
//                 />
//               </>
//             }
//           />
//         </div>
//       ),
//     },

//     {
//       size: 12,
//       visiblity:
//         gameType === "StarLine" || gameType === "StarLine" ? "hide" : "show",
//       body: (
//         <div>
//           <div class="d-flex justify-content-end mb-3">
//             <button
//               onClick={() => setModalState(true)}
//               className="btn btn-dark"
//             >
//               Confirm Payment
//             </button>
//           </div>

//           <PagesIndex.TableWithCustomPeginationButton
//             data={remainingWinnerData}
//             initialRowsPerPage={5}
//             SearchInTable={SearchInTable}
//             visibleFields={visibleFields1}
//             UserFullButtonList={UserFullButtonList}
//             searchInput={
//               <>
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={SearchInTable}
//                   onChange={(e) => setSearchInTable(e.target.value)}
//                   className="form-control ms-auto"
//                 />
//               </>
//             }
//           />
//         </div>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Split_Main_Containt
//         title="Game Winners"
//         add_button={false}
//         cardLayouts={cardLayouts}
//       />

//       <ReusableModal
//         // ModalTitle="ghghu"
//         ModalState={ModalState}
//         setModalState={setModalState}
//         ModalBody={
//           <div className="">
//             <h1 className="confirm-payment-text">
//               Are You Sure Want To Confirm Payment?
//             </h1>
//             <div className="d-flex justify-content-end">
//               <button className="btn btn-dark  mx-2">Confirm</button>
//               <button
//                 onClick={() => setModalState(false)}
//                 className="btn btn-dark  mx-2"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         }
//       />
//     </>
//   );
// };

// export default WinnerList;

import React, { useEffect, useState } from "react";
import PagesIndex from "../../../Pages/PagesIndex";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
import ReusableModal from "../../../Helpers/Modal/ReusableModal";
import { Api } from "../../../Config/Api";
import { Navigate, useNavigate } from "react-router-dom";
import { today } from "../../../Utils/Common_Date";

const WinnerList = () => {
  // console.log("today", today);

  //get token in localstorage
  const token = localStorage.getItem("token");
  const { user_id } = JSON.parse(localStorage.getItem("userdetails"));
  const navigate = useNavigate();
  //get previous page single game result data
  const location = PagesIndex.useLocation();
  //data destructure
  const data = location.state?.rowdata || location.state.row;

  const api_Route = location.state.route;
  const gameType = location.state.gameType;
  const distribute_fund_Api = location.state.distribute_fund;

  //all state
  const [remainingWinnerData, setRemainingWinnerData] = PagesIndex.useState([]);
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [getStatus, setGetStatus] = PagesIndex.useState("0");
  const [ModalState, setModalState] = useState(false);
  const [Refresh, setRefresh] = PagesIndex.useState(false);
  const [GetResultStatus, setGetResultStatus] = PagesIndex.useState([]);
  const [JackportData, setJackportData] = PagesIndex.useState("");
  const [ShowTotal, setShowTotal] = PagesIndex.useState(0);

  const [BtnVisiably, setBtnVisiably] = PagesIndex.useState(false);

  const handleChange = (state) => {
    setGetStatus(state);
    setModalState(true);
  };
  const fetchData = async (page, rowsPerPage, searchQuery) => {
    return;
    if (gameType != "StarLine" || gameType != "JackPot") {
      const apidata = {
        providerId: data?.providerId,
        date: data?.resultDate,
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
          setRemainingWinnerData(mainRes.length);
          return { mainRes, totalRows };
        }
      } catch {}
    }
  };

  const fetchData1 = async (page, rowsPerPage, searchQuery) => {
    try {
      let res = "";
      if (gameType === "StarLine" || gameType === "JackPot") {
        const payload = {
          digit: data?.winningDigit,
          provider: data?.providerId,
          date: data?.resultDate,
          resultId: data?._id,
          resultStatus: String(data?.status),
          digitFamily: String(data?.winningDigitFamily),
        };

        res = await PagesIndex.game_service.ALL_GAME_WINNER_LIST_API(
          api_Route,
          payload,
          token
        );
      } else {
        const apidata1 = {
          digit: data?.winningDigit,
          provider: data?.providerId,
          gamedate: data?.resultDate,
          resultId: data?._id,
          resultStatus: String(data?.status),
          digitFamily: String(data?.winningDigitFamily),
          sessionType: data?.session,
          providerName: data?.providerName,
          page: page,
          limit: rowsPerPage,
          search: searchQuery,
        };

        res = await PagesIndex.admin_services.GAME_MAIN_WINNER_LIST_API(
          apidata1,
          token
        );
      }

      if (res.status) {
        setGetResultStatus(res.data || res.data.dispData);
        setJackportData(res.data.dispData);

        // setShowTotal;

        let total = 0;
        res.data.winnerList.forEach((item) => {
          total += item.biddingPoints * item.gameTypePrice;
        });

        setShowTotal(total);

        const nonEmptyCategories = [];

        const totalRows =
          res?.data?.pagination?.totalItems ??
          res?.pagination?.totalCount ??
          res?.totalCount ??
          5;
        let mainRes = [];

        mainRes =
          gameType === "StarLine"
            ? (mainRes = res?.data?.winnerList)
            : gameType === "JackPot"
            ? res.resultData
            : nonEmptyCategories;

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
      name: "Rate",
      value: "gameTypePrice",
      sortable: false,
    },
    {
      name: "Bidding Amount",
      value: "biddingPoints",
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
      providerId: GetResultStatus?.provider,
      windigit: GetResultStatus?.winDigit,
      gameDate: GetResultStatus.gameDate,
      digitFamily: String(GetResultStatus?.digitFamily),
      session: GetResultStatus?.session,
      jodiDigit: GetResultStatus?.jodiDigit,
      halfSangam1: GetResultStatus?.halfSangam2,
      halfSangam2: GetResultStatus?.halfSangam1,
      fullSangam: GetResultStatus?.fullSangam,
      resultId: GetResultStatus?.resultId,
      adminId: user_id,
      reqType: gameType,
      page: 1,
      limit: 10,
    };

    let res = "";

    if (getStatus && getStatus === "0") {
      if (gameType === "StarLine" || gameType === "JackPot") {
        let payload;
        if (gameType === "StarLine") {
          payload = {
            providerId: GetResultStatus?.provider,
            windigit: GetResultStatus?.winDigit,
            gameDate: GetResultStatus?.gameDate,
            digitFamily: String(GetResultStatus?.digitFamily),
            resultId: GetResultStatus?.resultId,
          };
        } else if (gameType === "JackPot") {
          payload = {
            digitFamily: String(GetResultStatus?.digitFamily),
            providerId: GetResultStatus?.dispData?._id,
            windigit: data?.winningDigit,
            gameDate: data?.resultDate,
            gamePrice: GetResultStatus?.gametype?.[0]?.gamePrice,
            resultId: GetResultStatus?.resultId,
          };
        }

        res =
          await PagesIndex.game_service.STARLINE_GAME_DISTIBUTE_FUND_WINNERS_API(
            distribute_fund_Api,
            payload,
            token
          );
      } else {
        res =
          await PagesIndex.game_service.STARLINE_GAME_DISTIBUTE_FUND_WINNERS_API(
            Api.CONFIRM_PAYMENT_API,
            payload,
            token
          );
      }
    } else {
      res =
        await PagesIndex.game_service.STARLINE_GAME_DISTIBUTE_FUND_WINNERS_API(
          Api.REMENAINING_CONFIRM_PAYMENT_API,
          payload,
          token
        );
    }

    if (res.status) {
      setBtnVisiably(false);
      PagesIndex.toast.success(res.message);

      gameType === "StarLine"
        ? navigate("/admin/starline/results")
        : gameType === "JackPot"
        ? navigate("/admin/jackpot/results")
        : navigate("/admin/game/results");
      // navigate("/admin/game/results");
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

    {
      size: 12,
      visiblity:
        gameType === "StarLine" || gameType === "JackPot" ? true : false,

      body: (
        <div>
          {remainingWinnerData === 0 ? (
            <div class="d-flex justify-content-end mb-3">
              <button
                className={`btn btn-dark  mx-2 ${
                  BtnVisiably ? "d-none" : "d-block"
                }`}
                onClick={() => {
                  handleChange("1");
                }}
              >
                Confirm Payment
              </button>
            </div>
          ) : (
            ""
          )}
          <PagesIndex.TableWithCustomPeginationNew
            fetchData={fetchData}
            columns={visibleFields}
            showIndex={true}
            Refresh={Refresh}
          />
        </div>
      ),
    },
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
