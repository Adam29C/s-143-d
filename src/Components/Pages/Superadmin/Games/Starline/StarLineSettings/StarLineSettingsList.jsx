import React from "react";
import GameSettings from "../../../../../Helpers/GameProvider/GameSetting/GameSettings";
import { Api } from "../../../../../Config/Api";

const StarLineSettingsList = () => {
  
  return (
    <>
      <GameSettings
        path={"/admin/games/starlinegamesetting"}
        title="Starline Game Settings"
        gameType="StarLine"
        api_Route={Api.STARLINE_GAME_SETTING_LIST}
      />
    </>
  );
};

export default StarLineSettingsList;
