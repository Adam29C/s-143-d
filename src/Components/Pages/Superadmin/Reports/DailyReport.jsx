import React from "react";
import MainGameReports from "../../../Helpers/Reports/GameReports/MainReport";
import PagesIndex from "../../PagesIndex";
import { Api } from "../../../Config/Api";
import {
  abc,
  Get_Year_Only,
  Get_Year_With_Time,
  today,
} from "../../../Utils/Common_Date";
import { toast } from "react-toastify";

const AllReports = () => {
  const token = localStorage.getItem("token");

  const [GetBankDetails, setGetBankDetails] = PagesIndex.useState([]);
  const [GetAdminDetails, setGetAdminsDetails] = PagesIndex.useState([]);

  const [Refresh, setRefresh] = PagesIndex.useState(false);

  const [UserPagenateData, setUserPagenateData ] = PagesIndex.useState({
    pageno: 1,
    limit: 10,
  });

  const [TotalPages, setTotalPages] = PagesIndex.useState(1);

  const getReportDetails = async () => {
    const res = await PagesIndex.report_service.GET_REPORT_DETAILS_API(
      Api.GET_FUND_REPORT_DETAILS,
      token
    );

    setGetBankDetails(res.data);
    setGetAdminsDetails(res.adminName);
  };

  PagesIndex.useEffect(() => {
    getReportDetails();
  }, []);

  const optionsArray = [
    { value: "PG", label: "Play Game" },
    { value: "UR", label: "User Registration" },
    { value: "RDP", label: "Request For Deposit Point" },
    { value: "RWP", label: "Request For Withdraw Point" },
    { value: "CRDP", label: "Cancel Request For Deposit Point" },
    { value: "CRWP", label: "Cancel Request For Withdraw Point" },
  ];

  const FIELDS = [
    {
      title: "Daily Report",
      fields: [
        { name: "sdate", label: "Start Date", type: "date", col_size: 3 },
        { name: "edate", label: "End Date", type: "date", col_size: 3 },
        { name: "username", label: "Player Name", type: "text", col_size: 3 },

        {
          name: "reqType",
          label: "Report Type",
          default: optionsArray && optionsArray[0]?.value,
          type: "select",
          options:
            (optionsArray &&
              optionsArray?.map((item) => ({
                label: item.label,
                value: item.value,
              }))) ||
            [],
          col_size: 3,
        },
      ],
      visibleFields: [
        {
          name: "User Name",
          value: "showRow",
          sortable: true,
        },
        {
          name: "Mobile",
          value: "created",
          sortable: false,
        },
      ],
      fetchReportData: async (value) => {
        if (!value.reqType) {
          toast.error("Report Type  is required");
          return;
        }
        const payload = {
          sdate: today(value.sdate) || today(new Date()),
          edate: today(value.edate) || today(new Date()),
          reqType: value.reqType,
          username: value.username,
          page: UserPagenateData.pageno,
          limit: UserPagenateData.limit,
        };

        try {
          // Call your API for report 1
          const res = await PagesIndex.report_service.GET_FUND_REPORT_API(
            Api.DAILY_REPORT,
            payload,
            token
          );

          if (res.status) {
            setTotalPages(res.pagination.totalItems);
            setRefresh(!Refresh);
            // toast.success(res.message);
            var abcded = [];

            if (res.reqType === "PG") {
              res.data.map((item, index) => {
                abcded.push({
                  index: index + 1,
                  created: item.createdAt,
                  showRow: `${item.userName} Added ${item.biddingPoints} On ${item.gameTypeName} In ${item.providerName}`,
                });
              });
            } else if (res.reqType === "UR") {
              // console.log("itemitem", res.data);
              res.data.map((item, index) => {
                abcded.push({
                  index: index + 1,
                  created: item.CreatedAt,
                  showRow: `${item.name} Registered Successfully`,
                });
              });
            } else if (res.reqType === "RDP") {
              res.data.map((item, index) => {
                abcded.push({
                  index: index + 1,
                  created: `${item.reqDate} ${item.reqTime}`,
                  showRow: `${item.fullname} Requested  ${item.reqAmount}  Points For Deposite`,
                });
              });
            } else if (res.reqType === "RWP") {
              res.data.map((item, index) => {
                abcded.push({
                  index: index + 1,
                  created: `${item.reqDate} ${item.reqTime}`,
                  showRow: `${item.fullname} Requested  ${item.reqAmount}  Points For Withdraw`,
                });
              });
            } else if (res.reqType === "CRDP") {
              res.data.map((item, index) => {
                abcded.push({
                  index: index + 1,
                  created: `${item.reqDate} ${item.reqTime}`,
                  showRow: `${item.UpdatedBy} Cancelled Requset of   ${item.reqAmount} Points For Deposite For User ${item.fullname} `,
                });
              });
            } else if (res.reqType === "CRWP") {
              res.data.map((item, index) => {
                abcded.push({
                  index: index + 1,
                  created: `${item.reqDate} ${item.reqTime}`,
                  showRow: `${item.UpdatedBy} Cancelled Requset of   ${item.reqAmount} Points For Withdraw For User ${item.fullname} `,
                });
              });
            }
          }

          return abcded;
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            "Something went wrong. Please try again.";
          PagesIndex.toast.error(errorMessage);
        }
      },
      show_additional: false,
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
