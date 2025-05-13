// JackPotSettings
import React from "react";
import GameSettings from "../../../../../Helpers/GameProvider/GameSetting/GameSettings";
import { Api } from "../../../../../Config/Api";

const JackPotSettings = () => {
  return (
    <>
      <GameSettings
        path={"/admin/games/jackpotGameSetting"}
        title="JackPot Game Settings"
        gameType="JackPot"
        api_Route={Api.JACKPOT_GAME_SETTING_LIST}
      />
    </>
  );
};

export default JackPotSettings;



