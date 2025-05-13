import React, { useEffect, useState } from "react";
import Split_Main_Containt from "../../../../../Layout/Main/Split_Main_Content";
import PagesIndex from "../../../../PagesIndex";
import { getActualDateFormate, today } from "../../../../../Utils/Common_Date";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Games_Provider_List ,Games_Provider_List1 } from "../../../../../Redux/slice/CommonSlice";

const ExamplePage = () => {
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
  const [DisableSubmit, setDisableSubmit] = PagesIndex.useState(false);
  const [DisableSubmit1, setDisableSubmit1] = PagesIndex.useState(false);

  //get data in redux
  const data = PagesIndex.useSelector((state) => {
    return state.CommonSlice.gameProviders1;
  });


  console.log("data1111111111" ,data);
  
  //get game result function
  const getGameResultApi = async () => {
    const res = await PagesIndex.admin_services.GAME_RESULT(token);

    if (res.status) {
      setTableData(res?.data?.result);
    }
  };

  //get game provider data
  const getGameProvidersList = () => {
    dispatch(Games_Provider_List1(token));
  };

  //get apis functions call in useEffect
  PagesIndex.useEffect(() => {
    getGameProvidersList();
    getGameResultApi();
  }, []);

  //set id and provider name in form functions
  const handleProviderChange = (e) => {
    const selectedProviderId = e.target.value;
    const selectedProviderName = data.find(
      (item) => item._id === selectedProviderId
    )?.providerName;

    // Update formik values
    formik.setFieldValue("providerId", selectedProviderId);
    formik.setFieldValue("providerName", selectedProviderName);
  };

  //formik form
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

      if (!values.session) {
        setDisableSubmit(!DisableSubmit);

        errors.session = PagesIndex.valid_err.GAME_SESSION_ERROR;
      }

      if (!values.resultDate) {
        errors.resultDate = PagesIndex.valid_err.DOMAIN_ERROR;
      }

      if (!values.winningDigit) {
        errors.winningDigit = PagesIndex.valid_err.GAME_WINING_DIGIT_ERROR;
      } else if (values.winningDigit.length > 3) {
        errors.winningDigit = "Only 3 digit allowed";
      }

      return errors;
    },

    onSubmit: async (values) => {
      setDisableSubmit(true);
      const req = {
        winningDigit: +values.winningDigit,
        resultDate: today(values.resultDate),
        session: values.session,
        providerId: values.providerId,
        providerName: values.providerName,
      };

      try {
        const res = await PagesIndex.admin_services.ADD_GAME_RESULT(req, token);
        // console.log(res)
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
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        PagesIndex.toast.error(errorMessage);
      } finally {
        setDisableSubmit(false);
      }
    },
  });

  // useEffect(() => {
  //   formik.resetForm();
  //   // formik.handleChange();
  // }, [DisableSubmit]);

  useEffect(() => {
    if (data?.length > 0) {
      formik.setFieldValue("providerId", data[0]._id);
      formik.setFieldValue("providerName", data[0].providerName);
    }
  }, [data]);

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
      setDisableSubmit1(!DisableSubmit1);

      const apidata = values.date;
      try {
        const res = await PagesIndex.admin_services.GAME_RESULT_DATEWISE(
          apidata,
          token
        );

        if (res.status) {
          PagesIndex.toast.success(res.message);
          setTableData(res.data.results);
          setPastResultCount({
            countResults: res.data.countResults,
            pendingCount: res.data.pendingCount,
            providerCount: res.data.providerCount,
          });
        } else {
          PagesIndex.toast.error(res.message);
        }
      } catch (error) {
        PagesIndex.toast.error(error.response.data.message);
      } finally {
        setDisableSubmit1(false); // Enable button after response
      }
    },
  });

  const fields = [
    {
      name: "providerId",
      label: "Provider Name",
      type: "select",
      options:
        data?.map((item) => ({
          label: item.providerName,
          value: item._id,
        })) || [],
      label_size: 12,
      col_size: 3,
      onChange: handleProviderChange,
    },

    {
      name: "session",
      label: "Session",
      type: "select",
      options: [
        { label: "Open", values: "Open" },
        { label: "Close", values: "Close" },
      ],
      label_size: 12,
      col_size: 3,
    },
    {
      name: "resultDate",
      label: "Result Date",
      type: "date",
      label_size: 12,
      col_size: 3,
      // min: { actual_date_formet },
      max: { actual_date_formet },
    },
    {
      name: "winningDigit",
      label: "Winning Digit",
      type: "text",
      label_size: 12,
      col_size: 3,
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
    };

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this game?"
    );
    if (!confirmDelete) return;

    try {
      const res = await PagesIndex.admin_services.GAME_RESULT_DELETE(
        apidata,
        token
      );

      if (res.statusCode === 200 || res.status) {
        alert(res?.message);
        getGameResultApi();
      } else {
        PagesIndex.toast.error(res.response.data.message);
      }
    } catch (error) {}
  };

  const winnerList = (rowdata) => {
    navigate(`winners?providerId=${rowdata.providerId}`, {
      state: { rowdata },
    });
  };

  //handle actions button function
  const handleActionBtn = (row, buttonStatus) => {
    if (buttonStatus === 1) {
      winnerList(row);
    } else if (buttonStatus === 2) {
      handleDelete(row);
    } else {
      return "";
    }
  };

  const visibleFields = [
    {
      name: "provider Name",
      value: "providerName",
      sortable: true,
    },
    {
      name: "Session",
      value: "session",
      sortable: true,
    },
    {
      name: "Result Date",
      value: "resultDate",
      sortable: true,
    },
    {
      name: "winning Digit",
      value: "winningDigit",
      sortable: true,
    },

    {
      name: "Get Winners List",
      value: "Get Winners List",
      buttonColor: "info",
      isButton: true,
      Conditions: (row) => {
        handleActionBtn(row, 1);
      },
    },
    {
      name: "Delete Result",
      value: "Delete Result",
      className: (row) => {
        return row.status === 1 ? "d-none" : "";
      },
      buttonColor: "danger",
      isButton: true,
      Conditions: (row) => {
        handleActionBtn(row, 2);
      },
    },
  ];

  // const clear = ()=>{
  //   setDisableSubmit(false)

  // }

  console.log(tableData);

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
            show_clear={true}
            disabledSubmit={DisableSubmit}

            // after_submit_button={
            //   <>
            //     <button
            //       className=" mx-2 btn btn-danger"
            //       onClick={() =>clear()}
            //     >
            //       click
            //     </button>
            //   </>
            // }
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
              disabledSubmit={DisableSubmit1}
            />
          </div>
        </div>
      ),
    },
    {
      size: 12,
      body: (
        <div>
          {PastResultCount && Object.keys(PastResultCount).length > 0 && (
            <h6 className="text-center fw-bold">
              Total Result Declared : {PastResultCount.countResults}, Total
              Result To Declared : {PastResultCount.providerCount * 2}, Pending
              Result : {PastResultCount.pendingCount}
            </h6>
          )}

          <PagesIndex.TableWithCustomPeginationNew123
            data={tableData}
            initialRowsPerPage={25}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields}
            searchInput={
              <input
                type="text"
                placeholder="Search..."
                value={SearchInTable}
                onChange={(e) => setSearchInTable(e.target.value)}
                className="form-control ms-auto"
              />
            }
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
