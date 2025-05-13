import React from "react";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
import { useFormik } from "formik";
import PagesIndex from "../../../Pages/PagesIndex";
import {
  Games_Provider_List,
  Games_Provider_List1,
} from "../../../Redux/slice/CommonSlice";
import { Api } from "../../../Config/Api";
import { today } from "../../../Utils/Common_Date";
import { spArray } from "./data";

const SplitForm = () => {
  const token = localStorage.getItem("token");
  const dispatch = PagesIndex.useDispatch();

  const [GetTotal, setGetTotal] = PagesIndex.useState("");

  const [TableTwo, setTableTwo] = PagesIndex.useState([]);
  const [TableThree, setTableThree] = PagesIndex.useState([]);
  const [TotalSingle, setTotalSingle] = PagesIndex.useState(0);
  const [TotalPana, setTotalPana] = PagesIndex.useState(0);
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");

  const [showProvider, setshowProvider] = PagesIndex.useState([]);

  // console.log("showProvider", showProvider);

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
      providerId:
        (gameProviders1[0] && gameProviders1[0]?._id) ||
        "67eebd2fa361832d96e37e7d",
      devidby: "16",
    },

    validate: (values) => {
      const errors = {};

      if (!values.gameSession) {
        errors.gameSession = "Please Select Game Session";
      }

      if (!values.providerId) {
        errors.providerId = "Please Select Provider";
      }
      if (!values.devidby) {
        errors.devidby = "Please Enter Value";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const payload = {
        date: values.gameDate || today(new Date()),
        session: values.gameSession,
        providerId: values.providerId,

        // date: "12/04/2024",
        // providerId: "668d41ca211a65d88600f673",
        // session: "Close",
      };

      let divideBy = formik.values.devidby;
      let pannaArr = [];
      const singleArr = [];

      if (values.gameSession === "Open") {
        const response1 = await PagesIndex.report_service.ALL_GAME_REPORT_API(
          Api.OC_CUTTING_GROUP_LIST,
          payload,
          token
        );

        if (!response1.status) {
          setTableTwo([]);
          setTotalSingle([]);
          setGetTotal([]);
          setTableThree([]);
          PagesIndex.toast.error(response1.message);
        }

        let singleDigit = response1.dataSum.singleDigit;
        let pana = response1.dataSum.Pana;
        let JodiPrice = response1.price.jodiPrice;
        if (response1.status == 1) {
          setGetTotal(response1.dataSum);

          let total = 0;

          let aaa = 0;
          let j = 1;
          let arr = [];
          let aaaaaaa = [];
          let id_array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

          response1.finalData.singleDigitArray.map((key, e) => {
            // console.log("key" ,key);
            // console.log("JodiPrice" ,JodiPrice);

            let amountToPay = key.biddingPoints * JodiPrice;

            let loss = 0;
            let FinalLoss = 0;

            let pl = amountToPay;
            if (pl > singleDigit) {
              //loss
              loss = pl - singleDigit;

              FinalLoss = (loss / divideBy).toFixed();

              total = total + parseInt(FinalLoss);
            }

            arr.push({
              id: `${e} =`,
              amountToPay: amountToPay,
              loss: loss,
              FinalLoss: FinalLoss,
              total: total,
            });
            aaa += parseInt(FinalLoss);
          });

          id_array.forEach((item) => {
            let found = false;

            arr.forEach((item1) => {
              if (parseInt(item1.id) === parseInt(item)) {
                aaaaaaa.push({ ...item1 });
                found = true;
              }
            });

            if (!found) {
              aaaaaaa.push({
                id: `${item} =`,
                amountToPay: 0,
                loss: 0,
                FinalLoss: 0,
                total: 0,
              });
            }
          });

          aaaaaaa.sort((a, b) => parseInt(b.loss) - parseInt(a.loss));

          // console.log("aaaaaaa", aaaaaaa);

          setTotalSingle(aaa);

          setTableTwo(aaaaaaa);

          let pana220 = response1.finalData.panaArray;

          let singlePanaPrice = parseInt(response1.price.sp);
          let doublePanaPrice = parseInt(response1.price.dp);
          let triplePanaPrice = parseInt(response1.price.tp);

          let pannaArr = [];

          let totalSum = 0;
          let m = 0;

          Object.entries(pana220).map(([key, value]) => {
            let spdptpCheck = spArray[key];
            let amountToPay = 0;
            let bidPoints = value.biddingPoints;
            let price;

            if (spdptpCheck === 1) {
              price = singlePanaPrice;
              amountToPay = bidPoints * singlePanaPrice;
            } else if (spdptpCheck === 2) {
              price = doublePanaPrice;
              amountToPay = bidPoints * doublePanaPrice;
            } else {
              price = doublePanaPrice;
              amountToPay = bidPoints * triplePanaPrice;
            }

            let lossPana = 0;
            let pl = amountToPay;
            let finalCal = 0;

            if (pl > pana) {
              lossPana = pl - pana;
              finalCal = (lossPana / price).toFixed();
              totalSum += parseInt(finalCal);
            }

            pannaArr.push({
              id: `${key} =`,
              amountToPay: pl,
              loss: lossPana,
              FinalLoss: finalCal,
              total: totalSum,
            });
            m += parseInt(finalCal);
          });

          pannaArr.sort(
            (a, b) => parseInt(b.FinalLoss) - parseInt(a.FinalLoss)
          );

          setTotalPana(m);
          setTableThree(pannaArr);
        } else {
          setTableTwo([]);
          setTotalSingle([]);
          setTableThree([]);
          PagesIndex.toast.error(response1.message);
        }
      } else {
        const response = await PagesIndex.report_service.ALL_GAME_REPORT_API(
          Api.OC_CUTTING_GROUP_OC_LIST,
          payload,
          token
        );

        setGetTotal(response.dataSum);

        let JodiPrice = response.price.jodiPrice;

        let arr = [];

        let singleDigitArray = response.finalData.singleDigitArray;
        let signleDigitCal = response.dataSum.singleDigit;
        let totalpnl = 0;
        Object.entries(singleDigitArray).map(([key, value]) => {
          let amountToPay = value.biddingPoints * JodiPrice;
          let loss = 0;
          let FinalLoss = 0;
          let total = 0;

          let pl = amountToPay;
          if (pl > signleDigitCal) {
            //loss
            loss = pl - signleDigitCal;

            FinalLoss = (loss / divideBy).toFixed();

            total = total + parseInt(FinalLoss);
          }

          arr.push({
            id: `${key} =`,
            amountToPay: amountToPay,
            loss: loss,
            FinalLoss: FinalLoss,
            total: total,
          });

          totalpnl += total;
        });
        setTotalSingle(totalpnl);

        setTableTwo(arr);
        let pannaArr = [];
        let pana220 = response.finalData.panaArray;
        let pana = response.dataSum.Pana;
        let singlePanaPrice = parseInt(response.price.sp);
        let doublePanaPrice = parseInt(response.price.dp);
        let triplePanaPrice = parseInt(response.price.tp);

        let totalSum = 0;
        let m = 0;

        Object.entries(pana220).map(([key, value]) => {
          let spdptpCheck = spArray[key];
          let amountToPay = 0;
          let bidPoints = value.biddingPoints;
          let price;

          if (spdptpCheck === 1) {
            price = singlePanaPrice;
            amountToPay = bidPoints * singlePanaPrice;
          } else if (spdptpCheck === 2) {
            price = doublePanaPrice;
            amountToPay = bidPoints * doublePanaPrice;
          } else {
            price = doublePanaPrice;
            amountToPay = bidPoints * triplePanaPrice;
          }

          let lossPana = 0;
          let pl = amountToPay;
          let finalCal = 0;

          if (pl > pana) {
            lossPana = pl - pana;
            finalCal = (lossPana / price).toFixed();
            totalSum += parseInt(finalCal);
          }

          pannaArr.push({
            id: `${key} =`,
            amountToPay: pl,
            loss: lossPana,
            FinalLoss: finalCal,
            total: totalSum,
          });
          m += parseInt(finalCal);
        });

        pannaArr.sort((a, b) => parseInt(b.FinalLoss) - parseInt(a.FinalLoss));

        console.log("m", m);

        setTotalPana(m);

        setTableThree(pannaArr);
      }
    },
  });
  const fields = [
    {
      name: "gameDate",
      label: "Start Date",
      type: "date",
      label_size: 12,
      col_size: 3,
    },
    {
      name: "providerId",
      label: "Provider",
      type: "select",
      label_size: 12,
      default:
        (gameProviders1[0] && gameProviders1[0]?._id) ||
        "67eebd2fa361832d96e37e7d",
      col_size: 3,
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
      col_size: 3,
      options: [
        {
          label: "Open",
          value: "Open",
        },
        {
          label: "Close",
          value: "Close",
        },
      ],
    },

    {
      name: "devidby",
      label: "Divide By",
      type: "text",
      // default: 16,
      label_size: 12,
      col_size: 3,
    },
  ];

  const visibleFields = [
    {
      name: "Digit",
      value: "id",
      sortable: true,
    },
    {
      name: "Cutting",
      value: "FinalLoss",
      sortable: true,
    },
  ];
  const visibleFields1 = [
    {
      name: "Digit",
      value: "id",
      sortable: true,
    },
    {
      name: "Cutting",
      value: "FinalLoss",
      sortable: true,
    },
  ];

  const test = () => {
    let abc = gameProviders1.filter((items) => {
      return items._id === formik.values.providerId;
    });

    setshowProvider(
      `${abc[0] && abc[0].providerName} (${formik.values.gameSession}`
    );
  };

  PagesIndex.useEffect(() => {
    test();
  }, [formik]);

  const cardLayouts = [
    {
      size: 8,
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
      size: 4,
      body: (
        <div>
          <div className="table-responsive ">
            <table className="table  ">
              <thead className="primary-color">
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody id="groupData">
                <tr>
                  <td>1</td>
                  <td className="fw-bold">Single Digit</td>
                  <td>{GetTotal && GetTotal.singleDigit}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="fw-bold"> Pana</td>
                  <td>{GetTotal && GetTotal.Pana}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      size: 7,
      body: (
        <div className="text-center">
          {/* <h4>Single Digits</h4> */}
          <PagesIndex.TableWithCustomPeginationNew123
            data={TableTwo && TableTwo}
            initialRowsPerPage={25}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields}
            Responsive={"test"}
            showIndex={false}
            additional={
              <>
                <td className="fw-bold">Total</td>
                <td className="fw-bold">{TotalSingle}</td>
              </>
            }
            additionalnew={showProvider && showProvider + ")"}
          />
        </div>
      ),
    },
    {
      size: 7,
      body: (
        <div>
          {/* <h4>Panna Bids</h4> */}
          <PagesIndex.TableWithCustomPeginationNew123
            data={(TableThree && TableThree) || []}
            initialRowsPerPage={25}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields1}
            Responsive={"test"}
            showIndex={false}
            additional={
              <>
                <td className="fw-bold">Total</td>
                <td className="fw-bold">{TotalPana}</td>
              </>
            }
            additionalnew={showProvider && showProvider + "-Pana )"}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h4>Final OC Cutting Group</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-8 col-sm-12">
              <div className="card">
                <div className="card-body">{cardLayouts[0].body}</div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-12">
              <div className="card">
                <div className="card-body">{cardLayouts[1].body}</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-5 col-sm-12">
              <div className="card">
                <h3 className="m-0 p-3">Single Digit</h3>
                <div className="card-body d-flex justify-content-center">
                  <div className="col-xl-7">{cardLayouts[2].body}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-5 col-sm-12">
              <div className="card">
                <h3 className="m-0 p-3">Pana Digit</h3>
                <div className="card-body  d-flex justify-content-center">
                  <div className="col-xl-7">{cardLayouts[3].body}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitForm;
