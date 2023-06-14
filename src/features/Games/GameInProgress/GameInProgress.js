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
import { endGame } from '../GameSlice'
import './GameInProgress.scss'

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

  const onEndGame = (confirm = false) => {

    if (ending) {
      //do not delete
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
    setOpenAlert(true)
    setAlertMessage('You have an ongoing game, do you want to submit this game?')
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
      <GameAppHeader onPress={showExitConfirmation} gameTitle='Trivia game' />
      <StakeDetails />
      <GameInProgressAndBoost onComplete={() => onEndGame()} />
      <GameQuestions onPress={() => onEndGame()} ending={ending} onComplete={() => onEndGame()} />
      <ButtonDialog dialogueMessage={alertMessage} open={openAlert} handleClose={closeAlert} onClick={submitGame} />
    </div>
  )
}

const StakeDetails = () => {
  const amountStaked = useSelector(state => state.game.amountStaked);
  // const gameStakes = useSelector(state => state.game.gameStakes[0]);

  return (
    <div className='stake-container'>
      <div className='stake-sub-container'>
        <img src='/images/wallet-with-cash.png' alt='wallet' className='avatar' />
        <div className='stake-items'>
          <span className='stake-header'>Stake</span>
          <span className='stake-amount'>NGN {amountStaked}</span>
        </div>
      </div>
      {/* <div className='stake-sub-container'>
        <img src='/images/wallet-with-cash.png' alt='wallet' className='avatar' />
        <div className='stake-items'>
          <span className='stake-header'>Pot. winnings</span>
          <span className='stake-amount'>NGN {amountStaked * (gameStakes.odd)}</span>
        </div>
      </div> */}
    </div>
  )
}

export default GameInProgress




