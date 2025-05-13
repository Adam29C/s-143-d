import React from "react";
import GameRefundList from "../../../../Helpers/GameProvider/GameRefundList/GameRefundList";
import { Api } from "../../../../Config/Api";

const StarlineRefundList = () => {
  return (
    <div>
      <GameRefundList
      title="Refund User Points"
      gametype={"maingame"}
        refund_list={Api.MAIN_GAME_GET_REFUND_LIST}
        refund_payment={Api.MAIN_GAME_CONFIRM_REVERT_PAYMENT_All}
        provider_list={Api.MAIN_GAME}
      />
    </div>
  );
};

export default StarlineRefundList;
