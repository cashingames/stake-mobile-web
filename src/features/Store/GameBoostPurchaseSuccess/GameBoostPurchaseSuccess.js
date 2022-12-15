import { Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TransactionSuccess from '../../../assets/transaction-successful.json'
import './GameBoostPurchaseSuccess.scss'

function GameBoostPurchaseSuccess() {
    const navigate = useNavigate()

    const home = () => {
        navigate('/dashboard')
    }

    const store = () => {
        navigate('/store')
    }

      //disable browser back button
      useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    return (
        <div className='mainContainer'>
            <div className='boostPurchaseContainer'>
                <div className='boostImg'>
                <Player src={TransactionSuccess}
                    alt='Transaction Success'
                    autoplay
                    loop
                    className='player'
                    style={
                        { height: '100px' }
                    } />
                    </div>
                    <p className='paymentHeader'>Payment Successful</p>
                    <p className='message'>You successfully purchased a boost to continue playing games, climb up the leaderboard and win great prizes</p>
            </div>
            <div className='congratsBtn'>
                <button className='actionBtn' onClick={home}>Play a Game</button>
                <button className='actionBtn' onClick={store}>Store</button>
            </div>
        </div>
  )
}

export default GameBoostPurchaseSuccess