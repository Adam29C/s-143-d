import React from "react";
import GameSettings from "../../../../Helpers/GameProvider/GameSetting/GameSettings";

const GameSettingList = () => {
  return (
    <>
      <GameSettings
        path={"/admin/game/setting"}
        title="Game Setting "
        gameType="MainGame"
      />
    </>
  );
};

export default GameSettingList;
