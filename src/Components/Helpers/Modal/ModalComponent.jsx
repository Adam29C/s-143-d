import React, { Children, useState } from "react";
import Modal from "react-awesome-modal";
import PagesIndex from "../../Pages/PagesIndex";

const ModalComponent = ({
  visible,
  setVisible,
  fields,
  form_title,
  formik,
  setSelectedRow,
  showBal,
  DisableSubmit,
  size
}) => {

  const closeModal = () => {
    setVisible(false);
  };

  return (
  <section>
  <div className="custom-model">
  <Modal
  className="custom-model"
        visible={visible}
        width={size ? size :"350"}
        effect="fadeInDown"
        onClickAway={closeModal}
      >
        <div className="p-4 modal-container">
        <div className="d-flex justify-content-between">
          <h3 className="border-bottom-text">{form_title}</h3>
            <button className="model-cross-btn" onClick={closeModal}>
              X
            </button>
          
          </div>

          {showBal !== undefined && showBal >= 0 && (
            <h4 class="modal-title text-center mt-2 mb-2 fw-bold">
              Current Bal : {showBal}/-
            </h4>
          )}
          <PagesIndex.Formikform
            fieldtype={fields.filter((field) => !field.showWhen)}
            formik={formik}
            btn_name={"submit"}
            button_Size={"w-100"}
            show_submit={true}
            disabledSubmit={DisableSubmit}
          />
        </div>
      </Modal>
  </div>
    </section>
  );
};

export default ModalComponent;
