// import React from "react";
// import Swal from "sweetalert2";

import Swal from "sweetalert2";

// const ConfirmationModal = ({
//   title = "Are you sure?",
//   text = "You won't be able to revert this!",
//   icon = "warning",
//   confirmButtonText = "Yes, delete it!",
//   cancelButtonText = "Cancel",
//   Buttontitle,

//   onConfirm,
//   confirmButtonColor = "#76838f",
//   cancelButtonColor = "#d33",
// }) => {
//   const showConfirmation = () => {
//     Swal.fire({
//       title,
//       text,
//       icon,
//       showCancelButton: true,
//       confirmButtonColor,
//       cancelButtonColor,
//       confirmButtonText,
//       cancelButtonText,
//       Buttontitle,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire({
//           title: "Deleted!",
//           text: "Your file has been deleted.",
//           icon: "success",
//         });
//         if (onConfirm) {
//           onConfirm();
//         }
//       }
//     });
//   };

//   return (
//     <button
//       onClick={showConfirmation}
//       className="btn btn-primary"
//       style={{ color: "#76838f !impo" }}
//     >
//       {Buttontitle}
//     </button>
//   );
// };

// export default ConfirmationModal;

export const Confirm_box = ({title1 , title2 ,title3}) => {
  
  Swal.fire({
    title: "Are you sure?",
    text: title1,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "linear-gradient(97.51deg, #1C3E35 -39.91%, #4AA48C 117.67%);",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm ",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "confirm",
        text: title2,
        icon: "success",
      });
    }
  });
};
