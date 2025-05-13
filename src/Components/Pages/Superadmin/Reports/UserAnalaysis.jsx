import React from "react";
import MainGameReports from "../../../Helpers/Reports/GameReports/MainReport";
import PagesIndex from "../../PagesIndex";
import { Api } from "../../../Config/Api";
import { abc, today } from "../../../Utils/Common_Date";
import { toast } from "react-toastify";

const AllReports = () => {
  const token = localStorage.getItem("token");

  const [GetDetails, setGetDetails] = PagesIndex.useState([]);
  const [GetBankDetails, setGetBankDetails] = PagesIndex.useState([]);

  const [Refresh, setRefresh] = PagesIndex.useState(false);

  const [UserPagenateData, setUserPagenateData] = PagesIndex.useState({
    pageno: 1,
    limit: 10,
  });



  // console.log("");
  
  const [TotalPages, setTotalPages] = PagesIndex.useState(1);

  // const getReportDetails = async () => {
  //   const res = await PagesIndex.report_service.GET_REPORT_DETAILS_API(
  //     `${Api.GET_USER_ANALAYSIS_REPORT}?userName=all&limit=${UserPagenateData.limit}&page=${UserPagenateData.pageno}`,
  //     token
  //   );

  //   if (res.status) {
  //     setTotalPages(res.totalPages);
  //     setRefresh(!Refresh);
  //     toast.success(res.message);
  //     setGetBankDetails(res.data);
  //   }

  // };

  // PagesIndex.useEffect(() => {
  //   getReportDetails();
  // }, []);

  const FIELDS = [
    {
      title: "User Analaysis",
      fields: [
        { name: "userName", label: "Player Name", type: "text", col_size: 3 },
      ],
      visibleFields: [
        {
          name: "Game Date",
          value: "username",
          sortable: true,
        },
        {
          name: "Biding Digit",
          value: "totalPointsCredited",
          sortable: false,
        },
        {
          name: "Bidding Points",
          value: "totalPointsDebited",
          sortable: true,
        },
        {
          name: "Winning Points",
          value: "gameBidPoint",
          sortable: true,
        },
        {
          name: "Winning Points",
          value: "totalBidPoint",
          sortable: true,
        },
        {
          name: "Winning Points",
          value: "totalWinPoint",
          sortable: true,
        },
        {
          name: "Winning Points",
          value: "profit",
          sortable: true,
          style: (row) => ({
            color:
              parseInt(row.profit) < 0
                ? "red"
                : parseInt(row.profit)
                ? "green"
                : "black",
            fontWeight: "bold",
          }),
        },
      ],

      fetchReportData: async (value) => {
        const payload = `${Api.GET_USER_ANALAYSIS_REPORT}?userName=${
          value.userName ? value.userName : "all"
        }&limit=${UserPagenateData.limit}&page=${UserPagenateData.pageno}`;

        try {
          // Call your API for report 1
          const res = await PagesIndex.report_service.GET_REPORT_DETAILS_API(
            payload,
            token
          );

          if (res.status) {
            setTotalPages(res.recordsTotal);
            setRefresh(!Refresh);
            toast.success(res.message);
          }
          return res;
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
          UserPagenateData={UserPagenateData}
          onloadData={GetBankDetails && GetBankDetails}
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
