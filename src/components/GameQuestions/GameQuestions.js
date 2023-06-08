import React from 'react'
import GameOption from '../GameOptions/GameOption'
import './GameQuestions.scss'
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion, questionAnswered } from '../../features/Games/GameSlice';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


function GameQuestions({ onComplete, onPress, ending }) {

  const dispatch = useDispatch();
  const displayedQuestion = useSelector(state => state.game.displayedQuestion);
  const displayedOptions = useSelector(state => state.game.displayedOptions);
  const countdownKey = useSelector(state => state.game.countdownKey);
  const gameDuration = useSelector(state => state.game.gameDuration);
  const isEnded = useSelector(state => state.game.isEnded);
  const index = useSelector(state => state.game.currentQuestionPosition);


  const optionSelected = (option) => {
    dispatch(questionAnswered(option));
  }

  return (
    <div className='questions-container'>
      <div style={{ backgroundImage: 'url(/images/coins-background.png)' }} className='question-background' >
        <div className='timer-container'>
          <span className='question-count'>Q{index + 1}</span>
          <div className='countdownCase'>
            {!isEnded &&
              <CountdownCircleTimer isPlaying
                duration={gameDuration}
                colors={
                  ['#F2C8BC', '#E15220', '#E15220']
                }
                colorsTime={
                  [
                    gameDuration / 2,
                    gameDuration / 4,
                    0
                  ]
                }
                trailColor="#E15220"
                size={45}
                strokeWidth={5}
                onComplete={onComplete}
                key={countdownKey}>
                {({ remainingTime }) => (
                  <p className='timerCount'>{remainingTime}</p>
                )}
              </CountdownCircleTimer>
            }
          </div>
        </div>
        <div className='game-questions'>
          <span className='game-question'>{displayedQuestion.label}</span>
        </div>
        <span className='pick-text'>Pick correct answer</span>
        <div className='options'>
          {displayedOptions.map((option, i) => <GameOption option={option} key={i} onSelected={() => optionSelected(option)} />)}
        </div>
        <NextButton onClick={onPress} ending={ending} />
      </div>
    </div>
  )
}

const NextButton = ({ onClick, ending }) => {
  const dispatch = useDispatch()
  const isLastQuestion = useSelector(state => state.game.isLastQuestion);
  const pressNext = () => {
    dispatch(isLastQuestion ? onClick : nextQuestion())
  }
  return (
    <div className='next-button-case'>
      <button onClick={pressNext} className='nextButton' disabled={ending}>
        <p className='btnText'>{isLastQuestion ? 'Finish' : 'Next'}</p>
      </button>
    </div>
  )
}

export default GameQuestions