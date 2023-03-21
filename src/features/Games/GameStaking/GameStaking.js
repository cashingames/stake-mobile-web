import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import StakeAmount from "./StakeAmount";
import StakingPredictionsTable from "./StakingPredictionsTable";
import { setAmountStaked, setStartingGame, startGame } from "../GameSlice";
import Dialogue from '../../../components/Dialogue/Dialogue'


import './GameStaking.scss'
import { unwrapResult } from "@reduxjs/toolkit";


const GameStaking = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const maximumExhibitionStakeAmount = useSelector(state => Number.parseFloat(state.common.maximumExhibitionStakeAmount ?? 0));
    const [amount, setAmount] = useState(maximumExhibitionStakeAmount);
    const [stake, setStake] = useState(maximumExhibitionStakeAmount);
    const gameType = useSelector(state => state.game.gameType);
    const gameCategoryId = useSelector(state => state.game.gameCategory.id);
    const gameTypeId = useSelector(state => state.game.gameType.id);
    const gameMode = useSelector(state => state.game.gameMode);
    const [openDialogue, setOpenDialogue] = useState(false);
    const [alertMessage, setAlert] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        //if no gameType name, it means the user navigated to this page directly
        if (gameType.name === undefined)
            navigate('/dashboard');
    }, [gameType.name, navigate]);

    const backHandler = () => {
        navigate('/select-category');
    }

    const onStakeChange = (amount) => {
        setStake(amount);
    }
    const closeAlert = () => {
        setOpenDialogue(false)
      }

    const proceed = (amount) => {
        dispatch(setAmountStaked(amount))
        dispatch(setStartingGame(true))
        onStartGame()
    }

    const onStartGame = () => {
        setLoading(true);
        dispatch(startGame({
            category: gameCategoryId,
            type: gameTypeId,
            mode: gameMode.id,
            staking_amount: amount
        })).then(unwrapResult)
        .then(result => {
            setLoading(false);
            navigate('/games/staking/loading')
        })
        .catch((err) => {
            processStartGameError(err)
        }).finally(() => {
            setLoading(false);
        });

    }


    const processStartGameError = async (err) => {
        const errors = err.message;
        setOpenDialogue(true)
        setAlert(errors);

        const firstError = Array.isArray(errors) ? Object.values(errors, {})[0][0] : errors;
        setOpenDialogue(true)
        setAlert(firstError);
    }

    return (
        <>
            <ScreenHeader title='Stake Cash' styleProp='staking' onClick={backHandler} />
            <div className="staking-container">
                <StakeAmount onSubmit={proceed} onChange={onStakeChange} amount={amount} setAmount={setAmount} 
                readOnly={false} disabled={loading ? true : false} setOpenDialogue={setOpenDialogue} setAlert={setAlert} />
                <StakingPredictionsTable stake={stake} usePreviousOdds={false} />
                <Dialogue open={openDialogue} handleClose={closeAlert} dialogueMessage={alertMessage} />
            </div>
        </>
    )
}



export default GameStaking;