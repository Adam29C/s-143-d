import React, { useEffect, useMemo, useState } from "react";
import FormWizardComponent from "../../../Helpers/MultiStepForm";
import Main_Containt from "../../../Layout/Main/Main_Containt";
import PagesIndex from "../../PagesIndex";
import { Get_permissions } from "../../../Redux/slice/CommonSlice";
import { filterSidebarItems } from "../../../Layout/SIdebar/FilteredPermissions";
import { admin_Sidebar } from "../../../Layout/SIdebar/Sidebar_data";

import { Formik, Field, Form, ErrorMessage } from "formik";

function AddEmployee1() {
  const CheckboxGroup = ({ options, namePrefix }) => {
    return options.map((option, index) => (
      <div
        key={index}
        style={{ marginLeft: option.NestedElement ? "20px" : "16px" }}
      >
        <div className="form-check">
          <Field
            type="checkbox"
            name={`${namePrefix}.${option.id}`}
            className="form-check-input"
          />
          <label className="form-check-label">{option.title}</label>
        </div>

        {/* Nested Checkboxes */}
        {option.NestedElement && option.NestedElement.length > 0 && (
          <CheckboxGroup
            options={option.NestedElement}
            namePrefix={`${namePrefix}.${option.id}`}
            className="ms-3"
          />
        )}
      </div>
    ));
  };

  const initialValues = {
    permissions: {
      1: false, // Dashboard
      3: false, // Main Games
      1: false, // Game Provider
      2: false, // Games Setting
      3: false, // Game Rates
      4: false, // Game Result
      5: false, // Revert Result Payment
      6: false, // Refund User Points
    },
  };

  return (
    <Main_Containt
      title={"Register New Employee"}
      col_size={12}
      add_button={true}
      route="/admin/employees"
      btnTitle="Back"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log("Form values:", values);
        }}
      >
        {() => (
          <Form>
            <h3>Permissions Form</h3>

            <div className="row">
              {admin_Sidebar &&
                admin_Sidebar.map((item, index) => (
                  <div className="col-3" key={index}>
                    <div>
                      {/* Bootstrap checkbox */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={item.id}
                          id={`checkbox-${index}`} // Unique ID for each checkbox
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`checkbox-${index}`}
                        >
                          <h6>{item.title}</h6>
                        </label>
                      </div>

                      {/* Integrating Formik's Field with custom checkbox */}
                      <Field
                        type="checkbox"
                        name={`permissions.${item.id}`}
                        className="form-check-input ms-3" // To add spacing for consistency
                      />

                      {/* Nested checkboxes */}
                      {item.NestedElement.length > 0 && (
                        <CheckboxGroup
                          options={item.NestedElement}
                          namePrefix={`permissions`}
                          className="ms-3"
                        />
                      )}
                    </div>
                  </div>
                ))}
            </div>

            <div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
      <PagesIndex.Toast />
    </Main_Containt>
  );
}

export default AddEmployee;
