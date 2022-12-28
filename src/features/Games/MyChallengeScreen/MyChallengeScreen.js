import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Trophy from '../../../assets/trophy.json'
import Loser from '../../../assets/loser.json'
import Challenge from '../../../assets/challenge.json'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import './MyChallengeScreen.scss'
import { Player } from '@lottiefiles/react-lottie-player'

function MyChallengeScreen() {
    const [closed] = useState(true)
    const [state] = useState('LOST')
    const [noChallenge] = useState(false)

    const navigate = useNavigate()
    const handleNavigation = () => {
        navigate('/dashboard')
    }
    return (
    <>
        <ScreenHeader title='My Challenges' styleProp='mscHeader' onClick={handleNavigation}/>
        <div className='mscContainer'>
            <div className='mscCase'>
                <div className='categoryCase'>
                    <p className='challengeCategory'>French League</p>
                    {closed ?
                    <>
                    {state==='WON' && 
                    <div className='winnerCategory'>
                        <p className='winnerText'>WON</p>
                        <Player src={Trophy}
                                alt='Trophy'
                                autoplay
                                loop
                                className='player'
                                style={
                                    { height: '32px' }
                                } />
                    </div>
                        }
                    {state==='DRAW' && 
                    <div className='winnerCategory'>
                        <p className='winnerText'>DRAW</p>
                        <Player src={Trophy}
                                alt='Trophy'
                                autoplay
                                loop
                                className='player'
                                style={
                                    { height: '32px' }
                                } />
                    </div>
                        }
                    {state==='LOST' && 
                    <div className='winnerCategory'>
                        <p className='winnerText'>LOST</p>
                        <Player src={Loser}
                                alt='loser'
                                autoplay
                                loop
                                className='player'
                                style={
                                    { height: '32px' }
                                } />
                    </div>
                        }
                        </>
                        :
                        <Player src={Challenge}
                                alt='challenge'
                                autoplay
                                loop
                                className='player'
                                style={
                                    { height: '32px' }
                                } />
                    }
                </div>
                <p className='mscDate'>2022-11-06 21:42:27</p>
                <p className='mscDate'>STATUS: CLOSED</p>
                <div className='competitorsContainer'>
                    <p className='challenger'>Johndoe9</p>
                    <p className='versus'>vs</p>
                    <p className='opponent'>Casasupa</p>
                </div>
                <button className='mscBtn'>Scores</button>
            </div>
        </div>
        {noChallenge && <NoChallenges />}
    </>
  )
}

export default MyChallengeScreen


const NoChallenges = () => {
    return(
        <div className='ncContainer'>
            <Player src={Challenge}
                                alt='challenge'
                                autoplay
                                loop
                                className='player'
                                style={
                                    { height: '100px' }
                                } />
            <p className='ncText'>You dont have any challenge yet. Challenge a friend to play exciting and fun games</p>
        </div>
    )
}