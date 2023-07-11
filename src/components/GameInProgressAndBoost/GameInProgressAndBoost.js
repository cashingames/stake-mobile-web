import React from 'react'
import './GameInProgressAndBoost.scss'
import GameTopicProgress from '../GameTopicProgress/GameTopicProgress'
import AvailableBoostSession from '../AvailableBoostSession/AvailableBoostSession'

function GameProgressAndBoost({onComplete}) {

    return (
        <div className='game-progress-boost'>
            <GameTopicProgress onComplete={onComplete} />
            <AvailableBoostSession />
        </div>
    )
}

export default GameProgressAndBoost