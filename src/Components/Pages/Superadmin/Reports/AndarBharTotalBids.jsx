import React, { useEffect, useState } from "react";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
import PagesIndex from "../../../Pages/PagesIndex";
import { getActualDateFormate, today } from "../../../Utils/Common_Date";
import "react-datepicker/dist/react-datepicker.css";
import { Games_Provider_List } from "../../../Redux/slice/CommonSlice";
import { Api } from "../../../Config/Api";

const AndarBharTotalBids = ({ gameType, report_api, starandjackProvider }) => {
  // Get token from local storage
  const token = localStorage.getItem("token");
  // Set actual date
  const actual_date_formet = getActualDateFormate(new Date());
  // Dispatch
  const dispatch = PagesIndex.useDispatch();

  // Navigate
  const navigate = PagesIndex.useNavigate();

  // All state variables
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [tableData, setTableData] = useState([]);
  const [ProviderList, setProviderList] = useState([]);
  const [Refresh, setRefresh] = PagesIndex.useState(false);

  const [UserPagenateData, setUserPagenateData] = PagesIndex.useState({
    pageno: 1,
    limit: 10,
  });

  const [TotalPages, setTotalPages] = PagesIndex.useState(1);

  // Get game result data
  const getGameResultApi = async () => {
    const res =
      await PagesIndex.game_service.FOR_STARLINE_AND_JACPOT_PROVIDER_LIST_API(
        Api.JACKPOT_GAME_PROVIDERS,
        token
      );

    setProviderList(res.data);
  };

  // Get game provider data
  const getGameProvidersList = () => {
    dispatch(Games_Provider_List(token));
  };

  const visibleFields = [
    { name: "User Name", value: "userName", sortable: true },
    { name: "Bracket", value: "bidDigit", sortable: false },
    { name: "Bidding Points", value: "biddingPoints", sortable: true },
    { name: "Winning Points", value: "gameWinPoints", sortable: true },
    { name: "Created At", value: "createdAt", sortable: true },
  ];

  const formik = PagesIndex.useFormik({
    initialValues: {
      gameId: "",
      StartDate: today(new Date()),
    },

    validate: (values) => {
      const errors = {};
      if (!values.gameId) {
        errors.gameId = PagesIndex.valid_err.SELECT_GAME_NAME_ERROR;
      }
      return errors;
    },

    onSubmit: async (values) => {
      try {
        const paylaod = {
          page: UserPagenateData.pageno,
          limit: UserPagenateData.limit,
          // searchQuery,
          startDate: values.StartDate,
          gameId: values.gameId || "0",
          search: SearchInTable,
        };

        const response =
          await PagesIndex.report_service.JACKPOT_BIDS_REPORT_API(
            Api.JACKPOT__TOTAL_BIDS_REPORT,
            paylaod,
            token
          );

        if (response?.status) {
          setTableData(response.data);
          setTotalPages(response.totalRecords);
          setRefresh(!Refresh); // Trigger refresh to update the table
        } else {
          setTableData([]);
          PagesIndex.toast.error(
            response?.response?.data?.message || "Failed to fetch data"
          );
        }
      } catch (error) {
        // PagesIndex.toast.error(
        //   error?.response?.data?.message ||
        //     "Something went wrong. Please try again."
        // );
      }

      // await resss(values);
    },
  });

  useEffect(() => {
    if (ProviderList?.length > 0) {
      formik.setFieldValue("gameId", ProviderList?.[0]._id);
      // formik.setFieldValue("providerName", ProviderList?.[0].providerName);
    }
  }, [ProviderList]);

  // const resss = async () => {
  //   try {
  //     const paylaod = {
  //       page: UserPagenateData.pageno,
  //       limit: UserPagenateData.limit,
  //       // searchQuery,
  //       startDate: formik.values.StartDate,
  //       gameId: formik.values.gameId || "0",
  //       search: SearchInTable,
  //     };

  //     const response = await PagesIndex.report_service.JACKPOT_BIDS_REPORT_API(
  //       paylaod,
  //       token
  //     );

  //     if (response?.status) {
  //       setTableData(response.data);
  //       setTotalPages(response.totalRecords);
  //       setRefresh(!Refresh); // Trigger refresh to update the table
  //     } else {
  //       setTableData([]);
  //       PagesIndex.toast.error(
  //         response?.response?.data?.message || "Failed to fetch data"
  //       );
  //     }
  //   } catch (error) {
  //     // PagesIndex.toast.error(
  //     //   error?.response?.data?.message ||
  //     //     "Something went wrong. Please try again."
  //     // );
  //   }
  // };

  // useEffect(() => {
  //   resss();
  // }, [UserPagenateData.pageno, UserPagenateData.limit]);

  const fields = [
    {
      name: "StartDate",
      label: "Start Date",
      type: "date",
      label_size: 12,
      col_size: 3,
      max: { actual_date_formet },
    },
    {
      name: "gameId",
      label: "Provider Name",
      type: "select",
      options:
        (ProviderList &&
          ProviderList.map((item) => ({
            label: item.providerName,
            value: item._id,
          }))) ||
        [],
      label_size: 12,
      col_size: 3,
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
          <PagesIndex.TableWithCustomPeginationNew
            // fetchData={handleFetchDataManually}
            // handleFetchDataManually={handleFetchDataManually}
            tableData={tableData && tableData}
            TotalPagesCount={(TotalPages && TotalPages) || []}
            columns={visibleFields}
            showIndex={true}
            Refresh={Refresh}
            setUserPagenateData={setUserPagenateData}
          />
        </div>
      ),
    },
  ];

  // Call the necessary API functions on component mount
  PagesIndex.useEffect(() => {
    getGameProvidersList();
    getGameResultApi();
  }, []);

  return (
    <>
      <Split_Main_Containt
        title="Andar Bahar Detailed Bidding Report"
        add_button={false}
        btnTitle="Add"
        route="/add"
        cardLayouts={cardLayouts}
      />
    </>
  );
};

export default AndarBharTotalBids;
