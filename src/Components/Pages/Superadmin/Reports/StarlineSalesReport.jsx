import React from "react";
import MainGameReports from "../../../Helpers/Reports/GameReports/MainGameReports";
import { Api } from "../../../Config/Api";

const SalesReports = () => {
  return (
    <div>
      <MainGameReports
        gameType={"STARLINE"}
        report_api={Api.STARLINE_GAME_REPORT}
        starandjackProvider={Api.STARLINE_GAME_PROVIDERS}
        title="Starline Sales Report"
      />
    </div>
  );
};

export default SalesReports;
