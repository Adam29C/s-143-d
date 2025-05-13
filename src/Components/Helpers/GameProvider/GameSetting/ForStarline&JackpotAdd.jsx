import React from "react";
import PagesIndex from "../../../Pages/PagesIndex";
import {
  convertTo12HourFormat,
  convertTo12HourFormat123,
} from "../../../Utils/Common_Date";

const ForStarlineJackpotAdd = ({
  gameType,
  path,
  api_Route,
  api_Route2,
  updateAll,
  updateOne,
}) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = PagesIndex.useNavigate();
  const location = PagesIndex.useLocation();
  const dispatch = PagesIndex.useDispatch();
  const [DisableSubmit, setDisableSubmit] = PagesIndex.useState(false);

  const [Data, setData] = PagesIndex.useState([]);

  const getGameProviderList = async () => {
    let providerapidata = {
      userId: userId,
      gameType: gameType,
    };

    // if (gameType === "StarLine") {
    const res =
      await PagesIndex.game_service.FOR_STARLINE_AND_JACPOT_PROVIDER_LIST_API(
        api_Route2,
        token
      );
    if (res.status) {
      setData(res.data);
    }
    // }else{
    //   const res =
    //   await PagesIndex.game_service.FOR_STARLINE_AND_JACPOT_PROVIDER_LIST_API(
    //     api_Route2,
    //     token
    //   );
    // if (res.status) {
    //   setData(res.data);
    // }
  };

  PagesIndex.useEffect(() => {
    getGameProviderList();
  }, []);

  console.log("location?.state?.rowData.OBT", location?.state?.rowData.OBRT);

  const formik = PagesIndex.useFormik({
    initialValues: {
      providerId: location?.state?.row
        ? location?.state?.rowData?.providerId
        : "",
      gameDay:
        location?.state?.edit === "single"
          ? location?.state?.rowData.gameDay
          : "all",
      OBT: location?.state?.rowData
        ? convertTo12HourFormat(location?.state?.rowData.OBT)
        : "",
      CBT: location?.state?.rowData
        ? convertTo12HourFormat(location?.state?.rowData.CBT)
        : "",
      OBRT: location?.state?.rowData
        ? convertTo12HourFormat(location?.state?.rowData.OBRT)
        : "",
      // CBRT: location?.state?.rowData ? location?.state?.rowData.CBRT : "",
      CBRT: "null",
      isClosed: location?.state?.rowData
        ? location?.state?.rowData.isClosed
        : "1",
    },
    validate: (values) => {
      const errors = {};
      if (!values.providerId && formik.touched.providerId) {
        errors.providerId = PagesIndex.valid_err.PROVIDER_NAME_REQUIRED;
      }
      if (!values.OBT && formik.touched.OBT) {
        errors.OBT = PagesIndex.valid_err.OPEN_BID_TIME_IS_REQUIRED;
      }
      if (!values.CBT && formik.touched.CBT) {
        errors.CBT = PagesIndex.valid_err.CLOSE_BID_TIME_IS_REQUIRED;
      }
      if (!values.OBRT && formik.touched.OBRT) {
        errors.OBRT = PagesIndex.valid_err.OPEN_BID_RESULT_TIME_IS_REQUIRED;
      }

      return errors;
    },

    onSubmit: async (values) => {
      setDisableSubmit(true); // Disable the submit button initially

      try {
        let data = {
          game1: convertTo12HourFormat123(values.OBT),
          game2: convertTo12HourFormat123(values.CBT),
          game3: convertTo12HourFormat123(values.OBRT),
          status: values.isClosed.toString(),
        };

        if (location?.state?.edit === "single") {
          data.gameid = location?.state?.rowData?._id;
        } else if (location?.state?.edit === "multiple") {
          data.gameid = values.providerId;
        } else {
          data.gameDay = values.gameDay;
          data.gameid = values.providerId;
        }

        const res =
          location?.state?.edit === "single"
            ? await PagesIndex.game_service.FOR_STARLINE_AND_JACPOT_UPDATE_ONE_GAME_SETTING_API(
                updateOne,
                data,
                token
              )
            : location?.state?.edit === "multiple"
            ? await PagesIndex.game_service.FOR_STARLINE_AND_JACPOT_UPDATE_GAME_SETTING_API(
                updateAll,
                data,
                token
              )
            : await PagesIndex.game_service.FOR_STARLINE_AND_JACPOT_ADD_API(
                api_Route,
                data,
                token
              );

        if (res?.success || res?.status) {
          PagesIndex.toast.success(res?.message);
          setTimeout(() => {
            navigate(path);
          }, 1000);
        } else {
          PagesIndex.toast.error(res?.response?.data?.message || res?.message);
          setTimeout(() => {
            navigate(path);
          }, 1000);
        }
      } catch (error) {
        // Log the error or display an error message
        PagesIndex.toast.error(
          error?.message || "An unexpected error occurred"
        );
      } finally {
        setDisableSubmit(false); // Re-enable the submit button in all cases
      }
    },
  });

  const fields = [
    {
      name: "providerId",
      label: "Provider Name",
      type: "select",
      disable: location?.state ? true : false,
      options:
        (Data &&
          Data?.map((item) => ({
            label: item.providerName,
            value: item._id,
          }))) ||
        [],
      label_size: 12,
      col_size: 6,
    },
    {
      name: "gameDay",
      label: "Game Day",
      type: "select",
      label_size: 6,
      disable: location?.state ? true : false,
      col_size: 6,
      options: [
        { label: "Full Week", value: "all" },
        { label: "Sunday", value: "Sunday" },
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
      ],
    },
    {
      name: "OBT",
      label: "Open Bid Time",
      type: "time",
      title_size: 6,
      col_size: 6,
    },

    {
      name: "CBT",
      label: "Close Bid Time",
      type: "time",
      title_size: 6,
      col_size: 6,
    },
    {
      name: "OBRT",
      label: "Open Bid Result Time",
      type: "time",
      title_size: 6,
      col_size: 6,
    },
    {
      name: "isClosed",
      label: "Is Closed",
      type: "select",
      label_size: 6,
      col_size: 6,
      options: [
        { label: "Open", value: "1" },
        { label: "Close", value: "0" },
      ],
    },
  ];

  return (
    <PagesIndex.Main_Containt
      add_button={true}
      route={path}
      title={
        location?.state
          ? `${gameType} Game Setting Update`
          : `${gameType} Game Setting Add`
      }
    >
      <PagesIndex.Formikform
        fieldtype={fields.filter((field) => !field.showWhen)}
        formik={formik}
        //   btn_name={loding ? <PagesIndex.Loader text="Submit"/> : "Login"}
        btn_name={location?.state ? "Update" : "Add"}
        button_Size={"w-10"}
        show_submit={true}
        disabledSubmit={DisableSubmit}
      />
      <PagesIndex.Toast />
    </PagesIndex.Main_Containt>
  );
};

export default ForStarlineJackpotAdd;
