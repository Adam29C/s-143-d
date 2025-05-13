import React from "react";
import ForStarlineJackpotAdd from "../../../../../Helpers/GameProvider/GameSetting/ForStarline&JackpotAdd";
import { Api } from "../../../../../Config/Api";

const StarLineSettingsAddEdit = () => {
  return (
    <ForStarlineJackpotAdd
      gameType="StarLine"
      path="/admin/games/starlinegamesetting"
      api_Route={Api.STARLINE_GAME_SETTING_ADD}
      api_Route2={Api.STARLINE_GAME_PROVIDERS}
      updateAll={Api.STARLINE_GAME_SETTING_UPDATE_ALL}
      updateOne={Api.STARLINE_GAME_SETTING_UPDATE_ONE}
    />
  );
};

export default StarLineSettingsAddEdit;
