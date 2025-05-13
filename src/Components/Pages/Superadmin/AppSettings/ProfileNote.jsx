import React, { useEffect, useState } from "react";
import PagesIndex from "../../PagesIndex";

const ProfileNote = () => {
  const token = localStorage.getItem("token");

  //all state
  const [getProfileData, setGetProfileData] = useState([]);

  
  //get profile note api
  const getProfileNote = async () => {
    const res = await PagesIndex.admin_services.GET_PROFILE_NOTE_API(token);
    setGetProfileData(res?.data?.[0]);
  };

  useEffect(() => {
    getProfileNote();
  }, []);

  //set inital value in formik
  const noteValueSet = () => {
  //  formik.setFieldValue("note", getProfileData?.note);
  };

  useEffect(() => {
    noteValueSet();
  }, [getProfileData]);

  //formik form submit
  const formik = PagesIndex.useFormik({
    initialValues: {
      note: "",
    },

    validate: (values) => {
      const errors = {};
      if (!values.note && formik.touched.note) {
        errors.note = PagesIndex.valid_err.PROFILE_NOTE_REQUIRE;
      }

      return errors;
    },
    onSubmit: async (values) => {
      const apidata = {
        id: getProfileData?._id,
        note: values.note,
      };
      const res = await PagesIndex.admin_services.UPDATE_PROFILE_NOTE_API(
        apidata,
        token
      );
      if (res.status) {
        PagesIndex.toast.success(res.message);
        getProfileNote();
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
      name: "note",
      label: "Note",
      type: "text",
      label_size: 12,
      col_size: 12,
    },
  ];

  return (
    <PagesIndex.Main_Containt title="Profile Note" col_size={12}>
      <PagesIndex.Formikform
        fieldtype={fields.filter((field) => !field.showWhen)}
        formik={formik}
        show_submit={true}
        btn_name="Submit"
      />
      <div class="form-group text-right mb-0">
        <h4 class="profile-note-title mt-0 mb-3" id="note">
         {getProfileData.note}
        </h4>
      </div>
      <PagesIndex.Toast />
    </PagesIndex.Main_Containt>
  );
};

export default ProfileNote;
