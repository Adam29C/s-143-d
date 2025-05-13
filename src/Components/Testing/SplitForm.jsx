import React from "react";
import Split_Main_Containt from "../Layout/Main/Split_Main_Content";

const SplitForm = () => {

    const cardLayouts = [
        {
          size: 9,
          body: (
            <div>
              {/* <PagesIndex.Formikform
                fieldtype={fields.filter((field) => !field.showWhen)}
                show_submit={true}
                formik={formik}
                btn_name="Submit"
              /> */}
            </div>
          ),
        },
        {
          size: 3,
          body: (
            <div>
              <div>
                {/* <PagesIndex.Formikform
                  fieldtype={fields1.filter((field) => !field.showWhen)}
                  formik={formik1}
                  show_submit={true}
                  btn_name="Search Result"
                /> */}
              </div>
            </div>
          ),
        },
        {
          size: 12,
          body: (
            <div>
              {/* <PagesIndex.TableWitCustomPegination
                data={tableData}
                initialRowsPerPage={5}
                SearchInTable={SearchInTable}
                visibleFields={visibleFields}
                UserFullButtonList={UserFullButtonList}
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
            </div>
          ),
        },
      ];
  return (
    <div>
      <Split_Main_Containt
        title="Game Results"
        add_button={false}
        btnTitle="Add"
        route="/add"
        cardLayouts={cardLayouts}
      />
    </div>
  );
};

export default SplitForm;
