import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import Leaderboard from '../../../assets/leaderboard.json'
import './LiveTriviaLeaderboard.scss'
import TriviaTopLeader from '../../../components/TriviaTopLeader/TriviaTopLeader'
import TriviaParticipant from '../../../components/TriviaParticipant/TriviaParticipant'
import { useState } from 'react'

function LiveTriviaLeaderboard() {
   
  return (
    <>
        <ScreenHeader title='Leaderboard' styleProp='liveLeaderboard' />
        <div className='triviaLeaderBoardCase'>
            <ResultContainer />
            <TriviaParticipants />
        </div>
    </>
  )
}

export default LiveTriviaLeaderboard

const ResultContainer = () => {
    return(
        <div className='resultCase'>
        <Player src={Leaderboard}
            alt='leaderboard'
            autoplay
            loop
            className='player'
            style={
                { height: '170px' }
            } />
        </div>
    )
}

const TriviaParticipants = () => {
    const [state, setState] = useState(true)
    return(
        <>
        {state ?
        <div className='partcipants'>
            <TriviaTopLeader position={1} username='John' duration={11} point={8.5}/>
            <TriviaTopLeader position={2} username='Zee' duration={10} point={6.5}/>
            <TriviaParticipant position={1} username='John' duration={11} point={8.5} />
        </div>
        :
        <p className='noData'>No Data</p>
        }
        </>
    )
}


