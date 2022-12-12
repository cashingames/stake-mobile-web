import React from 'react'
import './GameInProgressAndBoost.scss'
import GameTopicProgress from '../GameTopicProgress/GameTopicProgress'
import AvailableBoostSession from '../AvailableBoostSession/AvailableBoostSession'

function GameProgressAndBoost({onComplete}) {

    return (
        <div className='gameProgressBoost'>
            <GameTopicProgress onComplete={onComplete} />
            <AvailableBoostSession />
        </div>
    )
}

export default GameProgressAndBoost