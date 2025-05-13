import React from "react";
import Split_Main_Containt from "../../Layout/Main/Split_Main_Content";
import { useFormik } from "formik";
import PagesIndex from "../../Pages/PagesIndex";
import { Games_Provider_List  ,Games_Provider_List1} from "../../Redux/slice/CommonSlice";
import { Api } from "../../Config/Api";
import { today } from "../../Utils/Common_Date";
import ReusableModal from "../Modal/ModalComponent_main";
import { set } from "date-fns";

const SplitForm = () => {
  const token = localStorage.getItem("token");
  const dispatch = PagesIndex.useDispatch();
  const [UserPagenateData, setUserPagenateData] = PagesIndex.useState({
    pageno: 1,
    limit: 10,
  });

  const [TotalPages, setTotalPages] = PagesIndex.useState(1);
  const [TableOne, setTableOne] = PagesIndex.useState([]);
  const [TableTwo, setTableTwo] = PagesIndex.useState([]);
  const [TableThree, setTableThree] = PagesIndex.useState([]);
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [ShowBidInfoModal, setShowBidInfoModal] = PagesIndex.useState(false);
  const [ShowBidInfoList, setShowBidInfoList] = PagesIndex.useState([]);
  const [Refresh, setRefresh] = PagesIndex.useState(false);
  const { gameProviders1 } = PagesIndex.useSelector(
    (state) => state.CommonSlice
  );

  PagesIndex.useEffect(() => {
    dispatch(Games_Provider_List1(token));
  }, []);

  const calculatePL = (sumDigit, gamePrice, threshold) => {
    const pl = sumDigit * gamePrice;
    const profit = pl > threshold ? 0 : threshold - pl;
    const loss = pl > threshold ? pl - threshold : 0;

    return { amountToPay: pl, profit, loss };
  };

  const formik = useFormik({
    initialValues: {
      gameDate: "",
      gameSession: "Open",
      providerId: "67eebd2fa361832d96e37e7d",
    },

    validate: (values) => {
      const errors = {};

      if (!values.gameSession) {
        errors.gameSession = "Please Select Game Session";
      }

      if (!values.providerId) {
        errors.providerId = "Please Select Provider";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const payload = {
        gameDate: values.gameDate || today(new Date()),
        gameSession: values.gameSession,
        providerId: values.providerId,
      };

      if (values.gameSession === "Open" || values.gameSession === "Close") {
        const response1 = await PagesIndex.report_service.ALL_GAME_REPORT_API(
          Api.CUTTING_GROUP_OC_LIST,
          payload,
          token
        );

        if (!response1.status) {
          PagesIndex.toast.error(response1.message);
          return;
        }

        // ----------------------

        // Reduce logic for grouping
        const result = response1.data.data1.reduce(
          (acc, item) => {
            if (item.bidDigit.length === 3) {
              // Combine all "Pana" type
              acc.pana.totalBids += item.countBid;
              acc.pana.totalSumDigit += item.sumdigit;
            } else if (item.bidDigit.length === 1) {
              // Combine all "Single Digit" type
              acc.singleDigit.totalBids += item.countBid;
              acc.singleDigit.totalSumDigit += item.sumdigit;
            }
            return acc;
          },
          {
            pana: { gameType: "Pana", totalBids: 0, totalSumDigit: 0 },
            singleDigit: {
              gameType: "Single Digit",
              totalBids: 0,
              totalSumDigit: 0,
            },
          }
        );
        const totalArray = Object.values(result);

        // Calculate grand total
        const grandTotal = {
          gameType: "Grand Total",
          totalBids: totalArray.reduce((sum, item) => sum + item.totalBids, 0),
          totalSumDigit: totalArray.reduce(
            (sum, item) => sum + item.totalSumDigit,
            0
          ),
        };

        const Finalresult = {
          originalData: totalArray,
          totals: grandTotal,
        };

        setTableOne(Finalresult);

        const pannaArr = [];
        const singleArr = [];

        let singleDigit = result.singleDigit.totalSumDigit;
        let pana = result.pana.totalSumDigit;

        response1.data.data2.map((e) => {
          const {
            _id,
            countBid = 0,
            sumdigit = 0,
            gameSession,
            gamePrice,
          } = e || {}; // Default values
          const isSingleDigit = _id && _id.length === 1;
          const threshold = isSingleDigit ? singleDigit : pana;

          const {
            amountToPay = 0,
            profit = 0,
            loss = 0,
          } = _id
            ? calculatePL(sumdigit, gamePrice, threshold)
            : { amountToPay: 0, profit: 0, loss: 0 };

          const result = {
            _id: _id,
            countBid: countBid,
            totalBidAmm: sumdigit,
            session: gameSession,
            Amounttopay: amountToPay,
            Profit: profit,
            Loss: loss,
          };

          if (isSingleDigit) {
            singleArr[_id] = result;
          } else {
            pannaArr[_id] = result;
          }
        });

        let id_array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

        let finalResult = id_array.map((item) => {
          if (singleArr[item]) {
            return singleArr[item];
          } else {
            return {
              _id: item,
              countBid: 0,
              totalBidAmm: 0,
              session: "Nill",
              Amounttopay: 0,
              Profit: singleDigit,
              Loss: 0,
            };
          }
        });

        setTableTwo(finalResult);

        let array3 = [];

        response1.data.pana.map((panaItem, index) => {
          const match = pannaArr.find((item) => {
            if (item !== undefined) {
              return parseInt(item._id) === parseInt(panaItem.Digit);
            }
            return;
          });

          if (match) {
            array3.push({
              ...match,
              digit_id: panaItem.Digit + "-" + panaItem.DigitFamily,
              index: index + 1,
            });
          } else {
            array3.push({
              index: index + 1,
              digit_id: panaItem.Digit + "-" + panaItem.DigitFamily,
              countBid: 0,
              totalBidAmm: 0,
              session: "Nill",
              Amounttopay: 0,
              SumDigit: 0,
              Profit: pana,
              Loss: 0,
            });
          }
        });

        array3.sort((a, b) => {
          const idA = a.digit_id.split("-")[0];
          const idB = b.digit_id.split("-")[0];
          return idA - idB;
        });

        setTableThree(array3);
      } else {
        const response = await PagesIndex.report_service.ALL_GAME_REPORT_API(
          Api.CUTTING_GROUP_LIST,
          payload,
          token
        );

        if (!response.satus) {
          PagesIndex.toast.error(response.message);
          return;
        }

        const total = response.data.data1.reduce(
          (acc, { sumdigit, countBid }) => {
            acc.totalSumDigit += sumdigit;
            acc.totalBids += countBid;
            return acc;
          },
          { totalSumDigit: 0, totalBids: 0 }
        );

        const result = {
          originalData: response.data.data1,
          totals: {
            totalSumDigit: total.totalSumDigit,
            totalBids: total.totalBids,
          },
        };

        setTableOne(result);

        let jodiArray = [];

        let totalSum = result.totals.totalSumDigit;
        let Profit = 0;
        let Loss = 0;
        response.data.data2.map((items, index) => {
          let totalamm = items.sumdigit * items.gamePrice;

          if (totalamm > totalSum) {
            Loss = totalamm - totalSum;
            Profit = 0;
          } else {
            Loss = 0;
            Profit = totalSum - totalamm;
          }

          jodiArray.push({
            index: index + 1,
            _id: items._id,
            countBid: items.countBid,
            totalBidAmm: items.sumdigit,
            Amounttopay: totalamm,
            Profit: Profit,
            Loss: Loss,
          });

          jodiArray.sort((a, b) => a._id.localeCompare(b._id));
        });

        let aaaaaaa = [];

        let OneToHundred = Array.from({ length: 100 }, (_, i) =>
          i.toString().padStart(2, "0")
        );

        OneToHundred.forEach((item) => {
          let found = false;

          jodiArray.forEach((item1) => {
            if (parseInt(item1._id) === parseInt(item)) {
              aaaaaaa.push({ ...item1 });
              found = true;
            }
          });

          if (!found) {
            aaaaaaa.push({
              _id: item,
              countBid: 0,
              totalBidAmm: 0,
              session: "Nill",
              Amounttopay: 0,
              Profit: result.totals.totalSumDigit,
              Loss: 0,
            });
          }
        });

        // console.log("jodiArray" ,jodiArray);
        
        if (
          !values.gameSession === "Half Sangam Digits" ||
          !values.gameSession === "Full Sangam Digits"
        ) {
          setTableTwo(aaaaaaa);
        } else if (values.gameSession === "Jodi Digit") {
          setTableTwo(aaaaaaa);
        } else {
          setTableTwo(jodiArray);
        }
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

      col_size: 4,
      options:
        (gameProviders1 &&
          gameProviders1.map((item) => ({
            label: item.providerName,
            value: item._id,
          }))) ||
        [],
    },
    {
      name: "gameSession",
      label: "Session",
      type: "select",
      label_size: 12,
      default: "Open",
      col_size: 4,
      options: [
        {
          label: "Open",
          value: "Open",
        },
        {
          label: "Close",
          value: "Close",
        },
        {
          label: "Jodi",
          value: "Jodi Digit",
        },
        {
          label: "Half Sangam",
          value: "Half Sangam Digits",
        },
        {
          label: "Full Sangam",
          value: "Full Sangam Digits",
        },
      ],
    },
  ];

  const visibleFields = [
    {
      name: "Digit",
      value: "_id",
      sortable: true,
    },
    {
      name: "Session",
      value: "session",
      sortable: true,
      style: (row) => ({
        display: "none",
        color: "white",
      }),
    },
    {
      name: "Bid Count",
      value: "countBid",
      sortable: false,
      transform: (item, row) => {
        return `${parseInt(item) > 0 ? `View Bids Info (${item})` : "No Bids"}`;
      },
      onClick: (row) => {
        showBidInfor(row);
      },
    },
    {
      name: "Total Bid Count",
      value: "totalBidAmm",
      sortable: true,
    },
    {
      name: "Amount To Pay",
      value: "Amounttopay",
      sortable: true,
    },
    {
      name: "Profit",
      value: "Profit",
      sortable: true,
      notheader: true,

      style: (row) => ({
        color: "green",
        fontWeight: "bold",
      }),
    },
    {
      name: "Loss",
      value: "Loss",
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
      value: "digit_id",
      sortable: true,
    },
    {
      name: "Session",
      value: "session",
      sortable: true,
    },
    {
      name: "Bid Count",
      value: "countBid",
      sortable: false,
      transform: (item, row) => {
        return `${parseInt(item) > 0 ? `View Bids Info (${item})` : "No Bids"}`;
      },
      onClick: (row) => {
        showBidInfor(row);
      },
    },
    {
      name: "Total Bid Count",
      value: "totalBidAmm",
      sortable: true,
    },
    {
      name: "Amount To Pay",
      value: "Amounttopay",
      sortable: true,
    },
    {
      name: "Profit",
      value: "Profit",
      sortable: true,
      notheader: true,

      style: (row) => ({
        color: "green",
        fontWeight: "bold",
      }),
    },
    {
      name: "Loss",
      value: "Loss",
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
    setShowBidInfoModal(!ShowBidInfoModal);

    let session =
      formik.values.gameSession === "Open" ||
      formik.values.gameSession === "Close"
        ? rowdata.session
        : "Close";
    const payload = {
      date: formik.values.gameDate || today(new Date()),
      id: formik.values.providerId,
      bidDigit: rowdata._id,
      gameSession: session,
      page: UserPagenateData.pageno,
      limit: UserPagenateData.limit,
    };
    const response1 = await PagesIndex.report_service.ALL_GAME_REPORT_API(
      Api.GET_BID_DATA,
      payload,
      token
    );

    setTotalPages(response1.totalCount);
    setShowBidInfoList(response1.bidData);
  };

  const tata = () => {
    // Check if SearchInTable is not empty, then filter the table, else reset it
    const filteredData = SearchInTable
      ? TableThree.filter((item) => item.digit_id.includes(SearchInTable))
      : TableThree;

    setTableThree(filteredData);
  };

  PagesIndex.useEffect(() => {
    tata();
  }, [SearchInTable]);

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
                {TableOne.originalData &&
                  TableOne.originalData.map((item) => {
                    return (
                      <>
                        <tr>
                          <td className="fw-bold">
                            {item.gameTypeName || item.gameType}
                          </td>
                          <td>{item.countBid || item.totalBids}</td>
                          <td>{item.sumdigit || item.totalSumDigit}</td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
              <tfoot className="primary-color">
                <tr>
                  <th>Grand Total</th>
                  <th>{TableOne.totals && TableOne.totals.totalBids}</th>
                  <th>{TableOne.totals && TableOne.totals.totalSumDigit}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ),
    },
    {
      size: 12,
      body: (
        <div>
          {formik.values.gameSession === "Open" ||
          formik.values.gameSession === "Close" ? (
            <h4>Single Digits</h4>
          ) : (
            ""
          )}
          <PagesIndex.TableWithCustomPeginationNew123
            data={TableTwo && TableTwo}
            initialRowsPerPage={100}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields}
          />
        </div>
      ),
    },
    {
      size: 12,
      // visiblity:
      //   formik.values.gameSession === "Open" ||
      //   formik.values.gameSession === "Close",

      body:
        formik.values.gameSession === "Open" ||
        formik.values.gameSession === "Close" ? (
          <div>
            <h4>Panna Bids</h4>
            <PagesIndex.TableWithCustomPeginationNew123
              data={(TableThree && TableThree) || []}
              initialRowsPerPage={100}
              SearchInTable={SearchInTable}
              visibleFields={visibleFields1}
              showSingleSearch={true}
            />
          </div>
        ) : null,
    },
  ];

  return (
    <div>
      <Split_Main_Containt
        title="Cutting Group"
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
              TotalPagesCount={(TotalPages && TotalPages) || []}
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
    </div>
  );
};

export default SplitForm;
