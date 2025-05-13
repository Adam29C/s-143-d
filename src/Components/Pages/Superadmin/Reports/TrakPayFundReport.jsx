import React from "react";
import MainGameReports from "../../../Helpers/Reports/GameReports/MainReport";
import PagesIndex from "../../PagesIndex";
import { Api } from "../../../Config/Api";
import { abc, today } from "../../../Utils/Common_Date";
import { toast } from "react-toastify";

const AllReports = () => {
  const token = localStorage.getItem("token");

  const [Refresh, setRefresh] = PagesIndex.useState(false);

  const [UserPagenateData, setUserPagenateData ] = PagesIndex.useState({
    pageno: 1,
    limit: 10,
  });

  const [TotalPages, setTotalPages] = PagesIndex.useState(1);

  const FIELDS = [
    {
      title: "Trak Pay Fund Report",
      fields: [
        { name: "sdate", label: "Start Date", type: "date", col_size: 4 },
        { name: "edate", label: "End Date", type: "date", col_size: 4 },
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
          // sdate: today(value.sdate) || today(new Date()),
          // edate: today(value.edate) || today(new Date()),
          // id: value.bankName || '1',
          // page: 1,
          // limit: 10,
          // search: "",
          // {
          id: "1",
          date: "11/29/2024",
          dateStart: "10/29/2024",
          page: UserPagenateData.pageno,
          limit: UserPagenateData.limit,
          search: "",
          // }
        };
       

        try {
          // Call your API for report 1
          const res = await PagesIndex.report_service.GET_FUND_REPORT_API(
            Api.GET_NEW_UPI_FUND_REPORT,
            payload,
            token
          );
      
          if (res.status) {
            setTotalPages(res.totalPages);
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
          TotalPagesCount={(TotalPages && TotalPages) || []}
          Refresh={Refresh}
        />
      ))}
         <PagesIndex.Toast />
    </div>
  );
};

export default AllReports;
