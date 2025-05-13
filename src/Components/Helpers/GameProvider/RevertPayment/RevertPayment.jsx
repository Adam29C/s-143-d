import PagesIndex from "../../../Pages/PagesIndex";
import { Confirm_box } from "../../Confirm_Box";
import ReusableModal from "../../../Helpers/Modal/ReusableModal";
import { getActualDateFormate, today } from "../../../Utils/Common_Date";
import { Api } from "../../../Config/Api";

const RevertPayment = ({
  main_result,
  title,
  confirm_revert_payment,
  gameType,
}) => {
  const token = localStorage.getItem("token");
  let { user_id, username, role } = JSON.parse(
    localStorage.getItem("userdetails")
  );

  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [TableData, setTableData] = PagesIndex.useState([]);
  const [Refresh, setRefresh] = PagesIndex.useState(false);
  const [ModalState, setModalState] = PagesIndex.useState(false);
  const [BtnVisiably, setBtnVisiably] = PagesIndex.useState(false);
  const [RowData, setRowData] = PagesIndex.useState("");

  const actual_date_formet = getActualDateFormate(new Date());

  const visibleFields = [
    {
      name: "provider Name",
      value: "providerName",
      sortable: true,
    },
    {
      name: "Session",
      value: "session",
      sortable: true,
    },
    {
      name: "result Date",
      value: "resultDate",
      sortable: false,
    },
    {
      name: "winning Digit",
      value: "winningDigit",
      sortable: true,
    },
    {
      name: "Revert Payment",
      value: "Revert Payment",
      buttonColor: "",
      className: "primary-color",
      isButton: true,
      sortable: true,
      Conditions: (row) => {
        setModalState(true);
        setRowData(row);
      },
    },
  ];

  const getList = async () => {
    const payload = {
      page: 1,
      limit: 10,
      search: SearchInTable,
    };

    const res = await PagesIndex.game_service.ALL_GAME_REVERT_PAYMENT_API(
      main_result,
      // payload,
      token
    );

    setTableData(res?.data || res?.result);
  };

  PagesIndex.useEffect(() => {
    getList();
  }, [Refresh]);

  const ConfirmPayment = async (row) => {
    setBtnVisiably(true);

    try {
      let apidata = "";
      if (gameType === "MainGame") {
        apidata = {
          id: RowData?._id,
          provider: RowData?.providerId,
          gameSession: RowData?.session,
          digit: RowData?.winningDigit,
          digitFamily: RowData?.winningDigitFamily.toString(),
          gameDate: RowData?.resultDate,
          adminId: user_id,
          adminName: username,
        };
      } else {
        apidata = {
          resultId: RowData?._id,
          providerId: RowData?.providerId,

          digit: RowData?.winningDigit,
          date: RowData?.resultDate,
          ...(gameType === "StarLine"
            ? {
                family: RowData?.winningDigitFamily.toString(),
                session: RowData?.session,
              }
            : {}),
        };
      }

      const res =
        await PagesIndex.game_service.STARLINE_GAME_CONFIRM_REVERT_PAYMENT_API(
          confirm_revert_payment,
          apidata,
          token
        );

      if (res.statusCode === 200 || res.status) {
        PagesIndex.toast.success(res.message);

        setRefresh(!Refresh);
        setBtnVisiably(false);
        setModalState(false);
      } else {
        PagesIndex.toast.error(res.response.data.message);
      }
    } catch (error) {}
  };

  const formik1 = PagesIndex.useFormik({
    initialValues: {
      date: today(),
    },

    validate: (values) => {
      const errors = {};
      return errors;
    },
    onSubmit: async (values) => {
      const apidata = values.date;

      try {
        let payload = `${Api.MAIN_GAME_REVERT_PAYMENT}?date=${apidata}`;

        const res =
          await PagesIndex.game_service.ALL_GAME_REVERT_PAYMENT_BACKDATE_API(
            payload,

            token
          );

        console.log("res", res);

        if (res.status) {
          setTableData(res?.data || res?.result);

          //   setPastResultCount({
          //     countResults: res.data.countResults,
          //     pendingCount: res.data.pendingCount,
          //     providerCount: res.data.providerCount,
        }

        //   PagesIndex.toast.success(res.message);
        //   setTableData(res.data.results || res.data.result);
        // } else {
        //   PagesIndex.toast.error(res.message);
        // }
      } catch (error) {
        PagesIndex.toast.error(error.response.data.message);
      }
    },
  });

  const fields1 = [
    {
      name: "date",
      label: "Result Date",
      type: "date",
      label_size: 12,
      col_size: 12,
      max: { actual_date_formet },
    },
  ];

  return (
    <div>
      <PagesIndex.Main_Containt
        add_button={false}
        route="/admin/user/add"
        title={title}
      >
        <div className="col-6 d-flex justify-content-start align-items-center mb-3 ">
          <PagesIndex.Formikform
            fieldtype={fields1.filter((field) => !field.showWhen)}
            formik={formik1}
            show_submit={true}
            btn_name="Search Result"
          />
        </div>
        <PagesIndex.TableWithCustomPeginationNew123
          data={TableData}
          initialRowsPerPage={25}
          SearchInTable={SearchInTable}
          visibleFields={visibleFields}
          // confirm_button={
          //   <ConfirmationModal
          //     title="Are you sure you want to delete this file?"
          //     text="This action cannot be undone."
          //     icon="warning"
          //     confirmButtonText="Yes, delete it!"
          //     cancelButtonText="No, cancel!"
          //     Buttontitle="Confirm"
          //     onConfirm={ConfirmPayment}
          //   />
          // }
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
        <PagesIndex.Toast />
      </PagesIndex.Main_Containt>
    </div>
  );
};

export default RevertPayment;
