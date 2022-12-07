import React from 'react'
import GameAppHeader from '../../../components/GameAppHeader/GameAppHeader'
import GameInProgressAndBoost from '../../../components/GameInProgressAndBoost/GameInProgressAndBoost'
import GameQuestions from '../../../components/GameQuestions/GameQuestions'
import './GameInProgress.scss'

function GameInProgress() {
  return (
    <div className='gameInProgress' 
    style={{backgroundImage: 'url(/images/game_mode.png)'}}>
        <GameAppHeader />
        <GameInProgressAndBoost />
        <GameQuestions />
        <NextButton />
    </div>
  )
}


export default GameInProgress

const NextButton = () => {
  return(
    <div className='nextButton'>
            <p className='btnText'>Next</p>
        </div>
  )
}