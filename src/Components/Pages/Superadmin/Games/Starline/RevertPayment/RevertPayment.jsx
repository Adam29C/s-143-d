import React from "react";

import { Api } from "../../../../../Config/Api";
import RevertPayment from "../../../../../Helpers/GameProvider/RevertPayment/RevertPayment";

const Result = () => {
  return (
    <div>
      <RevertPayment
        gameType="StarLine"
        main_result={Api.STARLINE_GAME_REVERT_PAYMENT}
        confirm_revert_payment={Api.STARLINE_GAME_CONFIRM_REVERT_PAYMENT}
        title={"Revert Game Result Payment"}
      />
    </div>
  );
};

export default Result;
