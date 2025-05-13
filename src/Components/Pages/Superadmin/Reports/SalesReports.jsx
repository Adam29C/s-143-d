import React from "react";
import MainGameReports from "../../../Helpers/Reports/GameReports/MainGameReports";
import { Api } from "../../../Config/Api";

const SalesReports = () => {
  return (
    <div>
      <MainGameReports
        gameType={"mainGame"}
        report_api={Api.MAIN_GAME_REPORT}
        title="Sales Report"
      />
    </div>
  );
};

export default SalesReports;
