import React from "react";
import PagesIndex from "../../PagesIndex";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";

const WalletContact = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");

  //all states
  const [walletContactData, setWalletContactData] = PagesIndex.useState("");
  const [walletHeadlineData, setWalletHeadlineData] = PagesIndex.useState("");
  const [walletUpiData, setWalletUpiData] = PagesIndex.useState("");


  //get wallet contact api
  const getWalletContactData = async () => {
    const res = await PagesIndex.admin_services.GET_WALLET_CONTACT_API(token);
    if (res?.status) {
      setWalletContactData(res?.data?.[0]);
    }
  };

  //get wallet Headline api
  const getWalletHeadlineData = async () => {
    const res = await PagesIndex.admin_services.GET_WALLET_HEADLINE_API(token);
    if (res?.status) {
      setWalletHeadlineData(res?.data?.[0]);
    }
  };

  //get wallet upi api
  const getWalletUpiData = async () => {
    const res = await PagesIndex.admin_services.GET_WALLET_UPI_API(token);
    if (res?.status) {
      setWalletUpiData(res?.data?.[0]);
    }
  };

  //function call with useeffect
  PagesIndex.useEffect(() => {
    getWalletContactData();
    getWalletHeadlineData();
    getWalletUpiData();
  }, []);

  //set initial value in formik fields
  const walletValueSet = () => {
    if (walletContactData && walletHeadlineData && walletUpiData) {
      formik.setFieldValue("number", walletContactData?.number);
      formik1.setFieldValue("headline", walletHeadlineData?.headline);
      formik2.setFieldValue("upi", walletUpiData?.upiId);
    }
  };

  PagesIndex.useEffect(() => {
    walletValueSet();
  }, [walletContactData, walletHeadlineData, walletUpiData]);

  //contact number validation regex
  const contactRegex = (numbervalue) => {
    return PagesIndex.Mobile_regex(numbervalue);
  };

  //formik form submit
  const formik = PagesIndex.useFormik({
    initialValues: {
      number: "",
    },

    validate: (values) => {
      const errors = {};

      if (!values.number && formik.touched.number) {
        errors.number = PagesIndex.valid_err.CONTACT_ERROR;
      } else if (!contactRegex(values.number) && formik.touched.number) {
        errors.number = PagesIndex.valid_err.INVALID_CONTACT_ERROR;
      }
      return errors;
    },
    onSubmit: async (values) => {
      const apidata = {
        id: walletContactData?._id,
        number: +values.number,
      };

      const res = await PagesIndex.admin_services.UPDATE_WALLET_CONTACT_API(
        apidata,
        token
      );

      if (res.status) {
        PagesIndex.toast.success(res.message);
        getWalletContactData();
      } else {
        PagesIndex.toast.error(res.message);
      }
      if (res?.status === 404) {
        PagesIndex.toast.error(res?.data?.message);
      }
    },
  });
  const formik1 = PagesIndex.useFormik({
    initialValues: {
      headline: "",
    },

    validate: (values) => {
      const errors = {};
      if (!values.headline) {
        errors.headline = PagesIndex.valid_err.PLEASER_ENTER_HEADLINE;
      }

      return errors;
    },
    onSubmit: async (values) => {
      const apidata = {
        id: walletHeadlineData?._id,
        headline: values.headline,
      };
      const res = await PagesIndex.admin_services.UPDATE_WALLET_HEADLINE_API(
        apidata,
        token
      );

      if (res.status) {
        PagesIndex.toast.success(res.message);
        getWalletHeadlineData();
      } else {
        PagesIndex.toast.error(res.message);
      }
      if (res?.status === 404) {
        PagesIndex.toast.error(res?.data?.message);
      }
    },
  });
  const formik2 = PagesIndex.useFormik({
    initialValues: {
      upi: "",
    },

    validate: (values) => {
      const errors = {};
      if (!values.upi) {
        errors.upi = PagesIndex.valid_err.EMPTY_UPI_ERROR;
      }
      return errors;
    },
    onSubmit: async (values) => {
      const apidata = {
        id: walletUpiData?._id,
        upi: values.upi,
      };

      const res = await PagesIndex.admin_services.UPDATE_WALLET_UPI_API(
        apidata,
        token
      );

      if (res.status) {
        PagesIndex.toast.success(res.message);
        getWalletUpiData();
      } else {
        PagesIndex.toast.error(res.message);
      }
      if (res?.status === 404) {
        PagesIndex.toast.error(res?.data?.message);
      }
    },
  });

  const fields = [
    {
      name: "number",
      label: "Contact No",
      type: "number",
      label_size: 12,
      col_size: 12,
    },
  ];
  const fields1 = [
    {
      name: "headline",
      label: "Headline",
      type: "text",
      label_size: 12,
      col_size: 12,
    },
  ];
  const fields2 = [
    {
      name: "upi",
      label: "UPI Name",
      type: "text",
      label_size: 12,
      col_size: 12,
    },
  ];

  const cardLayouts = [
    {
      size: 12,
      body: (
        <div>
          <div>
            <h4 class="profile-note-title mt-0 mb-4">
              Update Wallet related query contact no
            </h4>
          </div>
          <PagesIndex.Formikform
            fieldtype={fields.filter((field) => !field.showWhen)}
            formik={formik}
            show_submit={true}
            btn_name="Submit"
          />
        </div>
      ),
    },
    {
      size: 12,
      body: (
        <div>
          <div>
            <h4 class="profile-note-title mt-0 mb-4">
              Update Application Headline
            </h4>
          </div>
          <PagesIndex.Formikform
            fieldtype={fields1.filter((field) => !field.showWhen)}
            formik={formik1}
            show_submit={true}
            btn_name="Submit"
          />
        </div>
      ),
    },
    {
      size: 12,
      body: (
        <div>
          <div>
            <h4 class="profile-note-title mt-0 mb-4">Update UPI</h4>
          </div>
          <PagesIndex.Formikform
            fieldtype={fields2.filter((field) => !field.showWhen)}
            formik={formik2}
            show_submit={true}
            btn_name="Submit"
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Split_Main_Containt
        title="Wallet Contact"
        add_button={false}
        cardLayouts={cardLayouts}
      />
      <PagesIndex.Toast />
    </>
  );
};

export default WalletContact;
