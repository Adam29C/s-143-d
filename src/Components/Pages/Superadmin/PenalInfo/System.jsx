import React from "react";
import PagesIndex from "../../PagesIndex";

const System = () => {
  const userId = localStorage.getItem("userId");
  const navigate = PagesIndex.useNavigate();
  const [data, setData] = PagesIndex.useState(null);

  const isValidImage = (value) => {
    return PagesIndex.Image_Regexp(value);
  };

  const getSystemListInfo = async () => {
    try {
      const res = await PagesIndex.LIST_SYSTEM_INFO_API();
      setData(res?.data?.details[0]);
    } catch (error) {}
  };


  PagesIndex.useEffect(() => {
    getSystemListInfo();
  }, []);

  const formik = PagesIndex.useFormik({
    initialValues: {
      title: data?.title || "",
      logo: data?.logo || "",
      fav_icon: data?.favIcon || "",
      login_background: data?.backgroundImage || "",
    },
    enableReinitialize: true, 
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = PagesIndex.valid_err.TITLE_ERROR;
      }
      if (!values.fav_icon) {
        errors.fav_icon = PagesIndex.valid_err.EMPTY_FAV_ICON;
      } 
      else if (!isValidImage(values.fav_icon)) {
        errors.fav_icon = PagesIndex.valid_err.UPLOAD_IMAGE_VALID;
      }
      if (!values.logo) {
        errors.logo = PagesIndex.valid_err.EMPTY_LOGO;
      } 
      else if (!isValidImage(values.logo)) {
        errors.logo = PagesIndex.valid_err.UPLOAD_IMAGE_VALID;
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        let formData = new FormData();
        formData.append("adminId", userId);
        formData.append("title", values.title);
        formData.append("logo", values.logo);
        formData.append("favIcon", values.fav_icon);
        formData.append("backgroundImage", values.login_background);
        formData.append("systemInfoId", data?._id);

        const res =  await PagesIndex.UPDATE_SYSTEM_INFO_API(formData)
          if (res?.status === 200) {
          PagesIndex.toast.success(res?.message);
          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 1000);
        }

      } catch (error) {
        PagesIndex.toast.error(error || error.message)
      }
    },
  });

  const fields = [
    {
      name: "title",
      label: "Title",
      type: "text",
      label_size: 12,
      col_size: 12,
    },
    {
      name: "logo",
      label: "Logo",
      type: "file",
      label_size: 12,
      col_size: 6,
    },
    {
      name: "fav_icon",
      label: "Fav Icon",
      type: "file",
      label_size: 12,
      col_size: 6,
    },
    {
      name: "login_background",
      label: "Login Background",
      type: "file",
      label_size: 12,
      col_size: 6,
    },
  ];

 

  return (
    <PagesIndex.Main_Containt title="Add Users" col_size={12}>
      <PagesIndex.Formikform
        fieldtype={fields.filter((field) => !field.showWhen)}
        formik={formik}
        btn_name="Add Info"
        additional_field={
          <>
            {formik.errors.title && (
              <div style={{ color: "red" }}>{formik.errors.title}</div>
            )}
          </>
        }
        show_submit={true}
      />
      <PagesIndex.Toast />
    </PagesIndex.Main_Containt>
  );
};

export default System;
