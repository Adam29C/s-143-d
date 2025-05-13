import PagesIndex from "../../PagesIndex";
import { getActualDateWithFormat } from "../../../Utils/Common_Date";
import { handleTextFile } from "../../../Utils/ConvertFile";

const DownloadDebitReport = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");

  //set actual date
  const actual_date_formet = getActualDateWithFormat(new Date());

  //all state
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [TableData, setTableData] = PagesIndex.useState([]);
  const [totalAmount, setTotalAmount] = PagesIndex.useState(0);
  const [btnStatus, setBtnStatus] = PagesIndex.useState("");

  // console.log("TableData" ,TableData);

  // const visibleFields = [
  //   "id",
  //   "username",
  //   "account_holder_name",
  //   "bank_name",
  //   "ifsc_code",
  //   "account_no",
  // ];

  const visibleFields = [
    {
      name: "User Name",
      value: "username",
      sortable: true,
    },
    {
      name: "Account Holder",
      value: "account_holder_name",
      sortable: true,
    },
    {
      name: "Bank",
      value: "bank_name",
      sortable: true,
    },
    {
      name: "IFSC",
      value: "ifsc_code",
      sortable: true,
    },
    {
      name: "A/C No",
      value: "account_no",
      sortable: true,
    },
    // {
    //   name: "Amount",
    //   value: "bank_name",
    //   sortable: true,
    // },

    // {
    //   // name: "Profile",
    //   name: "Download MK.txt Report",
    //   isButton: true,
    //   value: "Download MK.txt Report",
    //   className: "color-primary",
    //   Conditions: (row) => {
    //     handleDownloadFiles(row);
    //   },
    // },
  ];

  const handleBtnStatus = (status) => {
    setBtnStatus(status);
    formik.handleSubmit();
  };

  const formik = PagesIndex.useFormik({
    initialValues: {
      searchType: "",
      reportType: "",
      date: actual_date_formet,
    },
    validate: (values) => {
      const errors = {};
      if (!values.searchType) {
        errors.searchType = PagesIndex.valid_err.REQUIRED_SEARCH_TYPE;
      }
      if (!values.reportType) {
        errors.reportType = PagesIndex.valid_err.REQUIRED_REPORT_TYPE;
      }
      return errors;
    },

    onSubmit: async (values) => {
      const data = {
        reportDate: values.date,
        searchType: values.searchType,
        reportType: values.reportType,
      };
      if (btnStatus === "see-report") {
        const res =
          await PagesIndex.admin_services.WALLET_DOWNLOAD_DEBIT_REPORT_API(
            data,
            token
          );

        if (res?.status) {
          setTableData(res.Profile);
          setTotalAmount(res?.totalAmt);
        }
      } else if (btnStatus === "download-report") {
        const apidata = {
          searchType: values.searchType === "0" ? "Approved" : "Pending",
          reportDate: values.date,
        };
        const reportType = values.reportType === "8" ? "mkxls" : "";
        const res = await PagesIndex.admin_services.EXPORT_DEBIT_GET_REPORT_API(
          apidata,
          token,
          reportType
        );
        if (res?.status) {
          if (res?.writeString) {
            handleTextFile(res?.writeString, res?.filename || `MKTTC.txt`);
          } else {
            alert("No Data Available");
          }
        }
      }
    },
  });

  const fields = [
    {
      name: "searchType",
      label: "Search Type",
      type: "select",
      label_size: 12,
      col_size: 4,
      options: [
        {
          label: "All Approved",
          value: "0",
        },
        {
          label: "Approved 1000 Only",
          value: "1",
        },
        {
          label: "Approved Below 5000 Only",
          value: "2",
        },
        {
          label: "Approved Below 20000 Only",
          value: "3",
        },
        {
          label: "Approved Above 20000 Only",
          value: "4",
        },
      ],
    },
    {
      name: "reportType",
      label: "Report Type",
      type: "select",
      label_size: 12,
      col_size: 4,
      options: [
        {
          label: "MK.txt",
          value: "8",
        },
      ],
    },
    {
      name: "date",
      label: "Report Date",
      type: "date",
      label_size: 12,
      col_size: 4,
    },
  ];

  const cardLayouts = [
    {
      size: 12,
      body: (
        <div>
          <PagesIndex.Formikform
            fieldtype={fields.filter((field) => !field.showWhen)}
            formik={formik}
            btn_name={"Get Report"}
            button_Size={"w-15"}
            show_submit={false}
          />
          <div className="report-btn-main mt-3">
            <button
              onClick={() => handleBtnStatus("see-report")}
              className="approve-btn"
            >
              See Report Data
            </button>
            <button
              onClick={() => handleBtnStatus("download-report")}
              className="approve-btn"
            >
              Download Report
            </button>
          </div>
        </div>
      ),
    },

    {
      size: 12,
      body: (
        <div>
          {/* <button
            onClick={() => handleBtnStatus("approve-all")}
            className="approve-btn"
          >
            Approve All
          </button> */}
          {/* <PagesIndex.TableWitCustomPegination
            data={TableData}
            initialRowsPerPage={5}
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
            } */}
          {/* /> */}

          <PagesIndex.TableWithCustomPeginationNew123
            data={TableData}
            initialRowsPerPage={10}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields}
            showIndex={true}
          />

          <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">
            Total Amount {totalAmount}/-
          </h3>
        </div>
      ),
    },
  ];

  return (
    <PagesIndex.Split_Main_Containt
      title={"Download Debit Report"}
      add_button={false}
      cardLayouts={cardLayouts}
    />
  );
};

export default DownloadDebitReport;
