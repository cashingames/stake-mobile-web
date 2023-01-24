import React, { useEffect, useState } from 'react'
import './GameEnded.scss'
import AnimatedClock from '../../../components/AnimatedClock/AnimatedClock';
import UserName from '../../../components/UserName/UserName';
import UserResultInfo from '../../../components/UserResultInfo/UserResultInfo'
import Winnings from '../../../components/Winnings/Winnings'
import SeeRank from '../../../components/SeeRank/SeeRank'
import FinalScore from '../../../components/FinalScore/FinalScore'
import GameButton from '../../../components/GameButton/GameButton'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../Auth/AuthSlice'
import BoostPopUp from '../../../components/BoostPopUp/BoostPopUp'

function GameEnded() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const pointsGained = useSelector(state => state.game.pointsGained);
  const amountWon = useSelector(state => state.game.amountWon);
  const withStaking = useSelector(state => state.game.withStaking);
  const isGameEnded = useSelector(state => state.game.isEnded);
  const minimumBoostScore = useSelector(state => state.common.minimumBoostScore)


  const [showModal, setShowModal] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [showText, setShowText] = useState(true);


  const goHome = () => {
    navigate('/dashboard', {
      state:
        { showStakingAdvert: !withStaking }
    })
  }
  const viewLeaderboard = () => {
    navigate('/leaderboards')
  }

  const playAgain = () => {
    navigate('/game-instructions')
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
  );
  const reviewStaking = () => {
    navigate("/review-stake")
  }

  useEffect(() => {
    if (pointsGained <= minimumBoostScore) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  }, [pointsGained, minimumBoostScore])



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
      <BoostPopUp setShowModal={setShowModal} showModal={showModal} />
    </div>
  )
}

export default GameEnded