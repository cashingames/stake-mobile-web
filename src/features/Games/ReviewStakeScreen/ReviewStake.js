import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import StakeAmount from '../GameStaking/StakeAmount'
import StakingPredictionsTable from '../GameStaking/StakingPredictionsTable'
import './ReviewStake.scss'

function ReviewStake() {
    const navigate = useNavigate()

    const gameStakes = useSelector(state => state.game.previousStakeOdds);
    const amountStaked = useSelector(state => state.game.amountStaked);
    const correctCount = useSelector(state => state.game.correctCount);




    const onStakeChange = () => {
    
    }
    const proceed = () => {
        
    }


    const navigateHandler = () => {
        navigate(-1)
    }

    return (
        <>
            <ScreenHeader title='Review Stake' onClick={navigateHandler} styleProp='review-header' />
            <div className="reviewStaking-container">
                <StakeAmount onSubmit={proceed} onChange={onStakeChange} amount={amountStaked} readOnly={true} disabled={true} />
                <StakingPredictionsTable stake={amountStaked} correctCount={correctCount} />
            </div>
        </>
    )
}

export default ReviewStake