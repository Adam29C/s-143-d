import React, { useState, useEffect } from "react";

const ToggleDark = () => {
  const getColor = localStorage.getItem("theme_Color");
  const status = localStorage.getItem("theme_status");

  const [changeDark, setChangeDark] = useState(getColor);
  const [Checkbox, setCheckbox] = useState(status);

  const func = () => {
    if (changeDark === "dark") {
      localStorage.setItem("theme_Color", changeDark);
      localStorage.setItem("theme_status", true);
      document.body.setAttribute("data-theme-version", "dark");
    } else {
      localStorage.setItem("theme_Color", changeDark);
      localStorage.setItem("theme_status", false);
      document.body.setAttribute("data-theme-version", "light");
    }
  };
  useEffect(() => {
    func();
  }, [changeDark, status]);

  const handleToggle = () => {
    setChangeDark(changeDark === "light" ? "dark" : "light");
    setCheckbox(!Checkbox);
  };

  return (
    <div>
      <input
        type="checkbox"
        class="checkbox"
        id="checkbox"
        onChange={() => handleToggle("dark")}
        defaultChecked={Checkbox}
      />
      <label for="checkbox" class="checkbox-label">
        <i class="fas fa-sun"></i>
        <i class="fas fa-moon"></i>
        <span class="ball"></span>
      </label>
    </div>
  );
};

export default ToggleDark;
