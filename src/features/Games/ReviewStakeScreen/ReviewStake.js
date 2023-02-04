import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import StakingPredictionTable from '../../../components/StakingPredictionTable/StakingPredictionTable'
import { formatCurrency } from '../../../utils/stringUtl'
import './ReviewStake.scss'

function ReviewStake() {
    const navigate = useNavigate()

    const walletBalance = useSelector(state => state.auth.user.walletBalance)
    const gameStakes = useSelector(state => state.game.previousStakeOdds);
    const amountStaked = useSelector(state => state.game.amountStaked)
    const correctCount = useSelector(state => state.game.correctCount)


    const navigateHandler = () => {
        navigate(-1)
    }

    return (
        <>
            <ScreenHeader title='Review Stake' onClick={navigateHandler} styleProp='review-header' />
            <div className="reviewStaking-container">
                <div className="amountContainer">
                    <div className="walletContainer">
                        <p className="wallet">Wallet Balance : &#8358;{formatCurrency(walletBalance)}</p>
                    </div>
                    <div className="inputContainer">
                        <input
                            placeholder="Enter Stake Amount"
                            type='number'
                            value={amountStaked}
                            className='stakeInput'
                            required
                            readOnly
                        />

                    </div>
                    <div className="buttonContainer">
                        <button className='start-button' disabled>
                            <p className="start-text">Stake Amount</p>
                        </button>
                    </div>
                </div>
                <div className="predictionContainer">
                    <p className="predictionHeading">Predictions Table</p>
                    <div className="predictionHeaders">
                        <p className="stakeWinning">WINNINGS</p>
                        <p className="stakeWinning">SCORE</p>
                        <p className="stakeWinning">ODDS</p>
                    </div>
                </div>

                {gameStakes.map((gameStake, i) => <StakingPredictionTable key={i} gameStake={gameStake} position={i + 1}
                    // eslint-disable-next-line
                    amount={amountStaked} styleProp={correctCount == (gameStake.score) ? 'amountWon' : {}} />)}
            </div>
        </>
    )
}

export default ReviewStake