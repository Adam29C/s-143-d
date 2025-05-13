import React from "react";
import GameResultMain from "../../../../../Helpers/GameProvider/GameResult/GameResultMain";
import { Api } from "../../../../../Config/Api";

const Result = () => {
  return (
    <div>
      <GameResultMain
        gameType="JackPot"
        main_result={Api.JACKPOT_GAME_MAIN_RESULT}
        main_result_add={Api.JACKPOT_GAME_MAIN_RESULT_ADD}
        past_result={Api.JACKPOT_GAME_PAST_RESULT}
        winner_list={Api.JACKPOT_GAME_WINNER_LIST}
        distribute_fund={Api.JACKPOT_GAME_DISTIBUTE_FUND_WINNERS}
        remove_result={Api.JACKPOT_REMOVE_RESULT}
      />
    </div>
  );
};

export default Result;
