import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GameAppHeader from '../../../components/GameAppHeader/GameAppHeader'
import GameInProgressAndBoost from '../../../components/GameInProgressAndBoost/GameInProgressAndBoost'
import GameQuestions from '../../../components/GameQuestions/GameQuestions'
import { logActionToServer } from '../../CommonSlice'
import { endGame, nextQuestion, setHasPlayedTrivia } from '../GameSlice'
import './GameInProgress.scss'

function GameInProgress() {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const gameSessionToken = useSelector(state => state.game.gameSessionToken);
  const chosenOptions = useSelector(state => state.game.chosenOptions);
  const consumedBoosts = useSelector(state => state.game.consumedBoosts);
  const isPlayingTrivia = useSelector(state => state.game.isPlayingTrivia);
  const user = useSelector(state => state.auth.user);
  const isEnded = useSelector(state => state.game.isEnded);
  const [ending, setEnding] = useState(false);
  const features = useSelector(state => state.common.featureFlags);


  const onEndGame = (confirm = false) => {

    if (ending) {
      //doe not delete
      // console.log("Trying to end second time. If this happens, please notify Oye")
      return;
    }

    setEnding(true);
    if (confirm) {
      showExitConfirmation()
      return;
    }

    dispatch(endGame({
      token: gameSessionToken,
      chosenOptions,
      consumedBoosts
    }))
      .then(unwrapResult)
      .then(async () => {
        dispatch(logActionToServer({
          message: "Game session " + gameSessionToken + " chosen options for " + user.username,
          data: chosenOptions
        }))
          .then(unwrapResult)
          .then(result => {
            // console.log(result, 'Action logged to server to end game');
          })
          .catch(() => {
            // console.log('failed to log to server');
          });
        setEnding(false);
        if (isPlayingTrivia) {
          dispatch(setHasPlayedTrivia(true))
          alert('its trivia')
          // navigate('TriviaEndResult', {
          //     triviaId: params.triviaId,
          // })
        } else {
          // navigate('GameEndResult');
          alert('game ended')
        }

      })
      .catch((rejectedValueOrSerializedError) => {
        setEnding(false);
        // console.log(rejectedValueOrSerializedError);
        alert('failed to end game')
      });
  }


  const handleGameBoardTabClosing = () => {
    onEndGame();
  }

  const alertUserBeforeClosinigGame = (event) => {
    event.preventDefault();
    event.returnValue = '';
  }

  useEffect(() => {
    window.addEventListener('beforeunload', alertUserBeforeClosinigGame)
    window.addEventListener('unload', handleGameBoardTabClosing)
    return () => {
      window.removeEventListener('beforeunload', alertUserBeforeClosinigGame)
      window.removeEventListener('unload', handleGameBoardTabClosing)
    }
  })

  const showExitConfirmation = () => {
    onEndGame();
  }

  useEffect(() => {
    if (features.length < 1) {
      navigate('/dashboard')
    }
    return
  })

  if (isEnded) {
    return null;
  }


  return (
    <div className='gameInProgress'
      style={{ backgroundImage: 'url(/images/game_mode.png)' }}>
      <GameAppHeader onPress={onEndGame} />
      <GameInProgressAndBoost onComplete={() => onEndGame()} />
      <GameQuestions />
      <NextButton onClick={() => onEndGame()} ending={ending} />
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
    <button onClick={pressNext} className='nextButton' disabled={ending}>
      <p className='btnText'>{isLastQuestion ? 'Finish' : 'Next'}</p>
    </button>
  )
}
export default GameInProgress

