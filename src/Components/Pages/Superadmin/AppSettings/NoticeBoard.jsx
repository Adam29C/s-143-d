import React from "react";
import PagesIndex from "../../PagesIndex";

const NoticeBoard = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");

  //all states
  const [loading, setLoading] = PagesIndex.useState(true);
  const [noticeData, setNoticeData] = PagesIndex.useState();

  //get notice api
  const getNoticeData = async () => {
    const res = await PagesIndex.admin_services.GET_NOTICE_BOARD_API(token);
    if (res?.status) {
      setNoticeData(res?.data?.[0]);
      setLoading(false);
    }
  };

  //function call with useeffect
  PagesIndex.useEffect(() => {
    getNoticeData();
  }, []);

  const abcde = () => {
    if (noticeData) {
      formik.setFieldValue("title1", noticeData?.title1);
      formik.setFieldValue("contect", noticeData?.contact);
      formik.setFieldValue("description1", noticeData?.description1);
      formik.setFieldValue("title2", noticeData?.title2);
      formik.setFieldValue("description2", noticeData?.description2);
      formik.setFieldValue("title3", noticeData?.title3);
      formik.setFieldValue("description3", noticeData?.description3);
    }
  };

  PagesIndex.useEffect(() => {
    abcde();
  }, [noticeData]);

  //contact number validation regex
  const contactRegex = (numbervalue) => {
    return PagesIndex.Mobile_regex(numbervalue);
  };

  //formik form submit
  const formik = PagesIndex.useFormik({
    initialValues: {
      title1: noticeData && noticeData?.title1,
      contect: noticeData && noticeData?.contact,
      description1: noticeData && noticeData?.description1,
      title2: noticeData && noticeData?.title2,
      description2: noticeData && noticeData?.description2,
      title3: noticeData && noticeData?.title3,
      description3: noticeData && noticeData?.description3,
    },

    validate: (values) => {
      const errors = {};
      if (!values.contect && formik.touched.contect) {
        errors.contect = PagesIndex.valid_err.CONTACT_ERROR;
      } else if (!contactRegex(values.contect) && formik.touched.contect) {
        errors.contect = PagesIndex.valid_err.INVALID_CONTACT_ERROR;
      }

      if (!values.title1 && formik.touched.title1) {
        errors.title1 = PagesIndex.valid_err.TITLE_ERROR;
      }

      if (!values.description1 && formik.touched.description1) {
        errors.description1 = PagesIndex.valid_err.DESCRIPTION_ERROR;
      }
      if (!values.title2 && formik.touched.title2) {
        errors.title2 = PagesIndex.valid_err.TITLE_ERROR;
      }

      if (!values.description2 && formik.touched.description2) {
        errors.description2 = PagesIndex.valid_err.DESCRIPTION_ERROR;
      }
      if (!values.title3 && formik.touched.title3) {
        errors.title3 = PagesIndex.valid_err.TITLE_ERROR;
      }

      if (!values.description3 && formik.touched.description3) {
        errors.description3 = PagesIndex.valid_err.DESCRIPTION_ERROR;
      }

      return errors;
    },
    onSubmit: async (values) => {
      const apidata = {
        id: noticeData?._id,
        title1: values.title1,
        title2: values.title2,
        title3: values.title3,
        desc1: values.description1,
        desc2: values.description2,
        desc3: values.description3,
        contact: values.contect,
      };

      const res = await PagesIndex.admin_services.UPDATE_NOTICE_BOARD_API(
        apidata,
        token
      );

      if (res.status) {
        PagesIndex.toast.success(res.message);
        getNoticeData();
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
      name: "title1",
      label: "Section 1 Title",
      type: "text",
      label_size: 12,
      col_size: 12,
    },
    {
      name: "description1",
      label: "Description",
      type: "msgbox",
      label_size: 12,
      col_size: 12,
    },

    {
      name: "contect",
      label: "Contact",
      type: "number",
      label_size: 12,
      col_size: 12,
    },
  
    {
      name: "title2",
      label: "Section 2 Title",
      type: "text",
      label_size: 12,
      col_size: 12,
    },
    {
      name: "description2",
      label: "Description",
      type: "msgbox",
      label_size: 12,
      col_size: 12,
    },
    {
      name: "title3",
      label: "Section 3 Title",
      type: "text",
      label_size: 12,
      col_size: 12,
    },
    {
      name: "description3",
      label: "Description",
      type: "msgbox",
      label_size: 12,
      col_size: 12,
    },
  ];

  return (
    <PagesIndex.Main_Containt title="Update Notice Board" col_size={12}>
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

export default NoticeBoard;
