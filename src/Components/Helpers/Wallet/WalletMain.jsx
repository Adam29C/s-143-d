import React, { useMemo } from "react";
import PagesIndex from "../../Pages/PagesIndex";
import ReusableModal from "../Modal/ReusableModal";

const WalletMain = ({
  title,
  TableData,
  fields,
  formik,
  UserFullButtonList,
  visibleFields,
  setSearchInTable,
  SearchInTable,
  setModalState,
  ModalState,
  handleBtnStatus,
  btnStatus,
  todayReportData,
  UserFullButtonList1,
  visibleFields1,
  formik1,
  fields1,
  confirmPayment,
  buttonDisable
}) => {
  const totalAmount = useMemo(
    () => TableData.reduce((acc, item) => acc + (item?.reqAmount || 0), 0),
    [TableData]
  );
  const cardLayouts = [
    {
      size: 12,
      body: (
        <div>
          <PagesIndex.Formikform
            fieldtype={fields?.filter((field) => !field.showWhen)}
            formik={formik}
            btn_name={"Get Report"}
            button_Size={"w-15"}
            show_submit={true}
            after_submit_button1={
              // <div className="report-btn-main mt-3">
              <button
                onClick={() => handleBtnStatus("see-report")}
                className="approve-btn"
              >
                See Report
              </button>
              // </div>
            }
          />
          {/* <div className="report-btn-main mt-3"> */}

          {/* </div> */}
        </div>
      ),
    },

    {
      size: 12,
      body: (
        <>
          <div className="">
            <div className="row d-flex justify-content-between">
              <div className="col-6 ">
                <span class="badge badge-success badge-pill float-left mt-3 selectAll badge-custom px-4 py-2">
                  Valid Req.
                </span>
                <span class="badge badge-danger badge-pill float-left mt-3 wrongBal badge-custom px-4 py-2 ">
                  Invalid Req Amt.
                </span>
              </div>
              <div className="col-6 ">
                <button
                  onClick={() => handleBtnStatus("approve-all")}
                  className="approve-btn float-right"
                >
                  Approve All
                </button>
              </div>
            </div>
          </div>

          <div>
            <PagesIndex.TableWithCustomPeginationNew123
              data={TableData}
              initialRowsPerPage={25}
              SearchInTable={""}
              visibleFields={visibleFields}
              showIndex={true}
              Responsive={false}
            />
            <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">
              Total Amount {totalAmount}/-
            </h3>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <PagesIndex.Split_Main_Containt
        title={title}
        add_button={false}
        cardLayouts={cardLayouts}
      />

      <ReusableModal
        ModalTitle={
          btnStatus === "see-report"
            ? "Today Approved Report"
            : btnStatus === "approve-all"
            ? "Approve All"
            : btnStatus === "decline-report"
            ? "Decline User Request"
            : ""
        }
        ModalState={ModalState}
        setModalState={setModalState}
        ModalBody={
          <>
            {btnStatus === "approve-all" ? (
              <div className="">
                <h1 className="confirm-payment-text">
                  Are You Sure Want To Confirm Payment?
                </h1>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-dark  mx-2"
                    onClick={() => confirmPayment()}
                    disabled={buttonDisable}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setModalState(false)}
                    className="btn btn-dark  mx-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : btnStatus === "see-report" ? (
              <PagesIndex.TableWithCustomPeginationNew123
                data={todayReportData}
                initialRowsPerPage={25}
                SearchInTable={""}
                visibleFields={visibleFields1}
                showIndex={true}
              />
            ) : // <PagesIndex.TableWitCustomPegination
            //   data={todayReportData}
            //   UserFullButtonList={UserFullButtonList1}
            //   initialRowsPerPage={5}
            //   SearchInTable={SearchInTable}
            //   visibleFields={visibleFields1}
            //   searchInput={
            //     <input
            //       type="text"
            //       placeholder="Search..."
            //       value={SearchInTable}
            //       onChange={(e) => setSearchInTable(e.target.value)}
            //       className="form-control ms-auto"
            //     />
            //   }
            // />
            btnStatus === "decline-report" ? (
              <PagesIndex.Formikform
                fieldtype={fields1.filter((field) => !field.showWhen)}
                formik={formik1}
                btn_name={"Submit"}
                button_Size={"w-15"}
                show_submit={true}
              />
            ) : (
              ""
            )}
          </>
        }
      />
    </>
  );
};

export default WalletMain;
