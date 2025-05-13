import React from "react";

import { Api } from "../../../../../Config/Api";
import RevertPayment from "../../../../../Helpers/GameProvider/RevertPayment/RevertPayment";

const Result = () => {
  return (
    <div>
      <RevertPayment
        gameType="JackPot"
        main_result={Api.JACKPOT_GAME_REVERT_PAYMENT}
        confirm_revert_payment={Api.JACKPOT_GAME_CONFIRM_REVERT_PAYMENT}
        title={"Revert Game Result Payment"}
      />
    </div>
  );
};

export default Result;
