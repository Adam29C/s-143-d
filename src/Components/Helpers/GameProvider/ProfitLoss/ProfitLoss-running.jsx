import React from "react";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
import { useFormik } from "formik";
import PagesIndex from "../../../Pages/PagesIndex";
import { Api } from "../../../Config/Api";
import { today } from "../../../Utils/Common_Date";
import { spArray } from "./data";
import ReusableModal from "../../Modal/ModalComponent_main";

const SplitForm = ({
  providersList,
  getProfiLoss,
  getBidData,
  gameType,
  title,
}) => {
  // StarLine

  // JackPot
  const token = localStorage.getItem("token");

  const [GetTotal, setGetTotal] = PagesIndex.useState([]);

  const [TableTwo, setTableTwo] = PagesIndex.useState([]);
  const [TableThree, setTableThree] = PagesIndex.useState([]);
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [GetProviders, setGetProviders] = PagesIndex.useState([]);
  const [ShowBidInfoModal, setShowBidInfoModal] = PagesIndex.useState(false);
  const [ShowBidInfoList, setShowBidInfoList] = PagesIndex.useState([]);
  const [UserPagenateData, setUserPagenateData] = PagesIndex.useState({
    pageno: 1,
    limit: 100,
  });

  const [Refresh, setRefresh] = PagesIndex.useState(false);
  const [TotalPages, setTotalPages] = PagesIndex.useState(1);

  // console.log("GetProviders && GetProviders[0]._id" ,GetProviders && GetProviders[0]._id);
  console.log(
    "GetProviders && GetProviders[0]._id",
    GetProviders[0] && GetProviders[0]._id
  );

  const getProviders = async () => {
    const response1 =
      await PagesIndex.game_service.STARLINE_AND_JACKPOT_GAME_PROVIDERS_LIST_API(
        providersList,
        token
      );

    if (response1.status) {
      setGetProviders(response1.data);
    }
  };
  PagesIndex.useEffect(() => {
    getProviders();
  }, []);

  const formik = useFormik({
    initialValues: {
      gameDate: "",
      // gameSession: "",
      // providerId: GetProviders[0] && GetProviders[0]._id,
      providerId: "668d4382211a65d88600fa7e" || "620b5a5dab709c4b86fe704d",
    },

    validate: (values) => {
      const errors = {};

      // if (!values.gameSession) {
      //   errors.gameSession = "Please Select Game Session";
      // }

      if (!values.providerId) {
        errors.providerId = "Please Select Provider";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const payload = {
        date: values.gameDate || today(new Date()),
        // // session: values.gameSession,
        provider: values.providerId,
        // {
        // provider: "668d4382211a65d88600fa7e",
        // date: "12/19/2024",
        // }
      };

      let pannaArr = [];
      const singleArr = [];

      // if (values.gameSession === "Open") {
      const response1 = await PagesIndex.report_service.ALL_GAME_REPORT_API(
        getProfiLoss,
        payload,
        token
      );

      if (gameType === "JackPot") {
        setGetTotal(response1.data.data1);
        let gamePrice = response1.data.type[0].gamePrice;
        let sumdigit = response1.data.data1[0].sumdigit;

        response1.data.data2.forEach(function (e) {
          let str = e._id;

          let loss = 0;
          let profit = 0;
          let pl = e.sumdigit * gamePrice;

          if (pl > sumdigit) {
            // loss
            loss = pl - sumdigit;
          } else {
            // profit
            profit = sumdigit - pl;
          }

          singleArr.push({
            _id: e._id,
            digit: e._id,
            bidCount: e.countBid,
            sumDigit: e.sumdigit,
            amountToPay: pl,
            Profit: profit,
            Loss: loss,
          });
        });

        singleArr.sort(function (a, b) {
          return a._id - b._id;
        });

        setTableTwo(singleArr);
      }

      if (response1.status) {
        let panaTotal = 0;
        let panaBidDigit = 0;
        let singleDigitTotal = 0;
        let singleDigitBidDigit = 0;

        response1.data.data1.forEach((item) => {
          if (item.gameTypeName.includes("Pana")) {
            panaTotal += item.countBid;
            panaBidDigit += parseInt(item.sumdigit);
          } else if (item.gameTypeName === "Single Digit") {
            singleDigitTotal += item.countBid;
            singleDigitBidDigit += parseInt(item.sumdigit);
          }
        });

        // Calculate grand total
        const grandTotal = panaTotal + singleDigitTotal;
        const grandTotalBid = panaBidDigit + singleDigitBidDigit;

        // console.log("panaTotal", panaTotal);

        // Create totals array
        const totals = [
          { name: "Pana", values: panaTotal, values1: panaBidDigit },
          {
            name: "Single Digit",
            values: singleDigitTotal,
            values1: singleDigitBidDigit,
          },
          { name: "Grand Total", values: grandTotal, values1: grandTotalBid },
        ];

        setGetTotal(totals);

        let singleDigitB = totals[1].values;
        let panaB = totals[0].values;

        let singleDigitAm = totals[1].values1;
        let panaAm = totals[0].values1;

        let pannaArr = [];
        let singleArr = [];

        let resultArray = [];

        let abaac = response1.data.data2;
        let PanaData = response1.data.pana;

        abaac.sort(function (a, b) {
          return a._id - b._id;
        });

        abaac.forEach(function (e) {
          let str = e._id;

          if (str.length === 1) {
            let total = 0;
            let loss = 0;
            let profit = 0;
            let pl = e.sumdigit * e.gamePrice;

            if (pl > singleDigitAm) {
              // loss
              loss = pl - singleDigitAm;
            } else {
              // profit
              profit = singleDigitAm - pl;
            }

            // Pushing the data into the singleArr array
            singleArr.push({
              _id: e._id,
              bidCount: e.countBid,
              sumDigit: e.sumdigit,
              amountToPay: pl,
              profit: profit,
              loss: loss,
            });

            let id_array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

            // console.log("singleArr" ,singleArr);

            let result = id_array.map((id) => {
              let match = singleArr.find((item) => item._id === id);
              return match
                ? match
                : {
                    _id: id,
                    bidCount: "No Bids",
                    sumDigit: 0,
                    amountToPay: 0,
                    profit: singleDigitAm,
                    loss: 0,
                  };
            });
            console.log("singleArr", singleArr);
            setTableTwo(result);

            console.log("result", result);
          } else {
            let total = 0;
            let loss = 0;
            let profit = 0;
            let pl = e.sumdigit * e.gamePrice;

            if (pl > panaAm) {
              // loss
              loss = pl - panaAm;
            } else {
              // profit
              profit = panaAm - pl;
            }

            pannaArr.push({
              digit: e._id,
              bidCount: e.countBid,
              sumDigit: e.sumdigit,
              amountToPay: pl,
              profit: profit,
              loss: loss,
            });
          }
        });

        pannaArr.sort(function (a, b) {
          return a.digit - b.digit;
        });

        // let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

        // Object.keys(spArray).forEach((digit, index) => {
        //   const arrayValue = array[index % array.length];
        //   const match = pannaArr.find((item) => item.digit === digit);

        //   if (match) {
        //     match._id = `${digit}-${arrayValue}`;
        //     resultArray.push(match);
        //   } else {
        //     resultArray.push({
        //       _id: digit + "-" + arrayValue,
        //       digit: digit,
        //       bidCount: 0,
        //       sumDigit: 0,
        //       amountToPay: 0,
        //       Profit: panaAm,
        //       loss: 0,
        //     });
        //   }
        // });

        // setTableThree(resultArray);

        let id_array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

        let result = id_array.map((id) => {
          let match = singleArr.find((item) => item._id === id);
          return match
            ? match
            : {
                _id: id,
                bidCount: "No Bids",
                sumDigit: 0,
                amountToPay: 0,
                profit: singleDigitAm,
                loss: 0,
              };
        });
        setTableTwo(result);

        PanaData.forEach(function (e) {
          let tabDigit = e.Digit;
          let bidCount = "No Bids";
          let amountToPay = 0;
          let SumDigit = 0;
          let profit = panaAm;
          let loss = 0;
          // console.log("PanaData", pannaArr);

          if (pannaArr[tabDigit]) {
            bidCount = pannaArr[tabDigit].bidCount;
            amountToPay = pannaArr[tabDigit].amountToPay;
            SumDigit = pannaArr[tabDigit].sumDigit;
            profit = pannaArr[tabDigit].profit;
            loss = pannaArr[tabDigit].Loss;
          } else {
            bidCount = "No Bids";
            amountToPay = 0;
            SumDigit = 0;
            profit = panaAm;
            loss = 0;
          }
        });

        console.log("PanaData", pannaArr);

        // setTableThree(resultArray);

        return;
      } else {
        PagesIndex.toast.error(response1.message);
      }
    },
  });

  const fields = [
    {
      name: "gameDate",
      label: "Start Date",
      type: "date",
      label_size: 12,
      col_size: 4,
    },
    {
      name: "providerId",
      label: "Provider",
      type: "select",
      label_size: 12,

      col_size: 8,
      options:
        (GetProviders &&
          GetProviders.map((item) => ({
            label: item.providerName,
            value: item._id,
          }))) ||
        [],
    },
    // {
    //   name: "gameSession",
    //   label: "Session",
    //   type: "select",
    //   label_size: 12,

    //   col_size: 4,
    //   options: [
    //     {
    //       label: "Open",
    //       value: "Open",
    //     },
    //     {
    //       label: "Close",
    //       value: "Close",
    //     },
    //   ],
    // },
  ];

  const visibleFields = [
    {
      name: "Digit",
      value: "_id",
      sortable: true,
    },
    {
      name: "countBid",
      value: "countBid",
      sortable: true,
      transform: (item, row) => {
        return `${
          parseInt(row.bidCount) > 0
            ? `View Bids Info (${row.bidCount})`
            : "No Bids"
        }`;
      },
      onClick: (row) => {
        showBidInfor(row);
      },
    },

    {
      name: "Total Bid Count",
      value: "sumDigit",
      sortable: true,
    },
    {
      name: "Amount To Pay",
      value: "amountToPay",
      sortable: true,
    },
    {
      name: "Profit",
      value: "Profit",
      notheader: true,

      sortable: true,
      style: (row) => ({
        color: "green",
        fontWeight: "bold",
      }),
    },
    {
      name: "loss",
      value: "loss",
      sortable: true,
      notheader: true,
      style: (row) => ({
        color: "red",
        fontWeight: "bold",
      }),
    },
  ];

  const visibleFields1 = [
    {
      name: "Digit",
      value: "_id",
      sortable: true,
    },
    {
      name: "countBid",
      value: "countBid",
      sortable: true,
      transform: (item, row) => {
        return `View Bids Info (${row.bidCount})`;
      },
      onClick: (row) => {
        showBidInfor(row);
      },
    },

    {
      name: "Total Bid Count",
      value: "sumDigit",
      sortable: true,
    },
    {
      name: "Amount To Pay",
      value: "amountToPay",
      sortable: true,
    },
    {
      name: "Profit",
      value: "profit",
      notheader: true,

      sortable: true,
      style: (row) => ({
        color: "green",
        fontWeight: "bold",
      }),
    },
    {
      name: "loss",
      value: "loss",
      sortable: true,
      notheader: true,
      style: (row) => ({
        color: "red",
        fontWeight: "bold",
      }),
    },
  ];

  const visibleFields2 = [
    {
      name: "User Name",
      value: "userName",
      sortable: true,
    },
    {
      name: "Bracket",
      value: "bidDigit",
      sortable: true,
    },
    {
      name: "Amount",
      value: "biddingPoints",
      sortable: false,
    },
    {
      name: "win Status",
      value: "winStatus",
      sortable: true,
      transform: (item, row) => {
        return item === 1 ? "Win" : item === 2 ? "Loss" : "Pending";
      },
    },
    {
      name: "Played Time",
      value: "createdAt",
      sortable: true,
    },
  ];

  const showBidInfor = async (rowdata) => {
    const payload = {
      date: formik.values.gameDate || today(new Date()),
      id: formik.values.providerId,
      // bidDigit: rowdata.digit,
      bidDigit: rowdata._id,
      gameSession: rowdata?.session,
      page: UserPagenateData.pageno,
      // limit: UserPagenateData.limit,
      limit: rowdata.bidCount,
      search: SearchInTable,
    };
    const response1 = await PagesIndex.report_service.ALL_GAME_REPORT_API(
      getBidData,
      payload,
      token
    );

    if (response1.status) {
      setShowBidInfoModal(true);
    }
    setTotalPages(
      response1?.pagination?.totalItems || response1?.pagination?.totalItems
    );
    setShowBidInfoList(response1.bidData || response1.data);
    setRefresh(!Refresh);
  };

  const cardLayouts = [
    {
      size: 7,
      body: (
        <div>
          <PagesIndex.Formikform
            fieldtype={fields.filter((field) => !field.showWhen)}
            show_submit={true}
            formik={formik}
            btn_name="Submit"
          />
        </div>
      ),
    },
    {
      size: 5,
      body: (
        <div>
          <div className="table-responsive ">
            <table className="table  ">
              <thead className="primary-color">
                <tr>
                  <th>Type</th>
                  <th>Bids</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody id="groupData">
                {GetTotal &&
                  GetTotal.map((item, index) => {
                    const isLastItem = index === GetTotal.length - 1;
                    return (
                      <tr className={isLastItem ? "fw-bold" : ""}>
                        <td>{item.name || item.gameType || 0}</td>
                        <td>{item.values1 || item.countBid || 0}</td>
                        <td>{item.values || item.sumdigit || 0}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      size: 12,
      body: (
        <div>
          <PagesIndex.TableWithCustomPeginationNew123
            data={TableTwo && TableTwo}
            initialRowsPerPage={25}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields1}
            // UserFullButtonList={UserFullButtonList}
            // searchInput={
            //   <input
            //     type="text"
            //     placeholder="Search..."
            //     value={SearchInTable}
            //     onChange={(e) => setSearchInTable(e.target.value)}
            //     className="form-control ms-auto"
            //   />
            // }
          />
        </div>
      ),
    },
    {
      size: 12,

      visiblity: gameType === "JackPot" ? true : false,
      //   formik.values.gameSession === "Open" ||
      //   formik.values.gameSession === "Close",

      body: (
        // formik.values.gameSession === "Open" ||
        // formik.values.gameSession === "Close" ? (
        <div>
          <PagesIndex.TableWithCustomPeginationNew123
            data={(TableThree && TableThree) || []}
            // data={TableTwo && TableTwo}
            initialRowsPerPage={100}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields}
          />
        </div>
      ),
      // ) : null,
    },
  ];

  return (
    <div>
      <Split_Main_Containt
        title={title}
        add_button={false}
        btnTitle="Add"
        route="/add"
        cardLayouts={cardLayouts}
      />

      <ReusableModal
        show={ShowBidInfoModal}
        onClose={setShowBidInfoModal}
        title={"Bid History"}
        size={"lg"}
        body={
          <>
            <PagesIndex.TableWithCustomPeginationNew
              tableData={ShowBidInfoList && ShowBidInfoList}
              TotalPagesCount={TotalPages && TotalPages}
              columns={visibleFields2}
              showIndex={true}
              Refresh={Refresh}
              setUserPagenateData={setUserPagenateData}
            />
          </>
        }
        primaryButtonText="Save Changes"
        secondaryButtonText="Close"
        showFooter={false}
      />
      <PagesIndex.Toast />
    </div>
  );
};

export default SplitForm;
