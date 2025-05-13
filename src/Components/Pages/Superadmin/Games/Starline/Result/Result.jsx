import React from "react";
import GameResultMain from "../../../../../Helpers/GameProvider/GameResult/GameResultMain";
import { Api } from "../../../../../Config/Api";

const Result = () => {
  return (
    <div>
      <GameResultMain
        gameType="StarLine"
        main_result={Api.STARLINE_GAME_MAIN_RESULT}
        main_result_add={Api.STARLINE_GAME_MAIN_RESULT_ADD}
        past_result={Api.STARLINE_GAME_PAST_RESULT}
        winner_list={Api.STARLINE_GAME_WINNER_LIST}
        distribute_fund={Api.STARLINE_GAME_DISTIBUTE_FUND_WINNERS}
        remove_result={Api.STARLINE_REMOVE_RESULT}
      />
    </div>
  );
};

export default Result;
