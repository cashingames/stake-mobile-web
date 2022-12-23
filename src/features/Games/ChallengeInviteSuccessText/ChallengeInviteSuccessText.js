import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import Friends from '../../../assets/friends.json'
import './ChallengeInviteSuccessText.scss'
import { useNavigate } from 'react-router-dom'

function ChallengeInviteSuccessText() {
    const navigate = useNavigate()

    const navigateHandler = () => {
        navigate('/dashboard')
    }
    return (
        <div className='cisContainer'>
            <Player src={Friends}
                alt='Friends'
                autoplay
                loop
                className='player'
                style={
                    {
                        height: '150px',
                        width: '150px'
                    }
                } />
            <p className='congratsText'>Congrats! Challenge sent</p>
            <p className='innerText'>Wait for an In-App notification and email when opponent accepts challenge</p>
            <p  className='innerText'>Then you can start playing.</p> 
            <button className='cisBtn' onClick={navigateHandler}>Return to Home</button>       
            </div>
    )
}

export default ChallengeInviteSuccessText