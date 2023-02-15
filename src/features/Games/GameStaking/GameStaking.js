import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import StakeAmount from "./StakeAmount";
import StakingPredictionsTable from "./StakingPredictionsTable";
import { setAmountStaked, startGame, setStartingGame } from "../GameSlice";

import './GameStaking.scss'


const GameStaking = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const maximumExhibitionStakeAmount = useSelector(state => Number.parseFloat(state.common.maximumExhibitionStakeAmount ?? 0));
    const [amount, setAmount] = useState(maximumExhibitionStakeAmount);

    const [stake, setStake] = useState(maximumExhibitionStakeAmount);

    const backHandler = () => {
        navigate(-1);
    }

    const onStakeChange = (amount) => {
        setStake(amount);
    }

    const proceed = (amount) => {
        dispatch(setAmountStaked(amount))
        dispatch(setStartingGame(true))
        dispatch(startGame())
        navigate('/games/staking/loading')
    }

    return (
        <>
            <ScreenHeader title='Stake Cash' styleProp='staking' onClick={backHandler} />
            <div className="staking-container">
                <StakeAmount onSubmit={proceed} onChange={onStakeChange} amount={amount} setAmount={setAmount} readOnly={false} disabled={false} />
                <StakingPredictionsTable stake={stake} />
            </div>
        </>
    )
}



export default GameStaking;