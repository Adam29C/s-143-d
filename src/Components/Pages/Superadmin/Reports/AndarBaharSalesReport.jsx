import React from "react";
import MainGameReports from "../../../Helpers/Reports/GameReports/MainGameReports";
import { Api } from "../../../Config/Api";

const SalesReports = () => {
  return (
    <div>
      <MainGameReports
        gameType={"JACKPOT"}
        report_api={Api.JACKPOT_REPORT}
        starandjackProvider={Api.JACKPOT_GAME_PROVIDERS}
title="Andar Bahar Sales Report"
/>
    </div>
  );
};

export default SalesReports;
