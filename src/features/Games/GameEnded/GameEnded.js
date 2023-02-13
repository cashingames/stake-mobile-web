import React, { useEffect } from 'react'
import './GameEnded.scss'
import AnimatedClock from '../../../components/AnimatedClock/AnimatedClock';
import UserName from '../../../components/UserName/UserName';
import UserResultInfo from '../../../components/UserResultInfo/UserResultInfo'
import Winnings from '../../../components/Winnings/Winnings';
import SeeRank from '../../../components/SeeRank/SeeRank';
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
  // const minimumBoostScore = useSelector(state => state.common.minimumBoostScore)
  const activePlan = useSelector(state => state.auth.user.activePlans);
  const withStaking = useSelector(state => state.game.withStaking);
  const isGameEnded = useSelector(state => state.game.isEnded);
  const bonusGame = activePlan?.find((item) => item.name === 'Bonus Games')
  const newUser = useSelector(state => state.auth.user.joinedOn);
  const newUserDate = newUser.slice(0, 10);
  let formattedDate = new Date().toISOString().split('T')[0];

  const goHome = () => {
    if (bonusGame && bonusGame.game_count === 2) {
      logEvent(analytics, 'two_free_games_left', {
        'id': user.username,
        'phone_number': user.phoneNumber,
        'email': user.email
      });
    }
      if (formattedDate === newUserDate && bonusGame && bonusGame.game_count === 0) {
        logEvent(analytics, 'new_user_FG_exhausted', {
          'id': user.username,
          'phone_number': user.phoneNumber,
          'email': user.email
        });
      } else {
        logEvent(analytics, 'free_games_exhausted', {
          'id': user.username,
          'phone_number': user.phoneNumber,
          'email': user.email
        });
      };
    navigate('/dashboard', {
      state:
        { showStakingAdvert: !withStaking }
    })
  }
  const viewLeaderboard = () => {
    navigate('/leaderboards')
  }

  const playAgain = () => {
    logEvent(analytics, 'exhibition_play_again_clicked', {
      'id': user.username,
      'phone_number': user.phoneNumber,
      'email': user.email
    });
    if (bonusGame && bonusGame.game_count === 2) {
      logEvent(analytics, 'two_free_games_left', {
        'id': user.username,
        'phone_number': user.phoneNumber,
        'email': user.email
      });
    };
      if (formattedDate === newUserDate && bonusGame && bonusGame.game_count === 0) {
        logEvent(analytics, 'new_user_FG_exhausted', {
          'id': user.username,
          'phone_number': user.phoneNumber,
          'email': user.email
        });
      } else {
        logEvent(analytics, 'free_games_exhausted', {
          'id': user.username,
          'phone_number': user.phoneNumber,
          'email': user.email
        });
      }
    navigate('/select-category')
  }

  useEffect(() => {
    dispatch(getUser())
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

  // useEffect(() => {
  //   if (pointsGained <= minimumBoostScore) {
  //     setShowModal(true)
  //   } else {
  //     setShowModal(false)
  //   }
  // }, [pointsGained, minimumBoostScore])

  const reviewStaking = () => {
    navigate(`/games/staking/1/review`)
  }

  return (
    <div className='gameEndedCase'>
      <AnimatedClock />
      <UserName userName={user.firstName} />
      <UserResultInfo pointsGained={pointsGained} />
      {withStaking &&
        <Winnings amountWon={amountWon} onPress={reviewStaking} />
      }
      <SeeRank onClick={viewLeaderboard} />
      <FinalScore pointsGained={pointsGained} />
      <GameButton goHome={goHome} playAgain={playAgain} />
      {/* <BoostPopUp setShowModal={setShowModal} showModal={showModal} /> */}
    </div>
  )
}

export default GameEnded