import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import StakeAmount from '../GameStaking/StakeAmount'
import StakingPredictionsTable from '../GameStaking/StakingPredictionsTable'
import './ReviewStake.scss'

function ReviewStake() {
    const navigate = useNavigate()

    const amountStaked = useSelector(state => state.game.amountStaked);

    const navigateHandler = () => {
        navigate(-1)
    }

    return (
        <>
            <ScreenHeader title='Review Stake' onClick={navigateHandler} styleProp='review-header' />
            <div className="reviewStaking-container">
                <StakeAmount amount={amountStaked} readOnly={true} disabled={true} />
                <StakingPredictionsTable stake={amountStaked} usePreviousOdds={true} />
            </div>
        </>
    )
}

export default ReviewStake