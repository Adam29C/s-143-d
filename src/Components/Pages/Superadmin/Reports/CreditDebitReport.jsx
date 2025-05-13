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
      Api.CREDIT_DEBIT_LIST_DETAILS,
      token
    );

    setGetBankDetails(res.adminDetail);
  };

  PagesIndex.useEffect(() => {
    getReportDetails();
  }, []);

  const FIELDS = [
    {
      title: "Credit/Debit Report",
      fields: [
        { name: "date", label: "Start Date", type: "date", col_size: 3 },

        {
          name: "reqType",
          label: "Select Credit/Debit",
          type: "select",
          default: "Credit",
          options:
            [
              {
                label: "Credit",
                value: "Credit",
              },
              {
                label: "Debit",
                value: "Debit",
              },
            ] || [],
          col_size: 3,
        },
        {
          name: "adminName",
          label: "Select Admin",
          type: "select",
          default: "0",
          options: [
            {
              label: "All",
              value: "0",
            },
            ...(GetBankDetails
              ? GetBankDetails.map((item) => ({
                  label: item.username,
                  value: item._id,
                }))
              : []),
          ],
          col_size: 3,
        },
      ],
      visibleFields: [
        {
          name: "Full Name",
          value: "fullname",
          sortable: true,
        },
        {
          name: "Bracket",
          value: "reqTime",
          sortable: false,
          transform: (item, row) => {
            return `${row.reqDate} ${row.reqTime}`;
          },
        },
        {
          name: "Amount",
          value: "reqAmount",
          sortable: true,
        },
        {
          name: "Added By",
          value: "UpdatedBy",
          sortable: true,
        },
      ],
      fetchReportData: async (value) => {
        if (!value.reqType) {
          toast.error("Please Select Credit/Debit");
          return;
        }
        if (!value.adminName) {
          toast.error("Please Select Admin Name");
          return;
        }

        const payload = {
          adminName: value.adminName,
          date: today(value.date) || today(new Date()),
          reqType: value.reqType,
          page: UserPagenateData.pageno,
          limit: UserPagenateData.limit,
          searchKey: "",

          // "adminName": "0",
          // "date":  "25/12/2024",
          // "reqType": "Credit",
          // "page": 1,
          // "limit": 10,
          // "searchKey": ""
        };

        try {
          // Call your API for report 1
          const res = await PagesIndex.report_service.GET_FUND_REPORT_API(
            Api.CREDIT_DEBIT_LIST,
            payload,
            token
          );


          // console.log("res.pagination.total" ,res.pagination.total);
          

          if (res.status) {
            setTotalPages(res.pagination.total);
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
