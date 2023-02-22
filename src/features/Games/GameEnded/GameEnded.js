import React, { useEffect } from 'react'
import './GameEnded.scss'
// import AnimatedClock from '../../../components/AnimatedClock/AnimatedClock';
import UserName from '../../../components/UserName/UserName';
// import Winnings from '../../../components/Winnings/Winnings';
import FinalScore from '../../../components/FinalScore/FinalScore';
import GameButton from '../../../components/GameButton/GameButton';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../Auth/AuthSlice';
import firebaseConfig from '../../../firebaseConfig';
import { logEvent } from 'firebase/analytics';

function GameEnded() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const analytics = firebaseConfig();
  const user = useSelector(state => state.auth.user);
  const pointsGained = useSelector(state => state.game.pointsGained);
  const amountWon = useSelector(state => state.game.amountWon);
  const isGameEnded = useSelector(state => state.game.isEnded);
  const amountStaked = useSelector(state => state.game.amountStaked);
  const correctCount = useSelector(state => state.game.correctCount);
  const wrongCount = useSelector(state => state.game.wrongCount);



  const goHome = () => {
    logEvent(analytics, 'staking_exhibition_go_home_clicked');
    navigate('/dashboard');
  }

  const playAgain = () => {
    logEvent(analytics, 'staking_exhibition_play_again_clicked');
    navigate('/select-category')
  }

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])

  //disable browser back button
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  })

  // eslint-disable-next-line
  useEffect(
    React.useCallback(() => {
      const onBackPress = () => isGameEnded
      window.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        window.removeEventListener('hardwareBackPress', onBackPress);
    }, [isGameEnded])
  )

  const reviewStaking = () => {
    navigate(`/games/staking/1/review`)
  }

  return (
    <div className='gameEndedCase'>
      {/* <AnimatedClock /> */}
      <div className='game-tag-container'>
      <img src='/images/game-tag.png' alt='tag' className='game-tag' />
      </div>
      <UserName userName={user.firstName} />
      {/* <Winnings amountWon={amountWon} onPress={reviewStaking} /> */}
      <FinalScore
        pointsGained={pointsGained}
        amountWon={amountWon}
        amountStaked={amountStaked}
        correctCount={correctCount}
        wrongCount={wrongCount}
        onPress={reviewStaking}
      />
      <GameButton goHome={goHome} playAgain={playAgain} />
      {/* <BoostPopUp setShowModal={setShowModal} showModal={showModal} /> */}
    </div>
  )
}

export default GameEnded