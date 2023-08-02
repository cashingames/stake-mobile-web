import { unwrapResult } from '@reduxjs/toolkit'
import { logEvent } from 'firebase/analytics'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ButtonDialog from '../../../components/DoubleButtonDialog/ButtonDialog'
import GameAppHeader from '../../../components/GameAppHeader/GameAppHeader'
import GameInProgressAndBoost from '../../../components/GameInProgressAndBoost/GameInProgressAndBoost'
import GameQuestions from '../../../components/GameQuestions/GameQuestions'
import firebaseConfig from '../../../firebaseConfig'
import { endGame, endPracticeGame } from '../GameSlice'
import './GameInProgress.scss';
import Dialogue from '../../../components/Dialogue/Dialogue'


function GameInProgress() {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const gameSessionToken = useSelector(state => state.game.gameSessionToken);
  const chosenOptions = useSelector(state => state.game.chosenOptions);
  const consumedBoosts = useSelector(state => state.game.consumedBoosts);
  const user = useSelector(state => state.auth.user);
  const isEnded = useSelector(state => state.game.isEnded);
  const [ending, setEnding] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const analytics = firebaseConfig();
  const cashMode = useSelector(state => state.game.cashMode);
  const practiceMode = useSelector(state => state.game.practiceMode);
  const [exitClicked, setExitClicked] = useState(false);


  const onEndGame = (confirm = false) => {
    setExitClicked(false)
    if (ending) {
      //do not delete
      return;
    }

    setEnding(true);
    if (confirm) {
      showExitConfirmation()
      return;
    }

    if (cashMode) {
      dispatch(endGame({
        token: gameSessionToken,
        chosenOptions,
        consumedBoosts
      }))
        .then(unwrapResult)
        .then(() => {
          logEvent(analytics, 'exhibition_staking_game_ended', {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email
          });
          navigate('/game-result');
        })
        .catch((_rejectedValueOrSerializedError) => {
          logEvent(analytics, 'exhibition_staking_game_error', {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email
          });
          setEnding(false);
          setOpenAlert(true);
          setAlertMessage('failed to end game');
        });
    }

    if (practiceMode) {
      dispatch(endPracticeGame({
        token: gameSessionToken,
        chosenOptions,
        consumedBoosts
      }))
        .then(unwrapResult)
        .then(() => {
          logEvent(analytics, 'practice_stake_game_completed', {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email
          });
          navigate('/game-result');
        })
        .catch((_rejectedValueOrSerializedError) => {
          logEvent(analytics, 'practice_stake_game_error', {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email
          });
          setEnding(false);
          setOpenAlert(true);
          setAlertMessage('failed to end game');
        });
    }
  }

  const handleGameBoardTabClosing = () => {
    onEndGame();
  }

  const alertUserBeforeClosinigGame = (event) => {
    event.preventDefault();
    event.returnValue = '';
  }

  const closeAlert = () => {
    setOpenAlert(false)
  }

  const submitGame = () => {
    setOpenAlert(false)
    onEndGame()
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
    setExitClicked(true)
    setOpenAlert(true);
    if (practiceMode) {
      setAlertMessage("Are you sure you want to cancel demo game?");
  }
  else if (cashMode) {
      setAlertMessage("Are you sure you want to end staked game?");
  }
  }

  const goHome = () => {
    setOpenAlert(false)
    navigate('/dashboard');
  }

  //disable browser back button
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  })

  if (isEnded) {
    return null;
  }


  return (
    <div className='gameInProgress'
      style={{ backgroundImage: 'url(/images/game-play-background.png)' }}>
      <GameAppHeader onPress={showExitConfirmation} gameTitle='Trivia Game' />
      <GameInProgressAndBoost onComplete={() => onEndGame()} />
      <GameQuestions onPress={() => onEndGame()} ending={ending} onComplete={() => onEndGame()} />
      {exitClicked ?
      <ButtonDialog dialogueMessage={alertMessage} open={openAlert} handleClose={closeAlert} onClick={submitGame} />
      :
      <Dialogue dialogueMessage={alertMessage} open={openAlert} handleClose={goHome} />
}
    </div>
  )
}


export default GameInProgress




