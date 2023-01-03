import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AnimatedClock from '../../../components/AnimatedClock/AnimatedClock'
import FinalScore from '../../../components/FinalScore/FinalScore'
import UserName from '../../../components/UserName/UserName'
import './ChallengeEndGameScreen.scss'

function ChallengeEndGameScreen() {
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user);
  const pointsGained = useSelector(state => state.game.pointsGained);

  const onHomeButtonClick = () => {
    navigate('/dashboard')
  }

  //disable browser back button
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  })

  return (
    <div className='gameEndedCase'>
      <AnimatedClock />
      <UserName userName={user.firstName} />
      <UserResult pointsGained={pointsGained} />
      <Rank />
      <FinalScore pointsGained={pointsGained} />
      <EndGameButton onClick={onHomeButtonClick} />
    </div>
  )
}

export default ChallengeEndGameScreen

function UserResult({ pointsGained }) {
  return (
    <div className='infoCase'>
      <p className='resultInfoText'>you scored {pointsGained}, go to the challenge leaderboard
        to view the status and result of this challenge</p>
    </div>
  )
}

function Rank() {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate('/challenges')} className='leaderboardLink'>
      <div className='seeRank'>
        <img src='/images/leaderboard.png' alt='leaderboard' />
        <p className='rankText'>Click to see status and result of this challenge</p>
      </div>
    </div>
  )
}

function EndGameButton({ onClick }) {
  return (
    <button className='homeBtns' onClick={onClick}>
      <p className='gameText'>
        Return to Home
      </p>
    </button>
  )
} 