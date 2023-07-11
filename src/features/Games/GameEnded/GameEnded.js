import React, { useEffect } from 'react'
import './GameEnded.scss'
import UserName from '../../../components/UserName/UserName';
import Winnings from '../../../components/Winnings/Winnings';
import FinalScore from '../../../components/FinalScore/FinalScore';
import GameButton from '../../../components/GameButton/GameButton';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../Auth/AuthSlice';
import firebaseConfig from '../../../firebaseConfig';
import { logEvent } from 'firebase/analytics';

const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function GameEnded() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const analytics = firebaseConfig();
  const user = useSelector(state => state.auth.user);
  const pointsGained = useSelector(state => state.game.pointsGained);
  const amountWon = useSelector(state => state.game.amountWon);
  const isGameEnded = useSelector(state => state.game.isEnded);
  const correctCount = useSelector(state => state.game.correctCount);
  const totalCount = useSelector(state => state.game.totalCount);
  const wrongCount = useSelector(state => state.game.wrongCount);
  const withStaking = useSelector(state => state.game.withStaking);
  const cashMode = useSelector(state => state.game.cashMode);
  const walletSource = useSelector(state => state.game.walletSource);




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
    <div className='gameEndedCase' style={{ backgroundImage: "url(/images/success-background.png)" }}>
      <div className='game-tag-container'>
        <img
          src={user.avatar ? `${backendUrl}/${user.avatar}` : "/images/user-icon.png"}
          alt='user'
          className='userAvater'
          onError={(e) => e.target.style.display = 'none'} />
      </div>
      <UserName userName={user.firstName} />
      {withStaking && cashMode &&
        <Winnings amountWon={amountWon} onPress={reviewStaking} walletSource={walletSource} />
      }
      <FinalScore
        pointsGained={pointsGained}
        correctCount={correctCount} wrongCount={wrongCount} totalCount={totalCount}
      />
      <GameButton goHome={goHome} playAgain={playAgain} />
      {/* <BoostPopUp setShowModal={setShowModal} showModal={showModal} /> */}
    </div>
  )
}

export default GameEnded