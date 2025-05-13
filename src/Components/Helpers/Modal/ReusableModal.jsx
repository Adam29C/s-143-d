// import React from "react";
// import { Modal } from "react-responsive-modal";

// const App = ({ ModalBody, ModalTitle, setModalState, ModalState }) => {
//   return (
//     <>
//       <Modal
//         open={ModalState}
//         onClose={() =>setModalState() }
//         center
//         // classNames={{
//         //   overlayAnimationIn: 'customEnterOverlayAnimation',
//         //   overlayAnimationOut: 'customLeaveOverlayAnimation',
//         //   modalAnimationIn: 'customEnterModalAnimation',
//         //   modalAnimationOut: 'customLeaveModalAnimation',
//         // }}
//         animationDuration={400}
//       >
//         <h4>{ModalTitle}</h4>
//         <hr />
//         {ModalBody}
//       </Modal>


      
//     </>
//   );
// };

// export default App;



import React from "react";
import { Modal } from "react-responsive-modal";

const ReusableModal = ({
  ModalBody,
  ModalTitle,
  setModalState,
  ModalState,
}) => {
  return (
    <>
      <Modal
        open={ModalState}
        onClose={() => setModalState(false)} 
        center
        animationDuration={400}
      >
        <h4 className="font-weight-bold">{ModalTitle}</h4>
        <hr />
        {ModalBody}
      </Modal>
    </>
  );
};

export default ReusableModal;
