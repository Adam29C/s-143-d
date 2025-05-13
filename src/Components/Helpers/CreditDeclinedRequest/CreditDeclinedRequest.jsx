import React, { useMemo } from "react";
import PagesIndex from "../../Pages/PagesIndex";
import Split_Main_Containt from "../../Layout/Main/Split_Main_Content";

const CreditDeclinedRequest = ({
  tableData,
  fields,
  formik,
  visibleFields,
  title,
  subtitle,
  Refresh,
  fetchData,
  setUserPagenateData,
  UserPagenateData,
  TotalPages,
  DisableSubmit
}) => {
  const totalAmount = useMemo(
    () => tableData.reduce((acc, item) => acc + (item?.reqAmount || 0), 0),
    [tableData]
  );

  const cardLayouts = [
    {
      size: 12,
      body: (
        <div>
          <PagesIndex.Formikform
            fieldtype={fields.filter((field) => !field.showWhen)}
            show_submit={true}
            formik={formik}
            button_Size={"w-15"}
            btn_name="Submit"
            disabledSubmit={DisableSubmit}
          />
        </div>
      ),
    },

    {
      size: 12,
      body: (
        <div>
          <div>
            <h4 class="profile-note-title mt-0 mb-4">{subtitle}</h4>
          </div>

          <PagesIndex.TableWithCustomPeginationNew
            tableData={tableData && tableData}
            TotalPagesCount={(TotalPages && TotalPages) || []}
            columns={visibleFields}
            showIndex={true}
            Refresh={Refresh}
            setUserPagenateData={setUserPagenateData}
            UserPagenateData={UserPagenateData}
          />
          {/* <PagesIndex.TableWitCustomPegination
            data={tableData}
            initialRowsPerPage={5}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields}
            searchInput={
              <input
                type="text"
                placeholder="Search..."
                value={SearchInTable}
                onChange={(e) => setSearchInTable(e.target.value)}
                className="form-control ms-auto"
              />
            }
          /> */}
          <h3 className="ml-3 mb-3 fw-bold responsive-total-amount">
            Total Amount {totalAmount}/-
          </h3>
        </div>
      ),
    },
  ];
  return (
    <>
      <Split_Main_Containt
        title={title}
        add_button={false}
        cardLayouts={cardLayouts}
      />
    </>
  );
};

export default CreditDeclinedRequest;
