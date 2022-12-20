import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from "react-activity";
import { useNavigate } from 'react-router-dom'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import LowWallet from '../../../components/LowWallet/LowWallet'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import StakingPredictionTable from '../../../components/StakingPredictionTable/StakingPredictionTable'
import { formatCurrency } from '../../../utils/stringUtl'
import { getUser } from '../../Auth/AuthSlice'
import {  setIsPlayingTrivia, startGame } from '../../Games/GameSlice';
import UserAvailableBoosts from '../../../components/UserAvailableBoosts/UserAvailableBoosts';
import { unwrapResult } from '@reduxjs/toolkit';
import { logActionToServer } from '../../CommonSlice';

function LiveTriviaStaking() {
    const user = useSelector((state) => state.auth.user);
    const gameStakes = useSelector(state => state.game.gameStakes);
    console.log(gameStakes)
    const maximumStakeAmount = useSelector(state => state.common.maximumStakeAmount);
    const minimumStakeAmount = useSelector(state => state.common.minimumStakeAmount)
    const [amount, setAmount] = useState(200);
    const [amountErr, setAmountError] = useState(false);
    const [loading] = useState(false);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const navigateHandler = () => {
        navigate('/')
    }

    const closeBottomSheet = async () => {
        setOpen(false)
    }

    const close = () => {
        dispatch(getUser())
        closeBottomSheet()
    }

    const onChangeStakeAmount = (e) => {
        const amount = e.currentTarget.value;

        if (Number.parseFloat(amount) < Number.parseFloat(minimumStakeAmount)) {
            setAmountError(true)
        }
        else setAmountError(false)

        if (Number.parseFloat(amount) > Number.parseFloat(maximumStakeAmount)) {
            setAmountError(true)
        } else setAmountError(false)
        setAmount(amount)
    }


    // useEffect(() => {
    //     dispatch(getGameStakes())
    //     dispatch(getUser())
    // }, [dispatch])

    return (
        <>
            <ScreenHeader title='Live Trivia Staking' styleProp='staking' onClick={navigateHandler} />
            <div className="staking-container">
                <div className="amountContainer">
                    <div className="walletContainer">
                        <p className="wallet">Wallet Balance : &#8358;{formatCurrency(user.walletBalance)}</p>
                    </div>
                    <div className="inputContainer">
                        <input
                            placeholder="Enter Stake Amount"
                            type='number'
                            value={amount}
                            className='stakeInput'
                            onChange={e => onChangeStakeAmount(e)}
                            required
                        />
                        {amountErr &&
                            <span className='inputError'>*Minimum stake amount is {minimumStakeAmount} naira
                                and Maximum stake amount is {maximumStakeAmount} naira`
                            </span>
                        }
                    </div>
                    <div className="buttonContainer">
                        <button disabled={loading} className='start-button'>
                            <p className="start-text">{loading ? <Spinner
                                color='#ffff'
                                size={10} /> : "Stake Amount"} </p>
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
                    amount={amount} />)}
                {Number.parseFloat(user.walletBalance) < Number.parseFloat(amount) ?
                    <BottomSheet
                        open={open} closeBottomSheet={closeBottomSheet}
                        BSContent={<LowWallet
                            close={close}
                        />}
                    />
                    : <BottomSheet
                        open={open} closeBottomSheet={closeBottomSheet}
                        BSContent={<AvailableBoosts
                            onClose={closeBottomSheet} user={user} amount={amount}
                        />}
                    />}

            </div>
        </>
    )
}

const AvailableBoosts = ({ onClose,
    user, amount
}) => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const boosts = useSelector(state => state.auth.user.boosts);
    const gameCategoryId = useSelector(state => state.game.gameCategory.id);
    const gameTypeId = useSelector(state => state.game.gameType.id);
    const gameModeId = useSelector(state => state.game.gameMode.id);
    const gameMode = useSelector(state => state.game.gameMode);
    const [loading, setLoading] = useState(false)

    const onStartGame = () => {
        setLoading(true);
        dispatch(setIsPlayingTrivia(false))
        dispatch(startGame({
            category: gameCategoryId,
            type: gameTypeId,
            mode: gameModeId,
            staking_amount: amount
        }))
            .then(unwrapResult)
            .then(result => {
                dispatch(logActionToServer({
                    message: "Game session " + result.data.game.token + " questions recieved for " + user.username,
                    data: result.data.questions
                }))
                    .then(unwrapResult)
                    .catch((e) => {
                        // console.log('Failed to log to server');
                    });
                setLoading(false);
                onClose();
                navigate("/game-board")
            })
            .catch((rejectedValueOrSerializedError) => {
                alert(rejectedValueOrSerializedError.message)
                setLoading(false);
            });
    }


    return (
        <UserAvailableBoosts gameMode={gameMode}
            boosts={boosts}
            onStartGame={onStartGame}
            loading={loading}
            onClose={onClose}
        />
    )
}
export default LiveTriviaStaking