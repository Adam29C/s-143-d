import React from "react";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
import { useFormik } from "formik";
import PagesIndex from "../../../Pages/PagesIndex";
import { Api } from "../../../Config/Api";
import { today } from "../../../Utils/Common_Date";
import { spArray, panaArray } from "./data";
import ReusableModal from "../../Modal/ModalComponent_main";
import { number } from "yup";

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
      providerId:
        gameType === "StarLine"
          ? "668d4382211a65d88600fa7e"
          : "620b5a5dab709c4b86fe704d",
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

        let CalcData = response1.data.data1;
        let mainData = response1.data.data2;
        // let mainData = response1.data.data2;

        let gamePrice = response1?.data?.type[0]?.gamePrice;
        let sumdigit = response1?.data?.data1[0]?.sumdigit;

        let result = {
          groupData: [],
          grandTotal: {},
          jodiData: [],
        };

        let TotalBid = 0;
        let TotalSum = 0;

        // const gamePrice = data.type[0].gamePrice;
        CalcData.forEach(function (e) {
          result.groupData.push({
            gameType: e.gameType,
            countBid: e.countBid,
            sumDigit: e.sumdigit,
          });
          TotalBid += e.countBid;
          TotalSum += e.sumdigit;
        });

        result.grandTotal = {
          label: "Grand Total",
          totalBid: TotalBid,
          totalSum: TotalSum,
        };

        let jodiArray = {};

        mainData.forEach(function (e) {
          let loss = 0;
          let profit = 0;
          let pl = e.sumdigit * gamePrice;
          if (pl > TotalSum) {
            loss = pl - TotalSum;
          } else {
            profit = TotalSum - pl;
          }

          jodiArray[e._id] = {
            digit: e._id,
            bidCount: `View Bids Info (${e.countBid})`,
            bidCount1: e.countBid,
            sumDigit: e.sumdigit,
            amountToPay: `${e.sumdigit} * ${gamePrice}`,
            amountToPayCal: `${e.sumdigit} * ${gamePrice} = ${parseInt(
              e.sumdigit * gamePrice
            )}`,
            profit: profit,
            loss: loss,
          };
        });

        panaArray.forEach(function (Digit) {
          let bidCount = "No Bids";
          let bidCount1 = 0;
          let amountToPay = 0;
          let sumDigit = 0;
          let profit = TotalSum;
          let amtToPayCal = 0;
          let loss = 0;

          if (jodiArray[Digit]) {
            bidCount = jodiArray[Digit].bidCount;
            bidCount1 = jodiArray[Digit].bidCount1;
            amountToPay = jodiArray[Digit].amountToPay;
            sumDigit = jodiArray[Digit].sumDigit;
            amtToPayCal = jodiArray[Digit].amountToPayCal;
            profit = jodiArray[Digit].profit;
            loss = jodiArray[Digit].loss;
          }

          result.jodiData.push({
            digit: Digit,
            bidCount: bidCount,
            bidCount1: bidCount1,
            sumDigit: sumDigit,
            amountToPay: amountToPay,
            amountToPayCal: amtToPayCal,
            profit: profit,
            loss: loss,
          });
        });
        setTableTwo(result.jodiData);
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

        let singleDigitB = totals[1]?.values;
        let panaB = totals[0]?.values;

        let singleDigitAm = totals[1]?.values1;
        let PanaProfit = totals[0]?.values1;

        // console.log("response1", response1);

        let MainData = response1?.data?.data2;
        let PanaData = response1?.data?.pana;

        MainData.sort(function (a, b) {
          return a._id - b._id;
        });

        let pannaArr = [];
        let singleArr = [];
        let allSingle = [
          { Digit: 0 },
          { Digit: 1 },
          { Digit: 2 },
          { Digit: 3 },
          { Digit: 4 },
          { Digit: 5 },
          { Digit: 6 },
          { Digit: 7 },
          { Digit: 8 },
          { Digit: 9 },
        ];

        // Process the data
        let singleDigitData = [];
        MainData.forEach(function (e) {
          let str = e._id;
          if (str.length === 1) {
            let total = 0;
            let loss = 0;
            let profit = 0;
            let pl = e.sumdigit * e.gamePrice;
            if (pl > singleDigitAm) {
              loss = pl - singleDigitAm;
            } else {
              profit = singleDigitAm - pl;
            }

            singleArr[e._id] = {
              digit: e._id,
              bidCount: e.countBid,
              sumDigit: e.sumdigit,
              amountToPay: pl,
              profit: profit,
              loss: loss,
            };
          } else {
            let total = 0;
            let loss = 0;
            let profit = 0;
            let pl = e.sumdigit * e.gamePrice;
            if (pl > PanaProfit) {
              loss = pl - PanaProfit;
            } else {
              profit = PanaProfit - pl;
            }

            pannaArr[e._id] = {
              digit: e._id,
              bidCount: e.countBid,
              sumDigit: e.sumdigit,
              amountToPay: pl,
              profit: profit,
              loss: loss,
            };
          }
        });

        // Prepare panna data
        let pannaData = [];
        PanaData.forEach(function (e) {
          let tabDigit = e.Digit;
          let bidCount = "No Bids";
          let amountToPay = 0;
          let SumDigit = 0;
          let profit = PanaProfit;
          let loss = 0;
          if (pannaArr[tabDigit]) {
            bidCount = pannaArr[tabDigit].bidCount;
            amountToPay = pannaArr[tabDigit].amountToPay;
            SumDigit = pannaArr[tabDigit].sumDigit;
            profit = pannaArr[tabDigit].profit;
            loss = pannaArr[tabDigit].loss;
          }
          pannaData.push({
            digit: tabDigit + "-" + e.DigitFamily,
            digitFamily: e.DigitFamily,
            bidCount: bidCount,
            sumDigit: SumDigit,
            amountToPay: amountToPay,
            profit: profit,
            loss: loss,
          });
        });

        // Prepare single digit data
        allSingle.forEach(function (e) {
          let tabDigit = e.Digit;
          let bidCount = "No Bids";
          let amountToPay = 0;
          let SumDigit = 0;
          let profit = singleDigitAm;
          let loss = 0;
          if (singleArr[tabDigit]) {
            bidCount = singleArr[tabDigit].bidCount;
            amountToPay = singleArr[tabDigit].amountToPay;
            SumDigit = singleArr[tabDigit].sumDigit;
            profit = singleArr[tabDigit].profit;
            loss = singleArr[tabDigit].loss;
          }
          singleDigitData.push({
            digit: tabDigit,
            bidCount: bidCount,
            sumDigit: SumDigit,
            amountToPay: amountToPay,
            profit: profit,
            loss: loss,
          });
        });

        singleDigitData.sort(function (a, b) {
          return a.digit - b.digit;
        });

        pannaData.sort((a, b) => a.digit.localeCompare(b.digit));

        setTableTwo(singleDigitData);
        setTableThree(pannaData);
        // Output JSON

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
      value: "digit",
      sortable: true,
    },
    {
      name: "Bid Count",
      value: "countBid",
      sortable: true,
      transform: (item, row) => {
        return `${
          typeof row.bidCount === "number"
            ? `View Bids Info (${row.bidCount})`
            : row.bidCount
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

  const visibleFields1 = [
    {
      name: "Digit",
      value: "digit",
      sortable: true,
    },
    {
      name: "Bid Count",
      value: "countBid",
      sortable: true,
      // style: (row) => ({
      //   background: ,
      // }),
      transform: (item, row) => {
        return `${
          typeof row.bidCount === "number"
            ? `View Bids Info (${row.bidCount})`
            : row.bidCount
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
      name: "Amount To Pay Calculate",
      value: "amountToPayCal",
      style: (row) => ({
        display: gameType === "JackPot" ? "block" : "none",
      }),
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
    // return;

    const payload = {
      date: formik.values.gameDate || today(new Date()),
      bidDigit: rowdata.digit,
      id: formik.values.providerId,
      limit: UserPagenateData.limit,
      page: UserPagenateData.pageno,
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
            initialRowsPerPage={50}
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
        title={"Transaction History"}
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
