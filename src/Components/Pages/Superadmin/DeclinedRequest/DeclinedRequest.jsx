import React from "react";
import PagesIndex from "../../PagesIndex";
import { getActualDateWithFormat } from "../../../Utils/Common_Date";
import CreditDeclinedRequest from "../../../Helpers/CreditDeclinedRequest/CreditDeclinedRequest";

const DeclinedRequest = () => {
  //get token in local storage
  const token = localStorage.getItem("token");

  //set actual date
  const actual_date_formet = getActualDateWithFormat(new Date());

  //all state
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [tableData, setTableData] = PagesIndex.useState([]);
  const [DisableSubmit, setDisableSubmit] = PagesIndex.useState(false);

  const [Refresh, setRefresh] = PagesIndex.useState(false);

  const [UserPagenateData, setUserPagenateData] = PagesIndex.useState({
    pageno: 1,
    limit: 10,
  });

  const [TotalPages, setTotalPages] = PagesIndex.useState(1);

  const title = "Declined Report";
  const subtitle = "Declined Debit Requests";

  // get api decline request

  const fetchData = async (
    page,
    rowsPerPage,
    searchQuery,
    date = actual_date_formet
  ) => {
    const payload = {
      page: page,
      limit: rowsPerPage,
      date_cust: date,
      search: searchQuery,
    };

    try {
      const response = await PagesIndex.admin_services.GET_DECLINED_REQUEST_API(
        payload,
        token
      );

      const totalRows = response?.total || res?.total || 5;
      let mainRes = Object.values(response.data);

      setTableData(mainRes);

      return { mainRes, totalRows };
    } catch {}
  };

  const getDeclinedRequest = async (date = actual_date_formet) => {
    const payload = {
      date_cust: date,
      page: UserPagenateData.pageno,
      limit: UserPagenateData.limit,
      search: SearchInTable,
    };
   try {
    const res = await PagesIndex.admin_services.GET_DECLINED_REQUEST_API(
      payload,
      token
    );

    if (res?.status) {
      setTableData(res?.data);
      setTotalPages(res?.total || res?.pagination?.totalItems);
    }
   } catch (error) {
    
   }finally{
    setDisableSubmit(false)
   }
  };

  PagesIndex.useEffect(() => {
    getDeclinedRequest();
  }, [UserPagenateData.limit, UserPagenateData.pageno]);

  const formik = PagesIndex.useFormik({
    initialValues: {
      date: actual_date_formet || null,
    },
    validate: (values) => {},

    onSubmit: async (values) => {
      setDisableSubmit(!DisableSubmit)
      getDeclinedRequest(values.date);
    },
  });

  const fields = [
    {
      name: "date",
      label: "Search By Approve Date",
      type: "date",
      label_size: 12,
      col_size: 3,
    },
  ];

  const visibleFields = [
    {
      name: "Fullname",
      value: "fullname",
      sortable: false,
    },
    {
      name: "User Name",
      value: "username",
      sortable: true,
    },
    {
      name: "Request Date",
      value: "reqDate",
      sortable: false,
    },
    {
      name: "Request Time",
      value: "reqTime",
      sortable: true,
    },
    {
      name: "withdrawal Mode",
      value: "withdrawalMode",
      sortable: false,
    },
    {
      name: "Request Amount",
      value: "reqAmount",
      sortable: true,
    },
  ];

  return (
    <>
      <CreditDeclinedRequest
        fields={fields}
        formik={formik}
        tableData={tableData}
        SearchInTable={SearchInTable}
        setSearchInTable={setSearchInTable}
        visibleFields={visibleFields}
        title={title}
        subtitle={subtitle}
        fetchData={fetchData}
        Refresh={Refresh}
        setUserPagenateData={setUserPagenateData}
        UserPagenateData={UserPagenateData}
        TotalPages={TotalPages}
        DisableSubmit={DisableSubmit}
      />
    </>
  );
};

export default DeclinedRequest;
