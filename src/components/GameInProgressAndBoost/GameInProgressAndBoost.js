import React from 'react'
import './GameInProgressAndBoost.scss'
import GameTopicProgress from '../GameTopicProgress/GameTopicProgress'
import AvailableBoostSession from '../AvailableBoostSession/AvailableBoostSession'

function GameProgressAndBoost() {

    return (
        <div className='gameProgressBoost'>
            <GameTopicProgress />
            <AvailableBoostSession />
        </div>
    )
}

export default GameProgressAndBoost