import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import TransactionSuccess from '../../../assets/transaction-successful.json'
import './GamePlanPurchaseSuccessful.scss'

function GamePlanPurchaseSuccess() {

    const navigate = useNavigate()

    const home = () => {
        navigate('/dashboard')
    }

    const store = () => {
        navigate('/store')
    }
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
            <button className='actionBtn' onClick={home}>Play a Game</button>
            <button className='actionBtn' onClick={store}>Store</button>
            </div>
        </div>
  )
}

export default GamePlanPurchaseSuccess