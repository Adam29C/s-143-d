import React, { useEffect, useState } from "react";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
import PagesIndex from "../../../Pages/PagesIndex";
import { getActualDateFormate, today } from "../../../Utils/Common_Date";
import "react-datepicker/dist/react-datepicker.css";
import {
  Games_Provider_List,
  Games_Provider_List1,
} from "../../../Redux/slice/CommonSlice";

const MainGameReports = ({
  gameType,
  report_api,
  starandjackProvider,
  title,
}) => {
  //get token in local storage
  const token = localStorage.getItem("token");
  //set actual date
  const actual_date_formet = getActualDateFormate(new Date());
  //dispatch
  const dispatch = PagesIndex.useDispatch();

  //navigate
  const navigate = PagesIndex.useNavigate();
  //all state
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [tableData, setTableData] = useState([]);
  const [ProviderList, setProviderList] = useState([]);

  const { gameProviders1 } = PagesIndex.useSelector(
    (state) => state.CommonSlice
  );

  //get game result function
  // const getGameResultApi = async () => {
  //   if (gameType !== "mainGame") {
  //     const res =
  //       await PagesIndex.game_service.FOR_STARLINE_AND_JACPOT_PROVIDER_LIST_API(
  //         starandjackProvider,
  //         token
  //       );
  //     setProviderList(res.data);
  //   }
  // };

  const visibleFields = [
    {
      name: "Provider Name",
      value: "providerName",
      sortable: true,
    },
    {
      name: "Date",
      value: "enabled",
      sortable: false,
      transform: (value) =>
        `${formik.values.startdate} To ${formik.values.enddate}`,
    },
    {
      name: "Bidding Points",
      value: "BiddingPoints",
      sortable: true,
    },
    {
      name: "Winning Points",
      value: "GameWinPoints",
      sortable: true,
    },

    {
      name: "Profit/Loss",
      notheader: true,
      value: "bidPointDiffence",
      style: (row) => ({
        color:
          parseInt(row.BiddingPoints - row.GameWinPoints) < 0 ? "red" : "green",
        fontWeight: "bold",
      }),
      sortable: true,
    },
  ];

  //get game provider data
  const getGameProvidersList = async () => {
    if (gameType === "mainGame") {
      dispatch(Games_Provider_List1(token));
    } else {
      const res =
        await PagesIndex.game_service.FOR_STARLINE_AND_JACPOT_PROVIDER_LIST_API(
          starandjackProvider,
          token
        );
      setProviderList(res.data);
    }
  };

  PagesIndex.useEffect(() => {
    getGameProvidersList();
    // getGameProvidersList();
  }, []);

  const formik = PagesIndex.useFormik({
    initialValues: {
      providerId: "0",
      startdate: today(new Date()),
      enddate: today(new Date()),
      username: "",
    },

    validate: (values) => {
      const errors = {};

      return errors;
    },

    onSubmit: async (values) => {
      const payload = {
        userId: values.username,
        gameId: values.providerId || "0",
        startDate: getActualDateFormate(values.startdate),
        endDate: getActualDateFormate(values.enddate),
        // startDate: values.startdate,
        // endDate: values.enddate,
      };

      try {
        const res = await PagesIndex.report_service.ALL_GAME_REPORT_API(
          report_api,
          payload,
          token
        );

        if (res.status) {
          setTableData(res.data);

          let totalPointDifference = 0;
          let totalBiddingPoint = 0;
          let totalWiningPoint = 0;
          let totalAmount = 0;

          const finalaray = [];

          res.data.forEach((e) => {
            const bidPoint = e.BiddingPoints;
            const winPoint = e.GameWinPoints;
            const pointDifference = bidPoint - winPoint;

            // Update totals
            totalPointDifference += pointDifference;
            totalBiddingPoint += bidPoint;
            totalWiningPoint += winPoint;
            totalAmount += e.reqAmount;

            finalaray.push({
              GameWinPoints: e.GameWinPoints,
              BiddingPoints: e.BiddingPoints,
              providerName: e.providerName,
              bidPointDiffence: pointDifference,
            });
          });

          // Add totals as a separate entry or object
          finalaray.push({
            totalBiddingPoint: totalBiddingPoint,
            totalWiningPoint: totalWiningPoint,
            totalPointDifference: totalPointDifference,
          });

          setTableData(finalaray);
          getGameProvidersList();
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        PagesIndex.toast.error(errorMessage);
      }
    },
  });

  const fields = [
    {
      name: "startdate",
      label: "Start Date",
      type: "date",
      label_size: 12,
      col_size: 3,
      max: { actual_date_formet },
    },
    {
      name: "enddate",
      label: "End Date",
      type: "date",
      label_size: 12,
      col_size: 3,
      max: { actual_date_formet },
    },
    {
      name: "providerId",
      label: "Provider Name",
      type: "select",
      default: "0",
      options:
        gameType === "mainGame"
          ? [
              { label: "All", value: "0" },
              ...(gameProviders1
                ? gameProviders1.map((item) => ({
                    label: item.providerName,
                    value: item._id,
                  }))
                : []),
            ] || []
          : [
              { label: "All", value: "0" },
              ...(ProviderList
                ? ProviderList.map((item) => ({
                    label: item.providerName,
                    value: item._id,
                  }))
                : []),
            ] || [],
      label_size: 12,
      col_size: 3,
    },
    {
      name: "username",
      label: "Player Name",
      type: "text",
      label_size: 12,
      col_size: 3,
      default: "",
    },
  ];

  const cardLayouts = [
    {
      size: 12,
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
      size: 12,
      body: (
        <div>
          <PagesIndex.TableWithCustomPeginationNew123
            data={tableData}
            initialRowsPerPage={25}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields}
            additional={
              <>
                <td colSpan={2} style={{ fontWeight: "bold" }}></td>
                <td
                  style={{
                    color:
                      tableData[tableData.length - 1]?.totalBiddingPoint < 0
                        ? "red"
                        : "green",
                    fontWeight: "bold",
                  }}
                >
                  Total:&nbsp;
                  {tableData[tableData.length - 1]?.totalBiddingPoint}
                </td>
                <td
                  style={{
                    color:
                      tableData[tableData.length - 1]?.totalWiningPoint < 0
                        ? "red"
                        : "green",
                    fontWeight: "bold",
                  }}
                >
                  Total:&nbsp;
                  {tableData[tableData.length - 1]?.totalWiningPoint}
                </td>
                <td
                  style={{
                    color:
                      tableData[tableData.length - 1]?.totalPointDifference < 0
                        ? "red"
                        : "green",
                    fontWeight: "bold",
                  }}
                >
                  Total:&nbsp;
                  {tableData[tableData.length - 1]?.totalPointDifference}
                </td>
              </>
            }
            searchInput={
              <input
                type="text"
                placeholder="Search..."
                value={SearchInTable}
                onChange={(e) => setSearchInTable(e.target.value)}
                className="form-control ms-auto"
              />
            }
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Split_Main_Containt
        title={title}
        add_button={false}
        btnTitle="Add"
        route="/add"
        cardLayouts={cardLayouts}
      />
    </>
  );
};

export default MainGameReports;
