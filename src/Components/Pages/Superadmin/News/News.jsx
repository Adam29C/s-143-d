import React from "react";
import PagesIndex from "../../PagesIndex";

const News = () => {
  const token = localStorage.getItem("token");
  //all states
  const [newsData, setNewsData] = PagesIndex.useState();

  //get news api
  const getNewsData = async () => {
    const res = await PagesIndex.common_services.GET_NEWS_API(token);
    if (res?.status) {
      setNewsData(res?.data?.[0]);
    }
  };
  // console.log(newsData?.Description);
  //function call with useeffect
  PagesIndex.useEffect(() => {
    getNewsData();
  }, []);

  //formik form submit
  const formik = PagesIndex.useFormik({
    initialValues: {
      note: "",
    },

    validate: (values) => {
      const errors = {};
      if (!values.note && formik.touched.note) {
        errors.note = PagesIndex.valid_err.REQUIRE_MESSAGE;
      }

      return errors;
    },
    onSubmit: async (values) => {
      const apidata = {
        id: newsData?._id,
        note: values.note,
      };

      const res = await PagesIndex.common_services.UPDATE_NEWS_API(
        apidata,
        token
      );

      if (res.status) {
        PagesIndex.toast.success(res.message);
        getNewsData();
      }
    },
  });

  const fields = [
    {
      name: "note",
      label: "Message",
      type: "msgbox",
      label_size: 12,
      col_size: 12,
    },
  ];
  return (
    <PagesIndex.Main_Containt title="News" col_size={12}>
      <PagesIndex.Formikform
        fieldtype={fields.filter((field) => !field.showWhen)}
        formik={formik}
        show_submit={true}
        btn_name="Submit"
      />
      <h4 class="news-header-title mt-4" id="news">
        {newsData?.Description}
      </h4>
      <PagesIndex.Toast />
    </PagesIndex.Main_Containt>
  );
};

export default News;
