import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import GameAppHeader from '../../../components/GameAppHeader/GameAppHeader'
import GameInProgressAndBoost from '../../../components/GameInProgressAndBoost/GameInProgressAndBoost'
import GameQuestions from '../../../components/GameQuestions/GameQuestions'
import UserAvailableBoost from '../../../components/UserAvailableBoost/UserAvailableBoost'
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
  const [open, setOpen] = useState(false);



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
          navigate('/game-result');
          // alert('game ended')
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
    onEndGame();
  }

  //disable browser back button
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  })

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
      <GameAppHeader onPress={onEndGame} openBoost={openBottomSheet} />
      <GameInProgressAndBoost onComplete={() => onEndGame()} />
      <GameQuestions />
      <NextButton onClick={() => onEndGame()} ending={ending} />
      <BottomSheet
        open={open} closeBottomSheet={closeBottomSheet}
        BSContent={<UserAvailableBoosts onClose={closeBottomSheet}
        />}
      />
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

