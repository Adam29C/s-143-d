import React from "react";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
import PagesIndex from "../../PagesIndex";
import { useFormik } from "formik";
import { Api } from "../../../Config/Api";
const SplitForm = () => {
  const token = localStorage.getItem("token");

  const [tableData, settableData] = PagesIndex.useState([]);
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");

  const [Refresh, setRefresh] = PagesIndex.useState(false);

  const [UserPagenateData, setUserPagenateData] = PagesIndex.useState({
    pageno: 1,
    limit: 10,
  });

  const [TotalPages, setTotalPages] = PagesIndex.useState(1);

  const [MaintableData, setMaintableData] = PagesIndex.useState([]);

  const formik = useFormik({
    initialValues: {
      market: 1,
      username: "",
    },

    validate: (values) => {
      const errors = {};

      if (!values.username) {
        errors.username = "Please Enter Player Name";
      }

      if (!values.market && formik.touched.market) {
        errors.market = "please select market type";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const payload = {
        market: parseInt(values.market),
        username: values.username,
        page: UserPagenateData.pageno,
        limit: UserPagenateData.limit,
        search: "",
      };
      const res = await PagesIndex.report_service.GET_FUND_REPORT_API(
        Api.GET_USER_BIDS_REPORT,
        payload,
        token
      );

      if (res.status) {
        let bidsum = 0;
        let amountsum = 0;

        const resultArray = res.data.groupData.map((e) => {
          bidsum += e.countBid;
          amountsum += e.sumdigit;

          return {
            providerName: e.providerName,
            gameTypeName: e.gameTypeName,
            countBid: e.countBid,
            sumDigit: e.sumdigit,
          };
        });

        // Add summary object at the end
        resultArray.push({ bidsum, amountsum });

        settableData(resultArray);

        PagesIndex.toast.success(
          res.data.groupData.length < 1 ? "Data Not Found " : res.message
        );

        setTotalPages(res.pagination.totalRecords);
        setRefresh(!Refresh);
      }
    },
  });

  const visibleFields = [
    {
      name: "Bracket",
      value: "bidDigit",
      sortable: true,
    },
    {
      name: "Amount",
      value: "biddingPoints",
      sortable: false,
    },
    {
      name: "Provider",
      value: "providerName",
      sortable: true,
    },
    {
      name: "Type",
      value: "gameTypeName",
      sortable: true,
    },
    {
      name: "Session",
      value: "gameSession",
      sortable: true,
    },
    {
      name: "Game Date",
      value: "gameDate",
      sortable: true,
    },
    {
      name: "Played on",
      value: "createdAt",
      sortable: true,
    },
    {
      name: "Win Status",
      value: "winStatus",
      sortable: true,
      transform: (value) =>
        value === 0 ? " Pending" : value === 1 ? "Win" : "Loss",
    },
  ];

  const fields = [
    {
      name: "username",
      label: "Player Name",
      type: "text",
      label_size: 12,
      col_size: 6,
    },
    {
      name: "market",
      label: "Market",
      type: "select",
      options:
        [
          {
            label: "Main Market",
            value: 1,
          },
          {
            label: "Starline Market",
            value: 2,
          },
          {
            label: "Andar Bahar Market ",
            value: 3,
          },
        ] || [],
      col_size: 6,
    },
  ];
  const cardLayouts = [
    {
      size: 6,
      body: (
        <div>
          <PagesIndex.Formikform
            fieldtype={fields.filter((field) => !field.showWhen)}
            show_submit={true}
            formik={formik}
            btn_name="Submit"
          />
        </div>
      ),
    },
    {
      size: 6,
      body: (
        <div>
          <table className="tablesaw table mb-0 tablesaw-swipe ">
            <thead className="primary-color text-center table-bordred">
              <tr>
                <th scope="col">Provider</th>
                <th scope="col">Type</th>
                <th scope="col">Bids</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: 12 }} id="groupData">
              {tableData &&
                tableData.slice(0, -1).map((item) => {
                  return (
                    <>
                      <tr className="text-center">
                        <td>{item.providerName}</td>
                        <td>{item.gameTypeName}</td>
                        <td>{item.countBid}</td>
                        <td>{item.sumDigit}</td>
                      </tr>
                    </>
                  );
                })}
              {tableData.length > 0 && (
                <>
                  <tr className="text-center primary-color">
                    <td colSpan={2} className="fw-bold">
                      Grand Total
                    </td>
                    <td>{tableData[tableData.length - 1].bidsum}</td>
                    <td>{tableData[tableData.length - 1].amountsum}</td>
                  </tr>
                </>
              )}
            </tbody>
            <thead>
              <tr id="tfoot" />
            </thead>
          </table>
        </div>
      ),
    },
    {
      size: 12,
      body: (
        <div>
          <PagesIndex.TableWithCustomPeginationNew
            tableData={tableData && tableData}
            TotalPagesCount={(TotalPages && TotalPages) || []}
            columns={visibleFields}
            showIndex={true}
            Refresh={Refresh}
            setUserPagenateData={setUserPagenateData}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Split_Main_Containt
        title="All User Bids"
        add_button={false}
        btnTitle="Add"
        route="/add"
        cardLayouts={cardLayouts}
      />
    </div>
  );
};

export default SplitForm;
