import React from "react";
import PagesIndex from "../../../Pages/PagesIndex";

const ForStarlineAndJackpot = ({gametype,listpath , }) => {

  const userId = localStorage.getItem("userId");
  const navigate = PagesIndex.useNavigate();
  const location = PagesIndex.useLocation();

  const formik = PagesIndex.useFormik({
    initialValues: {
      providerName: location?.state ? location?.state?.providerName : "",
      providerResult: location?.state ? location?.state?.providerResult : "",
      resultStatus: 0,
      mobile: location?.state ? location?.state?.mobile : "",
      activeStatus: location?.state ? location?.state?.activeStatus : null,
    },
    validate: (values) => {
      const errors = {};

      if (!values.providerName) {
        errors.providerName = PagesIndex.valid_err.PROVIDER_NAME_ERROR;
      }

      if (!values.providerResult) {
        errors.providerResult = PagesIndex.valid_err.PROVIDER_RESULT_ERROR;
      }

      // if (!values.mobile) {
      //   errors.mobile = PagesIndex.valid_err.CONTACT_ERROR;
      // }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        let data = {
          adminId: userId,
          gameType:gametype,
          providerName: values.providerName,
          providerResult: values.providerResult,
          mobile: "0",
          activeStatus: values.activeStatus,
          ...(location?.state?._id ? { providerId: location?.state?._id } : ""),
        };
        if (!location?.state?._id) {
          data.resultStatus = values.resultStatus;
        }

        const res = location?.state?._id
          ? await PagesIndex.admin_services.GAME_PROVIDER_UPDATE_API(data)
          : await PagesIndex.admin_services.GAME_PROVIDER_ADD_API(data);

        if (res?.status === 200) {
          PagesIndex.toast.success(res?.message);
          setTimeout(() => {
            navigate(listpath);
          }, 1000);
        } else {
          PagesIndex.toast.error(res.response.data.message);
        }
      } catch (error) {
        PagesIndex.toast.error(error);
      }
    },
  });

  const fields = [
    {
      name: "providerName1212",
      label: "Provider Name",
      type: "date",
      label_size: 6,
      col_size: 6,
    },
    {
      name: "providerResult",
      label: "Provider Result",
      type: "text",
      label_size: 6,
      col_size: 6,
    },
    // {
    //   name: "mobile",
    //   label: "Mobile",
    //   type: "number",
    //   label_size: 6,
    //   col_size: 6,
    // },

    {
      name: "activeStatus",
      label: "Disable Provider",
      type: "select",
      title_size: 6,
      col_size: 12,
      options: [
        {
          label: "Active",
          value: true,
        },
        {
          label: "In-Active",
          value: false,
        },
      ],
    },
  ];

  return (
    <PagesIndex.Main_Containt
      add_button={true}
      route={listpath}
      title={location?.state ? `Edit ${gametype}` : `Add ${gametype}`}
      btnTitle="Back"
    >
      <PagesIndex.Formikform
        fieldtype={fields.filter((field) => !field.showWhen)}
        formik={formik}
        //   btn_name={loding ? <PagesIndex.Loader text="Submit"/> : "Login"}
        btn_name={location?.state ? "Update " : "Add"}
        button_Size={"w-10"}
        show_submit={true}
      />
      <PagesIndex.Toast />
    </PagesIndex.Main_Containt>
  );
};

export default ForStarlineAndJackpot;
