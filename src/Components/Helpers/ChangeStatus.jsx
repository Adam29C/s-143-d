import React, { useEffect, useState } from "react";
import PagesIndex from "../Pages/PagesIndex";

const ChangeStatus = ({ rowData, apiRoute, checkboxStatus, req }) => {
  const userId = localStorage.getItem("userId");

  const [isChecked, setIsChecked] = useState(checkboxStatus);

  // useEffect(() => {
  //   setIsChecked(checkboxStatus);
  // }, [checkboxStatus]);

  const updateStatus = async () => {
    // setIsChecked(!isChecked);
    const newStatus = !isChecked;
    setIsChecked(newStatus); 

    try {
      const res = await apiRoute({
        adminId: userId,
        ...req,
        isBlock: newStatus,
      });

      if (res.status === 200) {
        PagesIndex.toast.success(res.message);
      } else {
        throw new Error(res.response.data.message);
      }
    } catch (error) {
      setIsChecked(!newStatus); 
      PagesIndex.toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          id="employee-switch"
          checked={isChecked}
          onChange={updateStatus}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ChangeStatus;