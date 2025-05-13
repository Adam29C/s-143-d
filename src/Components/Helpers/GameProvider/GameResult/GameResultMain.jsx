import React, { useEffect, useState } from "react";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
import PagesIndex from "../../../Pages/PagesIndex";
import { getActualDateFormate, today } from "../../../Utils/Common_Date";
import "react-datepicker/dist/react-datepicker.css";
import { Games_Provider_List } from "../../../Redux/slice/CommonSlice";

const ExamplePage = ({
  gameType,
  main_result,
  main_result_add,
  past_result,
  winner_list,
  distribute_fund,
  remove_result,
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
  const [PastResultCount, setPastResultCount] = useState([]);

  const [GetProvider, setGetProvider] = useState([]);

  //get game result function
  const getGameResultApi = async () => {
    // const res = await PagesIndex.admin_services.GAME_RESULT(token);

    const res = await PagesIndex.game_service.ALL_GAME_RESULTS(
      main_result,
      token
    );

    // if (res.status) {
    setTableData(res?.data?.result || res?.data?.results || res.result);
    setGetProvider(res?.data?.provider || res?.data?.providers || res?.data);
    // }
  };

  //get game provider data
  const getGameProvidersList = () => {
    dispatch(Games_Provider_List(token));
  };

  //get apis functions call in useEffect
  PagesIndex.useEffect(() => {
    getGameProvidersList();
    getGameResultApi();
  }, []);

  const formik = PagesIndex.useFormik({
    initialValues: {
      winningDigit: "",
      resultDate: actual_date_formet || null,
      session: "Open",
      providerId: "",
      providerName: "",
    },

    validate: (values) => {
      const errors = {};
      // if (!values.providerId) {
      //   errors.providerId = PagesIndex.valid_err.GAME_PROVIDER_ERROR;
      // }
      if (!values.session) {
        errors.session = PagesIndex.valid_err.GAME_SESSION_ERROR;
      }
      if (!values.resultDate) {
        errors.resultDate = PagesIndex.valid_err.DOMAIN_ERROR;
      }
      if (!values.winningDigit) {
        errors.winningDigit = PagesIndex.valid_err.GAME_WINING_DIGIT_ERROR;
      } else if (values.winningDigit.length > 2 && gameType === "JackPot") {
        errors.winningDigit = "Only 2 digit allowed";
      } else if (values.winningDigit.length > 3 && gameType === "StarLine") {
        errors.winningDigit = "Only 3 digit allowed";
      }
      return errors;
    },

    onSubmit: async (values) => {
      const selectedProviderName =
        GetProvider &&
        GetProvider.find((item) => item._id === values.providerId)
          ?.providerName;

      const payload = {
        providerId: values.providerId,
        providerName: selectedProviderName,
        session: values.session,
        resultDate: today(values.resultDate),
        winningDigit: values.winningDigit,
      };

      try {
        const res = await PagesIndex.game_service.ALL_GAME_RESULTS_ADD_API(
          main_result_add,
          payload,
          token
        );

        if (res.status) {
          PagesIndex.toast.success(res?.data?.message || res?.message);
          getGameResultApi();
          formik.resetForm();
        } else if (res?.response?.status === 400) {
          PagesIndex.toast.error(res?.response?.data?.message);
        } else {
          PagesIndex.toast.error(res?.message);
        }
      } catch (error) {
        // const errorMessage =
        //   error.response?.data?.message ||
        //   "Something went wrong. Please try again1212.";
        // PagesIndex.toast.error(errorMessage);
      }
    },
  });

  useEffect(() => {
    if (GetProvider?.length > 0) {
      formik.setFieldValue("providerId", GetProvider?.[0]._id);
      formik.setFieldValue("providerName", GetProvider?.[0].providerName);
    }
  }, [GetProvider]);

  //formik form for only result date
  const formik1 = PagesIndex.useFormik({
    initialValues: {
      date: getActualDateFormate(new Date()),
    },

    validate: (values) => {
      const errors = {};
      return errors;
    },
    onSubmit: async (values) => {
      const apidata = values.date;
      try {
        const res = await PagesIndex.game_service.ALL_GAME_PAST_RESULTS(
          past_result,
          apidata,
          token
        );

        if (res.status) {
          setPastResultCount({
            countResults: res.data.countResults,
            pendingCount: res.data.pendingCount,
            providerCount: res.data.providerCount,
          });

          PagesIndex.toast.success(res.message);
          setTableData(res.data.results || res.data.result);
        } else {
          PagesIndex.toast.error(res.message);
        }
      } catch (error) {
        PagesIndex.toast.error(error.response.data.message);
      }
    },
  });
  // gameType === "StarLine"
  const fields = [
    {
      name: "providerId",
      label: "Provider Name",
      type: "select",
      options:
        (GetProvider &&
          GetProvider?.map((item) => ({
            label: item.providerName,
            value: item._id,
          }))) ||
        [],
      label_size: 12,
      col_size: gameType === "JackPot" ? 4 : 3,
    },

    // {
    //   name: "session",
    //   label: "Session",
    //   type: "select",
    //   options: [
    //     { label: "Open", values: 1 },
    //     // { label: "Close", values: 0 },
    //   ],
    //   label_size: 12,
    //   col_size: 3,
    // },
    ...(gameType === "StarLine"
      ? [
          {
            name: "session",
            label: "Session",
            type: "select",

            options: [
              { label: "Open", value: "Open" },
              // { label: "Close", value: 0 },
            ],
            label_size: 12,
            col_size: 3,
          },
        ]
      : ""),
    {
      name: "resultDate",
      label: "Result Date",
      type: "date",
      label_size: 12,
      col_size: gameType === "JackPot" ? 4 : 3,
      // min: { actual_date_formet },
      max: { actual_date_formet },
    },
    {
      name: "winningDigit",
      label: "Winning Digit",
      type: "text",
      label_size: 12,
      col_size: gameType === "JackPot" ? 4 : 3,
    },
  ];

  const fields1 = [
    {
      name: "date",
      label: "Result Date",
      type: "date",
      label_size: 12,
      col_size: 12,
      max: { actual_date_formet },
    },
  ];

  //game result delete
  const handleDelete = async (row) => {
    const apidata = {
      resultId: row?._id,
      providerId: row?.providerId,
      session: row?.session,

      // "resultId": "672c9e2c3ed6eb600f635cc5",
      // "providerId": "666199ccb7537c08387c108f",
      dltPast: 0,
    };

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this game?"
    );
    if (!confirmDelete) return;

    try {
      let res = "";
      if (gameType === "StarLine" || gameType === "JackPot") {
        const apidata = {
          resultId: row?._id,
          providerId: row?.providerId,
          session: row?.session,
          dltPast: 0,
        };

        res = await PagesIndex.game_service.REMOVE_WINNER_LIST123(
          remove_result,
          apidata,
          token
        );
      }
      // res = await PagesIndex.admin_services.GAME_RESULT_DELETE(apidata, token);

      if (res.statusCode === 200 || res.status) {
        alert(res?.message);
        getGameResultApi();
        formik.values("providerId", "");
      } else {
        PagesIndex.toast.error(res.response.data.message);
      }
    } catch (error) {}
  };

  //handle actions button function
  const handleActionBtn = (row, buttonStatus) => {
    var locationData = {
      row: row,
      route: winner_list,
      gameType: gameType,
      distribute_fund: distribute_fund,
    };
    if (buttonStatus === 1) {
      if (gameType === "StarLine") {
        navigate(`/admin/starline/winnerlist/providerId=${row.providerId}`, {
          state: locationData,
        });
      } else if (gameType === "JackPot") {
        navigate(`/admin/jackpot/winnerlist/providerId=${row.providerId}`, {
          state: locationData,
        });
      } else {
        navigate(`/admin/starline/winnerlist/providerId=${row.providerId}`, {
          state: locationData,
        });
      }
    } else if (buttonStatus === 2) {
      handleDelete(row);
    } else {
      return "";
    }
  };

  const visibleFields = [
    {
      name: "Game Name",
      value: "providerName",
      sortable: true,
    },
    {
      name: "Session",
      value: "session",
      sortable: true,
      style: (row) => ({
        display: gameType === "JackPot" ? "none" : "block",
      }),
    },
    {
      name: "Result Date",
      value: "createdAt",
      sortable: true,
    },
    {
      name: "winning Digits",
      value: "winningDigit",
      sortable: true,
    },
    {
      name: "Get Winners ",
      value: "Get Winners ",
      buttonColor: "success",
      isButton: true,
      sortable: true,

      Conditions: (row) => {
        handleActionBtn(row, 1);
      },
    },
    {
      name: "Delete Result",
      value: "Delete Result",
      buttonColor: "danger",
      isButton: true,
      sortable: true,
      className: (row) => (parseInt(row.status) === 0 ? "d-block" : "d-none"),
      Conditions: (row) => {
        handleActionBtn(row, 2);
      },
    },
  ];

  // const UserFullButtonList = [
  //   {
  //     id: 0,
  //     buttonName: "Get Winners List",
  //     buttonColor: "",
  //     route: "",
  //     Conditions: (row) => {
  //       handleActionBtn(row, 1);
  //     },
  //     Visiblity: true,
  //     type: "button",
  //   },
  //   {
  //     id: 1,
  //     buttonName: "Delete Result",
  //     buttonColor: "danger",
  //     route: "test",
  //     Conditions: (row) => {
  //       handleActionBtn(row, 2);
  //     },
  //     Visiblity: false,
  //     type: "button",
  //   },
  // ];
  const cardLayouts = [
    {
      size: 9,
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
      size: 3,
      body: (
        <div>
          <div>
            <PagesIndex.Formikform
              fieldtype={fields1.filter((field) => !field.showWhen)}
              formik={formik1}
              show_submit={true}
              btn_name="Search Result"
            />
          </div>
        </div>
      ),
    },
    {
      size: 12,
      body: (
        <div>
          {/* Total Result Declared */}
          {PastResultCount && Object.keys(PastResultCount).length > 0 && (
            <h6 className="text-center fw-bold">
              Total Result Declared : {PastResultCount.countResults}, Total
              Result To Declared : {PastResultCount.providerCount}, Pending
              Result : {PastResultCount.pendingCount}
            </h6>
          )}

          <PagesIndex.TableWithCustomPeginationNew123
            data={tableData}
            initialRowsPerPage={25}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields}
            showIndex={true}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Split_Main_Containt
        title="Game Results"
        add_button={false}
        btnTitle="Add"
        route="/add"
        cardLayouts={cardLayouts}
      />
    </>
  );
};

export default ExamplePage;
