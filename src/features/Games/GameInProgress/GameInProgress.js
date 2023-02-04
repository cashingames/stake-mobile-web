import { unwrapResult } from '@reduxjs/toolkit'
import { logEvent } from 'firebase/analytics'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import ButtonDialog from '../../../components/DoubleButtonDialog/ButtonDialog'
import GameAppHeader from '../../../components/GameAppHeader/GameAppHeader'
import GameInProgressAndBoost from '../../../components/GameInProgressAndBoost/GameInProgressAndBoost'
import GameQuestions from '../../../components/GameQuestions/GameQuestions'
import UserAvailableBoost from '../../../components/UserAvailableBoost/UserAvailableBoost'
import firebaseConfig from '../../../firebaseConfig'
import { logActionToServer } from '../../CommonSlice'
import { endGame, nextQuestion, setHasPlayedTrivia } from '../GameSlice'
import './GameInProgress.scss'

function GameInProgress() {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();
  const gameSessionToken = useSelector(state => state.game.gameSessionToken);
  const chosenOptions = useSelector(state => state.game.chosenOptions);
  const consumedBoosts = useSelector(state => state.game.consumedBoosts);
  const isPlayingTrivia = useSelector(state => state.game.isPlayingTrivia);
  const isStaking = useSelector(state => state.game.amountStaked);
  const user = useSelector(state => state.auth.user);
  const isEnded = useSelector(state => state.game.isEnded);
  const [ending, setEnding] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const analytics = firebaseConfig();

  const onEndGame = (confirm = false) => {

    if (ending) {
      //doe not delete
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
        logEvent(analytics, 'exhibition_game_completed', {
          'id': user.username,
          'phone_number': user.phoneNumber,
          'email': user.email
        });
        dispatch(logActionToServer({
          message: "Game session " + gameSessionToken + " chosen options for " + user.username,
          data: chosenOptions
        }))
        setEnding(false);
        if (isPlayingTrivia) {
          dispatch(setHasPlayedTrivia(true))
          logEvent(analytics, 'trivia_game_completed', {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email
          });
          navigate('/trivia-ended', { state: { triviaId: location.state.triviaId } })
        } else if (isStaking) {
          logEvent(analytics, 'staking_game_completed', {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email
          });
          navigate('/game-result');
        } else {
          navigate('/game-result');
        }

      })
      .catch((rejectedValueOrSerializedError) => {
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

  const openBottomSheet = async () => {
    setOpen(true)
  }

  const closeBottomSheet = async () => {
    setOpen(false)
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
      style={{ backgroundImage: 'url(/images/game_mode.png)' }}>
      <GameAppHeader onPress={showExitConfirmation} openBoost={openBottomSheet} />
      <GameInProgressAndBoost onComplete={() => onEndGame()} />
      <GameQuestions />
      <NextButton onClick={() => onEndGame()} ending={ending} />
      <BottomSheet
        open={open} closeBottomSheet={closeBottomSheet}
        BSContent={<UserAvailableBoosts onClose={closeBottomSheet}
        />}
      />
      <ButtonDialog dialogueMessage={alertMessage} open={openAlert} handleClose={closeAlert} onClick={submitGame} />
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
    <div className='nextButtonCase'>
      <button onClick={pressNext} className='nextButton' disabled={ending}>
        <p className='btnText'>{isLastQuestion ? 'Finish' : 'Next'}</p>
      </button>
    </div>
  )
}

const UserAvailableBoosts = ({ onClose }) => {
  // let navigate = useNavigate();
  const boosts = useSelector(state => state.auth.user.boosts);
  const gameMode = useSelector(state => state.game.gameMode);

  const boostsToDisplay = () => {
    if (gameMode.name === "CHALLENGE") {
      return boosts.filter(x => x.name.toUpperCase() !== "SKIP");
    }
    return boosts;
  }
  return (
    <div className="boosts-container">
      <p className="boosts-header">Available boosts</p>
      {boosts?.length > 0 ?
        <div className="boosts">
          {boostsToDisplay().map((boost, i) => <UserAvailableBoost boost={boost} key={i} onClose={onClose} />
          )}
        </div>
        :
        <p className="noBoosts">No boost available</p>
      }
    </div>
  )
}
export default GameInProgress




