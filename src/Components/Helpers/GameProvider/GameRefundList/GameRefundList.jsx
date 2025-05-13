import React from "react";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
import { useFormik } from "formik";
import PagesIndex from "../../../Pages/PagesIndex";
import { Games_Provider_List } from "../../../Redux/slice/CommonSlice";
import { today } from "../../../Utils/Common_Date";
import ReusableModal from "../../Modal/ReusableModal";
const RefundPayment = ({
  gametype,
  provider_list,
  refund_list,
  refund_payment,
  title,
}) => {
  const token = localStorage.getItem("token");

  const [GetProviderData, setGetProviderData] = PagesIndex.useState([]);
  const [tableData, setTableData] = PagesIndex.useState([]);
  const [Refresh, setRefresh] = PagesIndex.useState(false);
  const [ModalState, setModalState] = PagesIndex.useState(false);
  const [BtnVisiably, setBtnVisiably] = PagesIndex.useState(false);
  const [RowData, setRowData] = PagesIndex.useState("");
  const [IsSUbmitted, setIsSUbmitted] = PagesIndex.useState(false);
  const [IsSUbmittedConfirm, setIsSUbmittedConfirm] =
    PagesIndex.useState(false);

  const [UserPagenateData, setUserPagenateData] = PagesIndex.useState({
    pageno: 1,
    limit: 25,
  });

  const [TotalPages, setTotalPages] = PagesIndex.useState(1);



  

  const getGameProviderList = async () => {
    // if (gametype === "StarLine" || gametype === "JackPot") {
    const res =
      await PagesIndex.game_service.STARLINE_AND_JACKPOT_GAME_PROVIDERS_LIST_API(
        provider_list,
        token
      );

    if (res.staus || res.status) {
      setGetProviderData(res.data);
    }
  };

  PagesIndex.useEffect(() => {
    getGameProviderList();
  }, [Refresh]);

  // today(new Date());
  const formik = useFormik({
    initialValues: {
      providerId: "",
      date: today(new Date()),
    },

    validate: (values) => {
      const errors = {};

      if (!values.providerId) {
        errors.providerId = "Please Select Provide Name";
      }

      return errors;
    },
    onSubmit: async (values) => {
      setIsSUbmitted(true);
      const payload = {
        providerId: values.providerId,
        resultDate: today(values.date),
        page: UserPagenateData.pageno,
        limit: UserPagenateData.limit,
      };

      try {
        const res = await PagesIndex.game_service.ALL_GAME_RESULTS_ADD_API(
          refund_list,
          payload,
          token
        );

        
        if (res.status) {
          // console.log("res" ,res);
          setTotalPages(
            res?.pagination?.totalCount || res?.pagination?.totalItems
          );
          setTableData(res?.data || res?.data);
          res.data.length === 0 ? PagesIndex.toast.error("No Data Found") : "";
        } else {
          PagesIndex.toast.error(res.response.data.message);
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        PagesIndex.toast.error(errorMessage);
      }
    },
  });

  const test = async () => {
    if (IsSUbmitted) {
      const payload = {
        providerId: formik.values.providerId,
        resultDate: today(formik.values.date),
        page: UserPagenateData.pageno,
        limit: UserPagenateData.limit,
      };

      try {
        const res = await PagesIndex.game_service.ALL_GAME_RESULTS_ADD_API(
          refund_list,
          payload,
          token
        );

        if (res.status) {
          setTotalPages(
            res?.pagination?.totalCount || res?.pagination?.totalItems ||  res?.pagination?.total
          );
          setTableData(res?.data);
          // PagesIndex.toast.success(res?.data?.message || res?.message);
        } else {
          PagesIndex.toast.error(res?.response?.data?.message);
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        PagesIndex.toast.error(errorMessage);
      }
    }
  };
  PagesIndex.useEffect(() => {
    test();
  }, [UserPagenateData.pageno, UserPagenateData.limit , TotalPages]);

  const fields = [
    {
      name: "date",
      label: "Result Date",
      type: "date",
      label_size: 12,
      col_size: 3,
    },
    {
      name: "providerId",
      label: "Provider",
      type: "select",
      label_size: 12,
      col_size: 4,
      options:
        (GetProviderData &&
          GetProviderData.map((item) => ({
            label: item.providerName,
            value: item._id,
          }))) ||
        [],
    },
  ];

  const visibleFields = [
    { name: "User Name", value: "userName", sortable: true },
    { name: "Game Session", value: "gameSession", sortable: false },
    { name: "Game Date", value: "gameDate", sortable: true },
    { name: "Bid Digits", value: "bidDigit", sortable: true },
    { name: "Bid Points", value: "biddingPoints", sortable: true },
    {
      name: "Action",
      value: "Refund ",
      buttonColor: "info",
      isButton: true,
      sortable: true,
      Conditions: (row) => {
        setRowData(row);
        setModalState(true);
      },
    },
  ];

  const ConfirmPayment1 = async (staus) => {
    if (confirm("Are you sure you want to delete this payment method? ")) {
      setBtnVisiably(true);
      setIsSUbmittedConfirm(true);
      try {
        let apidata = {};

        // if (gametype === "maingame") {
        const abc =
          GetProviderData?.filter((i) => i._id === formik.values.providerId) ||
          [];

        apidata = {
          providerId: abc[0]?._id,
          resultDate: formik.values.date,
          type: staus,
          providerName: abc[0]?.providerName,
        };

        const res =
          await PagesIndex.game_service.STARLINE_GAME_CONFIRM_REVERT_PAYMENT_API(
            refund_payment,
            apidata,
            token
          );

        if (res.statusCode === 200 || res.status) {
          PagesIndex.toast.success(res.message);
          setIsSUbmittedConfirm(false);
          test();
          setTableData(tableData);
          setBtnVisiably(false);
          setModalState(false);
        } else {
          PagesIndex.toast.error(res.response.data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsSUbmittedConfirm(false); // Enable button after response
      }
    }
  };

  const ConfirmPayment = async (staus) => {
    try {
      let apidata = {};

      setBtnVisiably(true);

      if (gametype === "maingame") {
        apidata = {
          userid: RowData.userId,
          biddingPoints: RowData.biddingPoints,
          providerId: RowData.providerId,
          resultDate: RowData.gameDate,
          type: staus,
          providerName: RowData.providerName,
          _id: RowData._id,
        };
      } else if (gametype === "Jackpot") {
        apidata = {
          userId: RowData.userId,
          biddingPoints: RowData.biddingPoints,
          providerId: RowData.providerId,
          resultDate: RowData.gameDate,
          type: staus,
          providerName: RowData.providerName,
          _id: RowData._id,
        };
      } else if (gametype === "StarLine") {
        apidata = {
          _id: RowData._id,
          userId: RowData.userId,
          biddingPoints: RowData.biddingPoints,
          providerId: RowData.providerId,
          resultDate: RowData.gameDate,
          type: staus,
          providerName: RowData.providerName,
        };
      }
      const res =
        await PagesIndex.game_service.STARLINE_GAME_CONFIRM_REVERT_PAYMENT_API(
          refund_payment,
          apidata,
          token
        );

      if (res.statusCode === 200 || res.status) {
        PagesIndex.toast.success(res.message);
        test();
        setBtnVisiably(false);
        setModalState(false);
      } else {
        PagesIndex.toast.error(res.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cardLayouts = [
    {
      size: 12,
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
      size: 12,
      body: (
        <div>
          <button
            className="btn btn-primary primary-color"
            disabled={tableData.length === 0 || IsSUbmittedConfirm}
            onClick={() => {
              ConfirmPayment1(2);
            }}
          >
            Refund All
          </button>
          <PagesIndex.TableWithCustomPeginationNew
            tableData={tableData && tableData}
            TotalPagesCount={(TotalPages && TotalPages) || []}
            columns={visibleFields}
            showIndex={true}
            Refresh={Refresh}
            setUserPagenateData={setUserPagenateData}
            UserPagenateData={UserPagenateData}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Split_Main_Containt
        title={title}
        add_button={false}
        btnTitle="Add"
        route="/add"
        cardLayouts={cardLayouts}
      />

      <ReusableModal
        // ModalTitle="ghghu"
        ModalState={ModalState}
        setModalState={setModalState}
        ModalBody={
          <div className="">
            <h1 className="confirm-payment-text">
              Are You Sure Want To Confirm Payment?
            </h1>
            <div className="d-flex justify-content-end">
              <button
                className={`btn btn-dark  mx-2 ${
                  BtnVisiably ? "d-none" : "d-block"
                }`}
                onClick={() => ConfirmPayment(1)}
              >
                Confirm
              </button>

              <button
                className={`btn btn-dark  mx-2 ${
                  !BtnVisiably ? "d-none" : "d-block"
                }`}
                disabled
              >
                Confirm
              </button>

              <button
                onClick={() => {
                  setBtnVisiably(false);
                  setModalState(false);
                }}
                className="btn btn-dark  mx-2"
              >
                Close
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default RefundPayment;
