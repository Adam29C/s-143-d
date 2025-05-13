import React from "react";
import PagesIndex from "../../PagesIndex";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
import { getActualDateWithFormat } from "../../../Utils/Common_Date";
const CreditRequest = () => {
  //get token in local storage
  const token = localStorage.getItem("token");

  //set actual date
  const actual_date_formet = getActualDateWithFormat(new Date());

  //dispatch
  const dispatch = PagesIndex.useDispatch();

  //all state
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [tableData, setTableData] = PagesIndex.useState([]);
  const [DisableSubmit, setDisableSubmit] = PagesIndex.useState(false);

  // get api credit request upi

  const getCreditRequest = async (date = actual_date_formet) => {
   try {
    const payload = {
      date_cust: date,
      page: 1,
      limit: 10,
      search: SearchInTable,
    };
    const res = await PagesIndex.admin_services.GET_CREDIT_REQUEST_UPI_API(
      payload,
      token
    );
    if (res?.status) {
      setTableData(res?.approvedData);
    }
   } catch (error) {
    
   }finally{
    setDisableSubmit(false);
   }
  };

  PagesIndex.useEffect(() => {
    getCreditRequest();
  }, []);

  const formik = PagesIndex.useFormik({
    initialValues: {
      date: actual_date_formet || null,
    },
    validate: (values) => {},

    onSubmit: async (values) => {
      setDisableSubmit(!DisableSubmit);

      getCreditRequest(values.date);
    },
  });

  const totalAmount =
    tableData &&
    tableData.reduce((acc, item) => acc + (item?.reqAmount || 0), 0);

  const fields = [
    {
      name: "date",
      label: "Search By Approve Date",
      type: "date",
      label_size: 12,
      col_size: 12,
    },
  ];

  // const visibleFields = [
  //   "id",
  //   "username",
  //   "fullname",
  //   "mobile",
  //   "reqStatus",
  //   "reqDate",
  //   "reqTime",
  //   "paymentMode",
  //   "reqAmount",
  // ];

  const visibleFields = [
    {
      name: "User Name",
      value: "username",
      sortable: false,
    },
    {
      name: "Full name",
      value: "fullname",
      sortable: false,
    },
    {
      name: "Mobile",
      value: "mobile",
      sortable: false,
    },
    {
      name: "Status",
      value: "reqStatus",
      sortable: false,
    },
    {
      name: "Time",
      value: "reqDate",
      sortable: false,
    },
    {
      name: "Mode",
      value: "paymentMode",
      sortable: false,
    },
    {
      name: "Amount",
      value: "reqAmount",
      sortable: false,
    },
  ];
  const cardLayouts = [
    {
      size: 12,
      body: (
        <div>
          <PagesIndex.Formikform
            fieldtype={fields.filter((field) => !field.showWhen)}
            show_submit={true}
            formik={formik}
            button_Size={"w-15"}
            btn_name="Submit"
            disabledSubmit={DisableSubmit}
          />
        </div>
      ),
    },

    {
      size: 12,
      body: (
        <div>
          <PagesIndex.TableWithCustomPeginationNew123
            data={tableData}
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
            }
          />
          <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">
            Total Amount {totalAmount}/-
          </h3>
        </div>
      ),
    },
  ];
  return (
    <>
      <Split_Main_Containt
        title="Credit Requests : UPI"
        add_button={false}
        cardLayouts={cardLayouts}
      />
    </>
  );
};

export default CreditRequest;
