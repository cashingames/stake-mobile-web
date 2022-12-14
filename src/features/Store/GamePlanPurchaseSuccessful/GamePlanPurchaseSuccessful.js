import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import { Link } from 'react-router-dom'
import TransactionSuccess from '../../../assets/transaction-successful.json'
import './GamePlanPurchaseSuccessful.scss'

function GamePlanPurchaseSuccess() {
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
                    <p className='message'>You successfully purchased a game plan to continue playing games, climb up the leaderboard and win great prizes</p>
            </div>
            <div className='congratsBtn'>
                <Link to='/' className='actionBtn'>Play a Game</Link>
                <Link to='/store' className='actionBtn'>Store</Link>
            </div>
        </div>
  )
}

export default GamePlanPurchaseSuccess