import React from 'react';
import { useSelector } from 'react-redux';
import { Player } from '@lottiefiles/react-lottie-player';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import GameBoard from '../../assets/game-board.json';
import './ChallengeGameWidget.scss';


function ChallengeGameWidget({ onComplete }) {
    const countdownKey = useSelector(state => state.triviaChallenge.countdownKey);
    const isGamePaused = useSelector(state => state.triviaChallenge.countdownFrozen);
    const gameDuration = useSelector(state => state.triviaChallenge.gameDuration);


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
                } />


            <div className='gameProgressTimer'>
                <AnsweredGameProgress />
                <div className='countdownCase'>

                    <CountdownCircleTimer
                        isPlaying = {!isGamePaused}
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
                        onComplete={onComplete}
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

function AnsweredGameProgress() {
    const totalQuestions = useSelector(state => state.triviaChallenge.totalQuestions);
    const currentQuestionIndex = useSelector(state => state.triviaChallenge.currentQuestionIndex);
    return (
        <div style={{ width: 60, height: 60 }}>
            <CircularProgressbar
            strokeWidth={8}
            value={currentQuestionIndex + 1} 
            text={`${currentQuestionIndex + 1} / ${totalQuestions}`} 
            styles={buildStyles({
                textColor:'#fff',
            })}
            />
        </div>
    )
}

export default ChallengeGameWidget