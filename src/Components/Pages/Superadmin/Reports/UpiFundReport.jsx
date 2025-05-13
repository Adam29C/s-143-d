import React from "react";
import MainGameReports from "../../../Helpers/Reports/GameReports/MainReport";
import PagesIndex from "../../PagesIndex";
import { Api } from "../../../Config/Api";
import { abc, today } from "../../../Utils/Common_Date";
import { toast } from "react-toastify";

const AllReports = () => {
  const token = localStorage.getItem("token");

  const [GetBankDetails, setGetBankDetails] = PagesIndex.useState([]);

  const [Refresh, setRefresh] = PagesIndex.useState(false);

  const [UserPagenateData, setUserPagenateData] = PagesIndex.useState({
    pageno: 1,
    limit: 10,
  });

  const [TotalPages, setTotalPages] = PagesIndex.useState(1);

  const getReportDetails = async () => {
    const res = await PagesIndex.report_service.GET_REPORT_DETAILS_API(
      Api.GET_UPI_FUND_REPORT_DETAILS,
      token
    );
    setGetBankDetails(res.data);
  };

  PagesIndex.useEffect(() => {
    getReportDetails();
  }, []);
  const FIELDS = [
    {
      title: "UPI Fund Report",
      fields: [
        { name: "sdate", label: "Start Date", type: "date", col_size: 4 },
        { name: "edate", label: "End Date", type: "date", col_size: 4 },

        {
          name: "bankName",
          label: "Select UPI ID",
          type: "select",
          options:
            (GetBankDetails &&
              GetBankDetails?.map((item) => ({
                label: item.UPI_ID,
                value: item._id,
              }))) ||
            [],
          col_size: 4,
        },
      ],
      visibleFields: [
        {
          name: "User Name",
          value: "username",
          sortable: true,
        },
        {
          name: "Mobile",
          value: "mobile",
          sortable: false,
        },
        {
          name: "Amount Added",
          value: "reqAmount",
          sortable: true,
        },
        {
          name: "Time",
          value: "reqDate",
          sortable: true,
          transform: (item, row) => {
            return `${item} ${row.reqTime}`;
          },
        },
        {
          name: "transaction Id",
          value: "transaction_id",
          sortable: true,
          transform: (item, row) => {
            return item || "null";
          },
        },
        {
          name: "Upi Name",
          value: "upi_name",
          sortable: true,
        },
        {
          name: "App Name",
          value: "upi_app_name",
          sortable: true,
        },
        {
          name: "Status",
          value: "reqStatus",
          sortable: true,
        },
      ],
      fetchReportData: async (value) => {
        const payload = {
          dateStart: today(value.sdate) || today(new Date()),
          date: today(value.edate) || today(new Date()),
          id: value.bankName || "1",
          page: UserPagenateData.pageno,
          limit: UserPagenateData.limit,
          search: "",
        };

        try {
          // Call your API for report 1
          const res = await PagesIndex.report_service.GET_FUND_REPORT_API(
            Api.GET_UPI_FUND_REPORT,
            payload,
            token
          );

          if (res.status) {
            setTotalPages(res.pagination.totalRecords);
            setRefresh(!Refresh);
            toast.success(res.message);
          } else {
            toast.error(res.response.data.message);
          }

          return res;
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            "Something went wrong. Please try again.";
          PagesIndex.toast.error(errorMessage);
        }
      },
      show_additional: true,
    },
  ];

  return (
    <div>
      {FIELDS.map((config, idx) => (
        <MainGameReports
          key={idx}
          title={config.title}
          config={config}
          fetchReportData={config.fetchReportData}
          setUserPagenateData={setUserPagenateData}
          UserPagenateData={UserPagenateData}
          TotalPagesCount={(TotalPages && TotalPages) || []}
          Refresh={Refresh}
        />
      ))}
      <PagesIndex.Toast />
    </div>
  );
};

export default AllReports;
