import React from "react";
import ProfitLoss from "../../../../../Helpers/GameProvider/ProfitLoss/ProfitLoss";
import { Api } from "../../../../../Config/Api";

const ProfitLosss = () => {
  return (
    <div>
      <ProfitLoss
      title="JackPot Profit Loss"
        gameType="JackPot"
        providersList={Api.JACKPOT_GAME_PROVIDERS}
        getProfiLoss={Api.JACKPOT_GAME_PROFIT_LOSS_LIST}
        getBidData={Api.JACKPOT_GAME_PROFIT_LOSS_BID_DATA}
      />
    </div>
  );
};

export default ProfitLosss;
