import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LiveTriviaCard.scss'
import { getLiveTriviaStatus, liveTriviaPayment } from './LiveTriviaSlice';
import { getUser } from '../../features/Auth/AuthSlice'
import { calculateTimeRemaining } from "../../utils/utils";
import { BiAlarm, BiCheckCircle } from "react-icons/bi";
import { formatCurrency } from '../../utils/stringUtl';
import { unwrapResult } from '@reduxjs/toolkit';
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import LowWallet from '../../components/LowWallet/LowWallet';
import Dialogue from '../../components/Dialogue/Dialogue'
import { Spinner } from 'react-activity';
import DoubleDialog from '../../components/DoubleButtonDialog/DoubleDialogButton';
import ButtonDialog from '../../components/DoubleButtonDialog/ButtonDialog';
import LiveTriviaEntryFailed from './LiveTriviaEntryFailed/LiveTriviaEntryFailed';
import { IoChevronForwardOutline } from 'react-icons/io5';



function LiveTriviaCard({ trivia }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openPaymentAlert, setOpenPaymentAlert] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const user = useSelector(state => state.auth.user);
  const [alertMessage, setAlertMessage] = useState('');


  const openBottomSheet = () => {
    setOpen(true)
  }

  const closeBottomSheet = () => {
    setOpen(false)
  }

  //dialogue function
  const closeAlert = () => {
    setOpenAlert(false)
  }

  const closePaymentAlert = () => {
    setOpenPaymentAlert(false)
  }

  const closePayment = () => {
    setOpenPayment(false)
  }

  const payForLiveTrivia = () => {
    dispatch(liveTriviaPayment({
      liveTriviaId: trivia.id
    }))
      .then(unwrapResult)
      .then(result => {
        dispatch(getLiveTriviaStatus())
        dispatch(getUser());
        if (trivia.status === "WAITING") {
          setOpenPaymentAlert(false)
          setOpenAlert(true)
          setAlertMessage('You have successfully paid for this live triva')
          return;
        }
        if (trivia.playerStatus === "CANPLAY" && trivia.status !== "EXPIRED") {
          setOpenPaymentAlert(false)
          navigate('/live-trivia-instructions', {state: {...trivia}})
          return;
        }
        setLoading(false);
      })
      .catch((rejectedValueOrSerializedError) => {
        setOpenAlert(true)
        setAlertMessage(rejectedValueOrSerializedError.message)
        setLoading(false);
      });
  }

  const payForOngoingLiveTrivia = () => {
    setLoading(true)
    dispatch(liveTriviaPayment({
      liveTriviaId: trivia.id
    }))
      .then(unwrapResult)
      .then(result => {
        console.log('paid')
        navigate('/live-trivia-instructions', {state: {...trivia}})
        setLoading(false);
      })
      .catch((rejectedValueOrSerializedError) => {
        setOpenAlert(true)
        setAlertMessage(rejectedValueOrSerializedError.message)
        setLoading(false);
      });
  }

  const TriviaEntryFeePaymentConfirmation = () => {
    setLoading(true)
    if (trivia.entryFee > user.walletBalance) {
      setLoading(false);
      openBottomSheet()
      return
    }

    if (trivia.entryFee < user.walletBalance) {
      setOpenPaymentAlert(true)
      setLoading(false);
      setAlertMessage(
        `An amount of ${trivia.entryFee} naira would be deducted from your wallet balance as entry fee for this live trivia  `
      );

      return
    }

  }

  const triviaActionButtonClicked = () => {
    if (trivia.playerStatus === "INSUFFICIENTPOINTS" && trivia.status === "ONGOING") {
      openBottomSheet();
    }
    else if (trivia.entryFee > user.walletBalance && trivia.status === "ONGOING" && trivia.entryFreePaid === false) {
      openBottomSheet()
    }
    else if (trivia.playerStatus === "PLAYED" || trivia.status === "EXPIRED" || trivia.status === "CLOSED") {
      navigate('/trivia-leaderboard/'+ trivia.id )

    }
    else if (trivia.playerStatus === "CANPLAY" && trivia.status !== "EXPIRED") {
      // eslint-disable-next-line
      {trivia.isFreeLiveTrivia === false && trivia.entryFreePaid === false &&
          setOpenPayment(true)
        setAlertMessage(
          `An amount of ${trivia.entryFee} naira would be deducted from your wallet balance as entry fee for this live trivia  `
        );
      }
      // eslint-disable-next-line
      { trivia.isFreeLiveTrivia === false && trivia.entryFreePaid === true &&
          navigate('/live-trivia-instructions', {state: {...trivia}})
      }
      // eslint-disable-next-line
      {
        trivia.isFreeLiveTrivia === true &&
          navigate('/live-trivia-instructions', {state: {...trivia}})
      }
    }
  }


  // useEffect(() => {
  //   // Change the state every second or the time given by User.
  //   const interval = setInterval(() => {
  //     setShowText((showText) => !showText);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);


  if (!trivia) {
    return null;
  }

  return (
    <div className='trivia-main-container'
      style={{ backgroundImage: "url(/images/live-trivia-card-background-blue.png)" }}>
      {trivia.playerStatus === "INSUFFICIENTPOINTS" &&
        <BottomSheet open={open} closeBottomSheet={closeBottomSheet}
          BSContent={<LiveTriviaEntryFailed onClick={closeBottomSheet}
          pointsRequired={trivia.pointsRequired}
          userPoints={user.todaysPoints}
          />}
        />
      }
      {trivia.entryFee > user.walletBalance &&
        <BottomSheet open={open} closeBottomSheet={closeBottomSheet}
          BSContent={<LowWallet close={closeBottomSheet}
          />}
        />
      }
      <div className='trivia-container'>
        <div className='trivia-top'>
          <div className='trivia-left'>
            <p className='topText'>{trivia.title}</p>
            <p className='triviaTitle'>{trivia.prizeDisplayText}</p>
            {trivia.status === "EXPIRED" ?
              <p className='triviaTime'>{trivia.startAt}</p> :
              <p className='triviaTime'>{trivia.startDateDisplayText}</p>

            }
          </div>
          <div className='trivia-right'>
            <div className='trivia-required-container'>
              {trivia.isFreeLiveTrivia === false && trivia.entryFee !== 0 &&
                <>
                  <p className='trivia-required-text'>Entry Fee</p>
                  <p className='trivia-required-text'>&#8358;{formatCurrency(trivia.entryFee)}</p>
                </>
              }
              {trivia.pointsRequired !== 0 &&
                <>
                  <p className='trivia-required-text'>{trivia.pointsRequired} pts</p>
                  <p className='trivia-required-text'>Required</p>
                </>
              }
              {trivia.pointsRequired === 0 && trivia.entryFee === 0 &&
                <p className='trivia-required-text'>FREE</p>
              }
            </div>
          </div>
        </div>
        <div className='trivia-bottom'>
          <div>
            <div className='timer'>
              <TriviaStatus trivia={trivia} />
            </div>
            <img src='/images/yellow-line-bottom.png' alt='bottom line' className='yellowImg'/>
          </div>
          <TriviaAction trivia={trivia} action={triviaActionButtonClicked} />
          {trivia.isFreeLiveTrivia === false && trivia.status === 'WAITING' &&
            <>
              {trivia.entryFreePaid === true &&
                <div className='eligible-button'>
                  <p className='eligible-text'>Paid</p>
                  <BiCheckCircle />
                </div>
              }
              {trivia.status === "WAITING" && trivia.entryFreePaid === false &&
                <button className='ineligible-button' onClick={TriviaEntryFeePaymentConfirmation}>
                  {loading ?
                    <Spinner size={10} color="#4F4949" /> :
                    <p className='ineligible-text'>Pay Now</p>
                  }
                </button>
              }
            </>
          }
        </div>
      </div>
      <Dialogue open={openAlert} handleClose={closeAlert} dialogueMessage={alertMessage} />
      <DoubleDialog open={openPaymentAlert} handleClose={closePaymentAlert} dialogueMessage={alertMessage} onClick={payForLiveTrivia} />
      <ButtonDialog open={openPayment} handleClose={closePayment} dialogueMessage={alertMessage} onClick={payForOngoingLiveTrivia} />
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
  const style = { color: '#FFFF', fontSize: "0.8rem" }



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

  }, [trivia, dispatch])

  return (
    <>
      <BiAlarm style={style} />
      <p className='timerText'>Starts in {triviaTimer}</p>
    </>
  )
}

const TriviaAction = ({ trivia, action }) => {

  let { actionDisplayText } = trivia;

  if (actionDisplayText === "") {
    return null;
  }

  return (
    <button className='triviaButton' onClick={action}>
      <p className='triviaButtonText'>{actionDisplayText}</p>
      <IoChevronForwardOutline size={22} color='#4F4949' />
 
    </button>
  )
}

export default LiveTriviaCard;