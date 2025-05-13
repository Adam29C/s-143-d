import React from "react";
import GameProvider from "../../../../Helpers/GameProvider/GameCrud/GameProvider";
import PagesIndex from "../../../PagesIndex";
const List = () => {
  return (

    <div>
      <GameProvider
       path={"/admin/game"}
       title="Game Provider"
       gametype="MainGame"
      />
    </div>
  );
};

export default List;
