import React from "react";
import GameRatesProvider from "../../../../../Helpers/GameProvider/GameRates/GameRatesProvider";
import { Api } from "../../../../../Config/Api";
const JackPotRates = () => {
  return (
    <GameRatesProvider
      gameType="JackPot"
      path={"/admin/games/jackpotRates"}
      title="JackPot Game Rates"
      GameRate_list={Api.JACKPOT_GAME_RATE_LIST}
      GameRate_add={Api.JACKPOT_GAME_RATE_ADD}
      GameRate_update={Api.JACKPOT_GAME_RATE_UPDATE}
      GameRate_delete={Api.JACKPOT_GAME_RATE_REMOVE}
    />
  );
};

export default JackPotRates;
