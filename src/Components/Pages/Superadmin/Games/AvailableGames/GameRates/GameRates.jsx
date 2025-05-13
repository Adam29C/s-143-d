import React from 'react'
import GameRatesProvider from '../../../../../Helpers/GameProvider/GameRates/GameRatesProvider'

const GameRates = () => {
    
 return (
    <>
    <GameRatesProvider gameType="MainGame"  path={"/admin/game/rate"} title="Game Rates"/>
 
    </>

  )
}

export default GameRates