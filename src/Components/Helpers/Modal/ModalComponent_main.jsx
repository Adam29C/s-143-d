import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ReusableModal = ({
  show,
  onClose,
  title,
  body,
  primaryButtonText = "Save Changes",
  secondaryButtonText = "Close",
  onPrimaryAction,
  onSecondaryAction,
  showFooter,
  dialogClassName,
  size,
}) => {
  return (
    <Modal show={show}   onHide={() => onClose()} size={ size}  dialogClassName="custom-modal12" >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      {showFooter === true && (
        <Modal.Footer>
          <Button variant="secondary" onClick={onSecondaryAction || onClose}>
            {secondaryButtonText}
          </Button>
          <Button variant="primary" onClick={onPrimaryAction || onClose}>
            {primaryButtonText}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ReusableModal;
