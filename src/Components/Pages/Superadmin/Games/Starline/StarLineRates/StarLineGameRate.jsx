import PagesIndex from "../../../../PagesIndex";
import GameRatesProvider from "../../../../../Helpers/GameProvider/GameRates/GameRatesProvider";
import { Api } from "../../../../../Config/Api";

const StarLineGameRate = () => {
  return (
    <>
      <GameRatesProvider
        gameType="StarLine"
        path={"/admin/games/starlinegamerates"}
        title="StarLine Game Rates"
        GameRate_list={Api.STARLINE_GAME_RATE_LIST}
        GameRate_add={Api.STARLINE_GAME_RATE_ADD}
        GameRate_update={Api.STARLINE_GAME_RATE_UPDATE}
        GameRate_delete={Api.STARLINE_GAME_RATE_REMOVE}
      />
    </>
  );
};

export default StarLineGameRate;
