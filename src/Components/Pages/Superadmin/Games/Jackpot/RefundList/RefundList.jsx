import React from "react";
import GameRefundList from "../../../../../Helpers/GameProvider/GameRefundList/GameRefundList";
import { Api } from "../../../../../Config/Api";

const StarlineRefundList = () => {
  return (
    <div>
      <GameRefundList
        gametype={"Jackpot"}
        title={"Jackpot Refund List"}
        // refund_list={Api.MAIN_GAME_GET_REFUND_LIST}
        refund_payment={Api.JACKPOT_GAME_CONFIRM_REFUND_PAYMENT_}
        provider_list={Api.JACKPOT_GAME_PROVIDERS}
        refund_list={Api.JACKPOT_GAME_REFUND_PAYMENT}
      />
      
    </div>
  );
};

export default StarlineRefundList;
