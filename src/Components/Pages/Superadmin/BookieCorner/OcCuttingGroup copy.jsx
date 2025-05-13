import React from "react";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
import { useFormik } from "formik";
import PagesIndex from "../../../Pages/PagesIndex";
import { Games_Provider_List } from "../../../Redux/slice/CommonSlice";
import { Api } from "../../../Config/Api";
import { today } from "../../../Utils/Common_Date";
import { spArray } from "./data";

const SplitForm = () => {
  const token = localStorage.getItem("token");
  const dispatch = PagesIndex.useDispatch();

  const [GetTotal, setGetTotal] = PagesIndex.useState("");

  const [TableTwo, setTableTwo] = PagesIndex.useState([]);
  const [TableThree, setTableThree] = PagesIndex.useState([]);
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");

  const { gameProviders } = PagesIndex.useSelector(
    (state) => state.CommonSlice
  );

  PagesIndex.useEffect(() => {
    dispatch(Games_Provider_List(token));
  }, []);

  const calculatePL = (sumDigit, gamePrice, threshold) => {
    const pl = sumDigit * gamePrice;
    const profit = pl > threshold ? 0 : threshold - pl;
    const loss = pl > threshold ? pl - threshold : 0;

    return { amountToPay: pl, profit, loss };
  };

  const forPanaCalulation = (
    panaArrayMain,
    singlePanaPrice,
    doublePanaPrice,
    triplePanaPrice,
    pana
  ) => {
    let pannaArr = [];
    let checktotal = 0;
    Object.entries(panaArrayMain).map(([key, value]) => {
      var spdptpCheck = spArray[key];
      var amountToPay = 0;
      var bidPoints = value.biddingPoints;

      checktotal += bidPoints;

      if (spdptpCheck === 1) {
        amountToPay = bidPoints * singlePanaPrice;
      } else if (spdptpCheck === 2) {
        amountToPay = bidPoints * doublePanaPrice;
      } else {
        amountToPay = bidPoints * triplePanaPrice;
      }

      var loss = 0;
      var profit = 0;
      var pl = amountToPay;

      if (pl > pana) {
        // loss
        loss = pl - pana;
      } else {
        // profit
        profit = pana - pl;
      }

      pannaArr.push({
        _id: value.digit + "-" + value.digitFamily,

        totalBidAmm: value.biddingPoints,
        session: formik.values.gameSession || "Null",
        Amounttopay: amountToPay,
        Profit: profit,
        Loss: loss,
      });
    });

    pannaArr.sort((a, b) => {
      const idA = a._id.split("-")[0];
      const idB = b._id.split("-")[0];
      return idA - idB;
    });

    return pannaArr;
  };

  const formik = useFormik({
    initialValues: {
      gameDate: "",
      gameSession: "Open",
      providerId: "668d41ca211a65d88600f673",
      // providerId: gameProviders[0] && gameProviders[0]?._id,
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
        date: values.gameDate || today(new Date()),
        session: values.gameSession,
        providerId: values.providerId,

        // date: "01/10/2025",
        // session: "Open",
        // providerId: "668d4228211a65d88600f6f0",
      };

      let pannaArr = [];
      const singleArr = [];

      if (values.gameSession === "Open") {
        const response1 = await PagesIndex.report_service.ALL_GAME_REPORT_API(
          Api.OC_CUTTING_GROUP_LIST,
          payload,
          token
        );

        if (!response1.status) {
          PagesIndex.toast.success(response1.message);
          setTableTwo([]);
          setGetTotal([]);
          return;
        }

        if (response1.status == 1) {
          setGetTotal(response1.dataSum);

          let singleDigit = response1.dataSum.singleDigit;
          let pana = response1.dataSum.Pana;
          let aaaaaaa = [];
          let JodiPrice = response1.price.jodiPrice;

          let id_array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

          response1.finalData.singleDigitArray.map((e) => {
            let amountToPay = JodiPrice * e.biddingPoints || 0;
            let loss = 0;
            let profit = 0;
            let pl = amountToPay;

            if (pl > singleDigit) {
              //loss
              loss = pl - singleDigit;
            } else {
              //profit
              profit = singleDigit - pl;
            }

            console.log("profit", profit);
            console.log("loss", loss);

            singleArr.push({
              _id: e._id,
              countBid: e.countBid,
              totalBidAmm: e.biddingPoints || 0,
              session: formik.values.gameSession || "Null",
              Amounttopay: amountToPay,
              Profit: profit,
              Loss: loss,
            });
          });

          id_array.forEach((item) => {
            let found = false;

            singleArr.forEach((item1) => {
              if (item1._id === item) {
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
                Profit: 0,
                Loss: singleDigit,
              });
            }
          });

          console.log("aaaaaaa ", aaaaaaa);

          // Sort the array by `_id` if needed
          aaaaaaa.sort((a, b) => a._id - b._id);
          setTableTwo(aaaaaaa);

          let pana220 = response1.finalData.panaArray;

          let singlePanaPrice = parseInt(response1.price.sp);
          let doublePanaPrice = parseInt(response1.price.dp);
          let triplePanaPrice = parseInt(response1.price.tp);

          let getPanaArray = forPanaCalulation(
            pana220,
            singlePanaPrice,
            doublePanaPrice,
            triplePanaPrice,
            pana
          );

          setTableThree(getPanaArray);
        } else {
          PagesIndex.toast.error(response1.message);
        }
      } else {
        const response = await PagesIndex.report_service.ALL_GAME_REPORT_API(
          Api.OC_CUTTING_GROUP_OC_LIST,
          payload,
          token
        );

        if (!response.status) {
          PagesIndex.toast.error(response?.response?.data?.message || response?.message);
          return;
        } else {
          setGetTotal(response.dataSum);

          let panaArrayMain = response.finalData.panaArray;
          let singleDigitArray = response.finalData.singleDigitArray;

          let singlePanaPrice = parseInt(response.price.sp);
          let doublePanaPrice = parseInt(response.price.dp);
          let triplePanaPrice = parseInt(response.price.tp);
          let jodiPrice = parseInt(response.price.jodiPrice);

          let pana = response.dataSum.Pana;
          let signleDigitCal = response.dataSum.singleDigit;

          Object.entries(singleDigitArray).map(([key, value]) => {
            const {
              amountToPay = 0,
              profit = 0,
              loss = 0,
            } = calculatePL(value.biddingPoints, jodiPrice, signleDigitCal);

            singleArr.push({
              _id: key,
              totalBidAmm: value.biddingPoints,
              session: formik.values.gameSession || "Null",
              Amounttopay: amountToPay,
              Profit: profit,
              Loss: loss,
            });
          });

          setTableTwo(singleArr);

          let getPanaArray = forPanaCalulation(
            panaArrayMain,
            singlePanaPrice,
            doublePanaPrice,
            triplePanaPrice,
            pana
          );
          setTableThree(getPanaArray);
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
      default: gameProviders[0] && gameProviders[0]?._id,
      default: "668d41ca211a65d88600f673",
      col_size: 4,
      options:
        (gameProviders &&
          gameProviders.map((item) => ({
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
      notheader: true,

      sortable: true,
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
      value: "_id",
      sortable: true,
    },
    {
      name: "Session",
      value: "session",
      sortable: true,
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
      notheader: true,

      sortable: true,
      style: (row) => ({
        color: "green",
        fontWeight: "bold",
      }),
    },
    {
      name: "Loss",
      value: "Loss",
      notheader: true,

      sortable: true,
      style: (row) => ({
        color: "red",
        fontWeight: "bold",
      }),
    },
  ];

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
      size: 12,
      body: (
        <div>
          <h4>Single Digits</h4>
          <PagesIndex.TableWithCustomPeginationNew123
            data={TableTwo && TableTwo}
            initialRowsPerPage={25}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields}
            //  Responsive={"test"}

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
      // visiblity:
      //   formik.values.gameSession === "Open" ||
      //   formik.values.gameSession === "Close",

      body: (
        // formik.values.gameSession === "Open" ||
        // formik.values.gameSession === "Close" ? (

        <div>
          <h4>Pana Digits</h4>

          <PagesIndex.TableWithCustomPeginationNew123
            data={(TableThree && TableThree) || []}
            initialRowsPerPage={100}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields1}
            // Responsive={"test"}
          />
        </div>
      ),
      // ) : null,
    },
  ];

  return (
    <div>
      <Split_Main_Containt
        title="OC Cutting Group"
        add_button={false}
        btnTitle="Add"
        route="/add"
        cardLayouts={cardLayouts}
      />
      <PagesIndex.Toast />
    </div>
  );
};

export default SplitForm;
