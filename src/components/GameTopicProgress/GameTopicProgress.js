import React from 'react'
import {Player} from '@lottiefiles/react-lottie-player'
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import GameBoard from '../../assets/game-board.json'
import './GameTopicProgress.scss'
import { useSelector } from 'react-redux'
import AnsweredGameProgress from '../AnsweredGameProgress/AnsweredGameProgress'

function GameTopicProgress() {
    const countdownKey = useSelector(state => state.game.countdownKey);
    const gameDuration = useSelector(state => state.game.gameDuration);


  return (
    <div className='inProgress'>
            <Player src={GameBoard}
                alt='Game Board'
                autoplay
                loop
                className='player'
                style={
                    {
                        height: '110px',
                        width: '110px'
                    }
                }/>


                <div className='gameProgressTimer'>
                <AnsweredGameProgress />
                <div className='countdownCase'>
            <CountdownCircleTimer isPlaying
                duration={gameDuration}
                colors={
                    ['#fff', '#F7B801', '#A30000']
                }
                colorsTime={
                    [
                        gameDuration / 2,
                        gameDuration / 4,
                        0
                    ]
                }
                trailColor="#2D9CDB"
                size={60}
                strokeWidth={5}
                key={countdownKey}>
                {({ remainingTime }) => (
                    <p className='timerCount'>{remainingTime}</p>
                    )}
             </CountdownCircleTimer>
            </div>
            </div>
        </div>
  )
}

export default GameTopicProgress