import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import StakeAmount from "./StakeAmount";
// import StakingPredictionsTable from "./StakingPredictionsTable";
import { getGameStakes, setAmountStaked, startGame } from "../GameSlice";
import Dialogue from '../../../components/Dialogue/Dialogue'


import './GameStaking.scss'
import { unwrapResult } from "@reduxjs/toolkit";
import { getUser } from "../../Auth/AuthSlice";
import AnonymousRouteHeader from "../../../components/AnonymousRouteHeader/AnonymousRouteHeader";
import { IoCheckmarkCircleOutline, IoTimeOutline } from "react-icons/io5";


const GameStaking = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [amount, setAmount] = useState('');
    const gameType = useSelector(state => state.game.gameType);
    const gameCategoryId = useSelector(state => state.game.gameCategory.id);
    const gameTypeId = useSelector(state => state.game.gameType.id);
    const gameMode = useSelector(state => state.game.gameMode);
    const [openDialogue, setOpenDialogue] = useState(false);
    const [alertMessage, setAlert] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.auth.user);


    useEffect(() => {

        //if no gameType name, it means the user navigated to this page directly
        if (gameType.name === undefined)
            navigate('/dashboard');
    }, [gameType.name, navigate]);

    const closeAlert = () => {
        setOpenDialogue(false)
    }


    const proceed = (amount) => {
        dispatch(setAmountStaked(amount))
        // dispatch(setStartingGame(true))
        onStartGame()
        // navigate('/games/staking/loading')


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
                navigate('/games/staking/play/1')
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

    useEffect(() => {
        dispatch(getGameStakes())
        dispatch(getUser())
    }, [dispatch])

    return (
        <div className="staking-container">
            <AnonymousRouteHeader title='Game Staking' styleProp='staking' isClose={true} />

            <StakeAmount onSubmit={proceed} amount={amount} setAmount={setAmount}
                readOnly={false} disabled={loading ? true : false} />
                   {user.hasBonus === true &&
                <p className='note'>Note that the predictions table below does not apply on bonus stakes</p>}
            <StakingPredictionsTable amount={amount} />
            <Dialogue open={openDialogue} handleClose={closeAlert} dialogueMessage={alertMessage} />
        </div>
    )
}

const StakingPredictionsTable = ({ amount }) => {
    const gameStakes = useSelector(state => state.game.gameStakes);
    return (
        <div className="stake-container">
            <p className="stake-heading">How to win</p>
            <div className="stake-headers">
                <p className="stake-score">OUTCOME</p>
                <p className="stake-head">ODDS</p>
                <p className="stake-pay">PAYOUT</p>
            </div>
            {gameStakes.map((gameStake, i) => <StakingPredictionsRow key={i} gameStake={gameStake} position={i + 1}
                amount={amount} />)}
        </div>
    )
}

const StakingPredictionsRow = ({ gameStake, amount }) => {
    return (
        <div className="stake-sub">
            <div className="stake-score-container">
                <IoCheckmarkCircleOutline size={15} />
                <span className="stake-score-digit">{gameStake.score}</span>
            </div>
            <div className="stake-number">
                <IoTimeOutline size={15} color='#FF932F' />
                <span className="stake-odd-digit">x{gameStake.odd}</span>
            </div>
            <p className="stake-winnings">NGN {amount * gameStake.odd}</p>
        </div>
    )
}



export default GameStaking;