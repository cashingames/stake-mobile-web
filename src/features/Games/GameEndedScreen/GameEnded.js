import React from 'react'
import './GameEnded.scss'
import AnimatedClock from '../../../components/AnimatedClock/AnimatedClock'
import UserName from '../../../components/UserName/UserName'
import UserResultInfo from '../../../components/UserResultInfo/UserResultInfo'
import Winnings from '../../../components/Winnings/Winnings'
import SeeRank from '../../../components/SeeRank/SeeRank'
import FinalScore from '../../../components/FinalScore/FinalScore'
import GameButton from '../../../components/GameButton/GameButton'

function GameEnded() {
  return (
    <div className='gameEndedCase'>
        <AnimatedClock />
        <UserName />
        <UserResultInfo />
        <Winnings />
        <SeeRank />
        <FinalScore />
        <GameButton />
    </div>
  )
}

export default GameEnded