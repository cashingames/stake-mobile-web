import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LiveTriviaCard.scss'
import { getLiveTriviaStatus } from './LiveTriviaSlice';
import { calculateTimeRemaining } from "../../utils/utils";
import { BiAlarm, BiCaretRight } from "react-icons/bi";


function LiveTriviaCard({ trivia }) {
  const dispatch = useDispatch();
  const initialLoading = useSelector(state => state.common.initialLoading);
  let navigate = useNavigate();
  const [showText, setShowText] = useState(true);


  // useEffect(() => {
  //   console.log('here')
  //   if (initialLoading)
  //   return;    
  //   dispatch(getLiveTriviaStatus())
  // }, [initialLoading]);

  const triviaActionButtonClicked = () => {
    if (trivia.playerStatus === "INSUFFICIENTPOINTS" && trivia.status === "ONGOING") {
      // notEnoughPointNotice.current.open()

    } else if (trivia.playerStatus === "PLAYED" || trivia.status === "EXPIRED" || trivia.status === "CLOSED") {
      navigate('LiveTriviaLeaderboard', { triviaId: trivia.id })

    } else if (trivia.playerStatus === "CANPLAY" && trivia.status !== "EXPIRED") {
      navigate('TriviaInstructions', { ...trivia })
    }
  }

  useEffect(() => {
    dispatch(getLiveTriviaStatus())
  }, []);

  useEffect(() => {
    // Change the state every second or the time given by User.
    const interval = setInterval(() => {
      setShowText((showText) => !showText);
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  if (!trivia) {
    return null;
  }

  return (
    <div className='trivialContainer'
      style={{ backgroundImage: "url(/images/live-trivia-card-background-blue.png)" }}>
      <div className='trivialTopTexts'>
        <p className='topText'>{trivia.title}</p>
        {trivia.status === "WAITING" || trivia.status === "ONGOING" ?
          <div className={`requiredText ${showText ? 'trivialBlink' : 'trivialNoBlink'}`}>
            <p>{trivia.pointsRequired} pts</p>
            <p>Required</p>
          </div>
          :
          <div className='requiredText'>
            <p>{trivia.pointsRequired} pts</p>
            <p>Required</p>
          </div>
        }
      </div>

      <div className='trivialInfo'>
        <p className='triviaTitle'>{trivia.prizeDisplayText}</p>
        {trivia.status === "EXPIRED" ?
          <p className='triviaTime'>{trivia.startAt}</p> :
          <p className='triviaTime'>{trivia.startDateDisplayText}</p>

        }
      </div>

      <div className='trivaImg'>
        <div className='timer'>
          <TriviaStatus trivia={trivia} />
          <img src='/images/yellow-line-bottom.png' alt='bottom line' />
        </div>
        <TriviaAction trivia={trivia} action={triviaActionButtonClicked} />
      </div>
    </div>

  )
}

const TriviaStatus = ({ trivia }) => {

  const { status, statusDisplayText } = trivia;

  if (status === "WAITING") {
    return <TriviaCountDown trivia={trivia} />
  }

  return <p className='statusText'>STATUS: {statusDisplayText}</p>
}

const TriviaCountDown = ({ trivia }) => {
  const dispatch = useDispatch();
  const [triviaTimer, setTriviaTimer] = useState('');
  const style = { color: '#000000', fontSize: "1.2rem" }



  useEffect(() => {
    if (!trivia || trivia.status !== "WAITING") {
      return;
    }

    const onComplete = () => {
      clearInterval(countDown);
      dispatch(getLiveTriviaStatus());
    }

    const countDown = setInterval(() => {
      const timeString = calculateTimeRemaining(trivia.startAtUtc, onComplete);
      setTriviaTimer(timeString);
    }, 1000);

    return () => clearInterval(countDown);

  }, [trivia])

  return (
    <>
      <BiAlarm style={style} />
      <p className='timerText'>Starts in {triviaTimer}</p>
    </>
  )
}

const TriviaAction = ({ trivia, action }) => {
  const style = { color: '#000000', fontSize: "2rem" }

  let { actionDisplayText } = trivia;

  if (actionDisplayText === "") {
    return null;
  }

  return (
    <button className='triviaButton' onClick={action}>
      <p className='triviaButtonText'>{actionDisplayText}</p>
      <BiCaretRight style={style} />

    </button>
  )
}

export default LiveTriviaCard;