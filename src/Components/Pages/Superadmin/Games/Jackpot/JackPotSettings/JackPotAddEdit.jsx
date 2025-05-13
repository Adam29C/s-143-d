// JackPotAddEdit
import React from "react";
import ForStarlineJackpotAdd from "../../../../../Helpers/GameProvider/GameSetting/ForStarline&JackpotAdd";
import { Api } from "../../../../../Config/Api";

const JackPotAddEdit = () => {
  return (
    <ForStarlineJackpotAdd
      gameType="JackPot"
      path="/admin/games/jackpotGameSetting"
      api_Route={Api.JACKPOT_GAME_SETTING_ADD}
      api_Route2={Api.JACKPOT_GAME_PROVIDERS}
      updateAll={Api.JACKPOT_GAME_SETTING_UPDATE_ALL}
      updateOne={Api.JACKPOT_GAME_SETTING_UPDATE_ONE}
    />
  );
};

export default JackPotAddEdit;
