import React from "react";
import GameProvider from "../../../../../Helpers/GameProvider/GameCrud/GameProvider";
import PagesIndex from "../../../../PagesIndex";
import { Api } from "../../../../../Config/Api";

const StarLineProvider = () => {
  return (
    <div>
      <GameProvider
        path="/starGameProvider/getStarlineProvider"
        title="StarLine Provider"
        gametype="StarLine"
        provider_list={Api.STARLINE_GAME_PROVIDERS_LIST}
        add_provider={Api.STARLINE_GAME_PROVIDER_ADD}
        edit_provider={Api.STARLINE_GAME_PROVIDER_UPDATE}
        remove_provider={Api.STARLINE_GAME_PROVIDERS_DELETE}
      />
    </div>
  );
};

export default StarLineProvider;
