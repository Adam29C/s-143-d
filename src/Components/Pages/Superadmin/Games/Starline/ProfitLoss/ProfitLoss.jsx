import React from "react";
import ProfitLoss from "../../../../../Helpers/GameProvider/ProfitLoss/ProfitLoss";
import { Api } from "../../../../../Config/Api";

const ProfitLosss = () => {
  return (
    <div>
      <ProfitLoss
      title="StarLine Profit Loss"
      gameType="StarLine"
      providersList={Api.STARLINE_GAME_PROVIDERS_LIST}
      getProfiLoss={Api.STARLINE_GAME_PROFIT_LOSS_LIST}
      getBidData={Api.STARLINE_GAME_PROFIT_LOSS_BID_DATA}
      />
    </div>
  );
};

export default ProfitLosss;
