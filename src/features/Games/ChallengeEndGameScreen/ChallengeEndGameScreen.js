import React, { useState } from 'react'
import AnimatedClock from '../../../components/AnimatedClock/AnimatedClock'
import FinalScore from '../../../components/FinalScore/FinalScore'
import UserName from '../../../components/UserName/UserName'
import Winnings from '../../../components/Winnings/Winnings'
import './ChallengeEndGameScreen.scss'

function ChallengeEndGameScreen() {
    const [withStaking] = useState(false)
  return (
         <div className='gameEndedCase'>
      <AnimatedClock />
      <UserName userName='john doe' />
      <UserResult pointsGained={5} />
      {withStaking &&
        <Winnings amountWon={200} />
      }
      <Rank />
      <FinalScore pointsGained={5} />
      <EndGameButton />
    </div>
  )
}

export default ChallengeEndGameScreen
 
function UserResult({pointsGained}) {
  return (
    <div className='infoCase'>
        <p className='resultInfoText'>you scored {pointsGained}, go to the challenge leaderboard
                to view the status and result of this challenge</p>
    </div>
  )
}

function Rank({onClick}) {
  return(
      <div onClick={onClick} className='leaderboardLink'>
          <div className='seeRank'>
              <img src='/images/leaderboard.png' alt='leaderboard' />
              <p className='rankText'>Click to see status and result of this challenge</p>
          </div>
      </div>
  )
}

function EndGameButton({onClick}) {
  return(
    <button className='homeBtns'>
        <p className='gameText'>
            Return to Home
        </p>
    </button>
  )
} 