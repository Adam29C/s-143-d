import React from "react";
import GameProvider from "../../../../../Helpers/GameProvider/GameCrud/GameProvider";
import { Api } from "../../../../../Config/Api";
const JackpotProvider = () => {


  return (
    <div>
      <GameProvider
       path="/admin/games/jackpotProvider"
       title="JackPot Provider"
       gametype="JackPot"
       provider_list={Api.JACKPOT_GAME_PROVIDER_LIST}
       add_provider={Api.JACKPOT_GAME_PROVIDER_ADD}
       edit_provider={Api.JACKPOT_GAME_PROVIDER_UPDATE}
       remove_provider={Api.JACKPOT_GAME_PROVIDERS_DELETE}
      />
      
    </div>
  );
};

export default JackpotProvider;
