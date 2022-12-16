import React from 'react'
import { useNavigate } from 'react-router-dom'
import AnimatedClock from '../../../components/AnimatedClock/AnimatedClock'
import Winnings from '../../../components/Winnings/Winnings'
import './TriviaEnded.scss'
function TriviaEnded() {

    const navigate = useNavigate()

    const reviewStaking = () => {
        navigate("/review-stake")
      }
    return (
        <div className='triviaEndedCase'>
            <ResultContainer />
            <Winnings onPress={reviewStaking} amountWon={200}/>
            <TriviaParticipants />
            <TriviaButton />
        </div>
    )
}

export default TriviaEnded


const ResultContainer = () => {
    return (
        <div className='resultCase'>
            <AnimatedClock />
            <p className='resultMessag'>Thanks for completing the live trivia session today.
                View the final leaderboard at the end of the trivia to know your final position and
                stay tuned for upcoming live trivia sessions</p>
        </div>
    )
}

const TriviaParticipants = () => {
 return(
    <TriviaParticipant username='Xin' position={1} points={2}/>
 )
}


const TriviaParticipant = ({ username, position, points }) => {
    return (
        <div className='participant'>
            <div className='positionName'>
                <p className='position'>{position}</p>
                <p className='username'>{username}</p>
            </div>
            <p className='username'>{points}pts</p>
        </div>
    )
}



function TriviaButton() {
    const navigate = useNavigate()
    return (
      <div className='triviaBtnCase'>
          <button className='homeBtn' onClick={() => navigate('/trivia-leaderboard')}>
              <p className='gameText'>
                  Leaderboard
              </p>
          </button>
          <button className='homeBtn' onClick={() => navigate('/dashboard')}>
              <p className='gameText'>
                  Home
              </p>
          </button>
      </div>
    )
  }
  