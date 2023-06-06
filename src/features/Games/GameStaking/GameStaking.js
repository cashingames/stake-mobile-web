import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import StakeAmount from "./StakeAmount";
import StakingPredictionsTable from "./StakingPredictionsTable";
import { setAmountStaked, setStartingGame, startGame } from "../GameSlice";
import Dialogue from '../../../components/Dialogue/Dialogue'


import './GameStaking.scss'
import { unwrapResult } from "@reduxjs/toolkit";
import BottomSheet from "../../../components/BottomSheet/BottomSheet";
import LowWallet from "../../../components/LowWallet/LowWallet";
import { getUser } from "../../Auth/AuthSlice";
import AnonymousRouteHeader from "../../../components/AnonymousRouteHeader/AnonymousRouteHeader";


const GameStaking = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [amount, setAmount] = useState('');
    const [stake, setStake] = useState(amount);
    const gameType = useSelector(state => state.game.gameType);
    const gameCategoryId = useSelector(state => state.game.gameCategory.id);
    const gameTypeId = useSelector(state => state.game.gameType.id);
    const gameMode = useSelector(state => state.game.gameMode);
    const [openDialogue, setOpenDialogue] = useState(false);
    const [alertMessage, setAlert] = useState('');
    const [loading, setLoading] = useState(false);
    const [showLowWallet, setShowLowWallet] = useState(false);



    useEffect(() => {

        //if no gameType name, it means the user navigated to this page directly
        if (gameType.name === undefined)
            navigate('/dashboard');
    }, [gameType.name, navigate]);

    // const backHandler = () => {
    //     navigate('/select-category');
    // }

    const onStakeChange = (amount) => {
        setStake(amount);
    }
    const closeAlert = () => {
        setOpenDialogue(false)
    }
    const closeBS = () => {
        dispatch(getUser())
        setShowLowWallet(false)
    }



    const proceed = (amount) => {
        dispatch(setAmountStaked(amount))
        dispatch(setStartingGame(true))
        onStartGame()
        navigate('/games/staking/loading')

    }

    const onStartGame = () => {
        setLoading(true);
        dispatch(startGame(
            {
                category: gameCategoryId,
                type: gameTypeId,
                mode: gameMode.id,
                staking_amount: amount
            }
        )).then(unwrapResult)
            .then(result => {
                setLoading(false);
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
        <div className="staking-container">
            <AnonymousRouteHeader title='Game Staking' styleProp='staking' isClose={true} />

            <StakeAmount onSubmit={proceed} onChange={onStakeChange} amount={amount} setAmount={setAmount}
                readOnly={false} disabled={loading ? true : false} setOpenDialogue={setOpenDialogue} setAlert={setAlert} setShowLowWallet={setShowLowWallet} />
            <StakingPredictionsTable stake={amount} usePreviousOdds={false} />
            <BottomSheet open={showLowWallet} closeBottomSheet={closeBS} BSContent={<LowWallet onClose={closeBS} />} />
            <Dialogue open={openDialogue} handleClose={closeAlert} dialogueMessage={alertMessage} />
        </div>
    )
}



export default GameStaking;