import React from "react";
import PagesIndex from "../../PagesIndex";

const WithdrawScreen = () => {
const token =  localStorage.getItem("token")
  //all states
  const [loading, setLoading] = PagesIndex.useState(true);
  const [withdrawData, setWithdrawData] = PagesIndex.useState();

  //get wallet api
  const getNoticeData = async () => {
    const res = await PagesIndex.admin_services.GET_APP_WITHDRAW_API(token);
    if (res?.status) {
      setWithdrawData(res?.data);
      setLoading(false);
    }
  };

  //function call with useeffect
  PagesIndex.useEffect(() => {
    getNoticeData();
  }, []);

  const abcde = () => {
    if (withdrawData) {
      formik.setFieldValue("textMain", withdrawData?.textMain);
      formik.setFieldValue("textSecondry", withdrawData?.textSecondry);
      formik.setFieldValue("Number", withdrawData?.Number);
      formik.setFieldValue("Timing", withdrawData?.Timing);
    }
  };

  PagesIndex.useEffect(() => {
    abcde();
  }, [withdrawData]);

  //contact number validation regex
  const contactRegex = (numbervalue) => {
    return PagesIndex.Mobile_regex(numbervalue);
  };

  //formik form submit
  const formik = PagesIndex.useFormik({
    initialValues: {
      textMain: "",
      textSecondry: "",
      Number: "",
      Timing: "",
    },

    validate: (values) => {
      const errors = {};
      if (!values.textMain && formik.touched.textMain) {
        errors.textMain = PagesIndex.valid_err.TITLE_ERROR;
      }

      if (!values.textSecondry && formik.touched.textSecondry) {
        errors.textSecondry = PagesIndex.valid_err.TITLE_ERROR;
      }

      if (!values.Number && formik.touched.Number) {
        errors.Number = PagesIndex.valid_err.CONTACT_ERROR;
      } else if (!contactRegex(values.Number) && formik.touched.Number) {
        errors.Number = PagesIndex.valid_err.INVALID_CONTACT_ERROR;
      }

      return errors;
    },
    onSubmit: async (values) => {
      const apidata = {
        id: withdrawData?._id,
        pri_title: values.textMain,
        sec_title: values.textSecondry,
        number: +values.Number,
        timing: values.Timing,
      };

      const res = await PagesIndex.admin_services.UPDATE_APP_WITHDRAW_API(apidata,token);

      if (res.status) {
        PagesIndex.toast.success(res.message);
        getNoticeData();
      }
    },
  });

  const fields = [
    {
      name: "textMain",
      label: "Title",
      type: "msgbox",
      label_size: 12,
      col_size: 12,
    },

    {
      name: "textSecondry",
      label: "Secondry Title",
      type: "msgbox",
      label_size: 12,
      col_size: 12,
    },
    {
      name: "Number",
      label: "Number",
      type: "number",
      label_size: 12,
      col_size: 12,
    },
    {
      name: "Timing",
      label: "Timing",
      type: "text",
      label_size: 12,
      col_size: 12,
    },
  ];

  return (
    <PagesIndex.Main_Containt title="App Withdraw Text" col_size={12}>
      {loading ? (
        <PagesIndex.Loader lodersize={20} />
      ) : (
        <PagesIndex.Formikform
          fieldtype={fields.filter((field) => !field.showWhen)}
          formik={formik}
          show_submit={true}
          btn_name="Submit"
        />
    )} 
      <PagesIndex.Toast />
    </PagesIndex.Main_Containt>
  );
};

export default WithdrawScreen;
