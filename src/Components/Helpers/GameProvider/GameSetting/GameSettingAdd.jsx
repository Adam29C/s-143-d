import React from "react";
import PagesIndex from "../../../Pages/PagesIndex";
// import { convertTo12HourFormat } from "../../../Utils/Common_Date";

import {
  convertTo12HourFormat,
  convertTo12HourFormat123,
} from "../../../Utils/Common_Date";

const GameProviderAdd = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = PagesIndex.useNavigate();
  const location = PagesIndex.useLocation();
  const dispatch = PagesIndex.useDispatch();

  const data = PagesIndex.useSelector((state) => {
  console.log("data" ,state.CommonSlice);

    return state.CommonSlice.gameProviders1;
  });

 

  const getGameProviderList = () => {
    let providerapidata = {
      userId: userId,
      gameType: "MainGame",
    };
    dispatch(PagesIndex.commonSlice.Games_Provider_List1(token));
  };

  PagesIndex.useEffect(() => {
    getGameProviderList();
  }, []);

  const formik = PagesIndex.useFormik({
    initialValues: {
      providerId: location?.state?.row ? location?.state?.row?._id : null,
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
      CBRT: location?.state?.rowData
        ? convertTo12HourFormat(location?.state?.rowData.CBRT)
        : "",
      isClosed: location?.state?.rowData
        ? location?.state?.rowData.isClosed
        : "1",
    },
    validate: (values) => {
      const errors = {};
      if (!values.providerId) {
        errors.providerId = PagesIndex.valid_err.PROVIDER_NAME_REQUIRED;
      }
      if (!values.OBT) {
        errors.OBT = PagesIndex.valid_err.OPEN_BID_TIME_IS_REQUIRED;
      }
      if (!values.CBT) {
        errors.CBT = PagesIndex.valid_err.CLOSE_BID_TIME_IS_REQUIRED;
      }
      if (!values.OBRT) {
        errors.OBRT = PagesIndex.valid_err.OPEN_BID_RESULT_TIME_IS_REQUIRED;
      }
      if (!values.CBRT) {
        errors.CBRT = PagesIndex.valid_err.CLOSE_BID_RESULT_TIME_IS_REQUIRED;
      }

      return errors;
    },

    onSubmit: async (values) => {
      let data = {
        gameDay: values.gameDay,
        game1: convertTo12HourFormat123(values.OBT),
        game2: convertTo12HourFormat123(values.CBT),
        game3: convertTo12HourFormat123(values.OBRT),
        game4: convertTo12HourFormat123(values.CBRT),
        status: values.isClosed.toString(),
      };




      if (location?.state?.edit === "single") {
        data.gameid = location?.state?.rowData?._id;
      } else if (location?.state?.edit === "multiple") {
        // data.providerId = values.providerId;
        data.gameid = values.providerId;
      } else {
        // data.providerId = values.providerId;
        data.gameDay = values.gameDay;
        data.gameid = values.providerId;
      }

      const res =
        location?.state?.edit === "single"
          ? await PagesIndex.admin_services.GAME_SETTING_UPDATE_API(data, token)
          : location?.state?.edit === "multiple"
          ? await PagesIndex.admin_services.GAME_SETTING_UPDATEALL_API(
              data,
              token
            )
          : await PagesIndex.admin_services.GAME_SETTING_ADD(data, token);

      if (res?.status) {
        PagesIndex.toast.success(res?.message);
        setTimeout(() => {
          navigate("/admin/game/settings");
        }, 1000);
      } else {
        PagesIndex.toast.error(res.response.data.message);
        setTimeout(() => {
          navigate("/admin/game/settings");
        }, 1000);
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
        data?.map((item) => ({
          label: item.providerName,
          value: item._id,
        })) || [],
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
      name: "CBRT",
      label: "Close Bid Result Time",
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
      route="/admin/game/settings"
      title={`Game Setting ${
        location?.state?.edit === "single"
          ? "Update"
          : location?.state?.edit == "multiple"
          ? "Update All "
          : "Add"
      }`}
    >
      <PagesIndex.Formikform
        fieldtype={fields.filter((field) => !field.showWhen)}
        formik={formik}
        //   btn_name={loding ? <PagesIndex.Loader text="Submit"/> : "Login"}
        btn_name={location?.state ? "Update" : "Add"}
        button_Size={"w-10"}
        show_submit={true}
      />
      <PagesIndex.Toast />
    </PagesIndex.Main_Containt>
  );
};

export default GameProviderAdd;
