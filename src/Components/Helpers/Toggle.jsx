import React, { useEffect, useState } from "react";

const Toggle = ({ check, updateStatusApi }) => {
  const [isChecked, setIsChecked] = useState(check);

  const abdesx = () => {
    const checkbox = document.getElementById("employee-switch");
    if (checkbox) {
      checkbox.checked = check;
    }
  };
  useEffect(() => {
    abdesx();
  }, [check]);

  const updateStatus = (e) => {
    setIsChecked(e.target.checked);
    updateStatusApi();
    // alert("")
  };

  return (
    <>
      <div>
        <label class="switch">
          <input
            type="checkbox"
            id="employee-switch"
            checked={isChecked}
            onChange={(e) => updateStatus(e)}
          />
          <span class="slider round"></span>
        </label>
      </div>
    </>
  );
};

export default Toggle;
