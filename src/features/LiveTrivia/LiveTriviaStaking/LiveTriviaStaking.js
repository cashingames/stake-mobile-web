import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from "react-activity";
import { useLocation, useNavigate } from 'react-router-dom'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import LowWallet from '../../../components/LowWallet/LowWallet'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import StakingPredictionTable from '../../../components/StakingPredictionTable/StakingPredictionTable'
import { formatCurrency, formatNumber } from '../../../utils/stringUtl'
import { getUser } from '../../Auth/AuthSlice'
import {  setGameDuration, setIsPlayingTrivia, setQuestionsCount, startGame } from '../../Games/GameSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function LiveTriviaStaking() {
    const location = useLocation();
    const user = useSelector((state) => state.auth.user);
    const gameStakes = useSelector(state => state.game.gameStakes);
    const maximumExhibitionStakeAmount  = useSelector(state => state.common.maximumExhibitionStakeAmount );
    const minimumExhibitionStakeAmount  = useSelector(state => state.common.minimumExhibitionStakeAmount );
    const [amount, setAmount] = useState(200);
    const [amountErr, setAmountError] = useState(false);
    const [loading] = useState(false);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const navigateHandler = () => {
        navigate('/')
    }

    const openBottomSheet = async () => {
        setOpen(true)
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

        if (Number.parseFloat(amount) < Number.parseFloat(minimumExhibitionStakeAmount)) {
            setAmountError(true)
        }
        else setAmountError(false)

        if (Number.parseFloat(amount) > Number.parseFloat(maximumExhibitionStakeAmount)) {
            setAmountError(true)
        } else setAmountError(false)
        setAmount(amount)

        if (Number.parseFloat(user.walletBalance) < Number.parseFloat(amount)) {
            openBottomSheet();
            return
        }
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
                            <span className='inputError'>*Minimum stake amount is {minimumExhibitionStakeAmount} naira
                                and Maximum stake amount is {maximumExhibitionStakeAmount} naira`
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
                            onClose={closeBottomSheet} trivia={location}
                        />}
                    />}

            </div>
        </>
    )
}

const AvailableBoosts = ({ onClose, trivia, user }) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const boosts = useSelector(state => state.auth.user.boosts);
    const [loading, setLoading] = useState(false);

    const onStartGame = () => {
        setLoading(true);
        dispatch(setIsPlayingTrivia(true))
        dispatch(setQuestionsCount(trivia.questionsCount));
        dispatch(setGameDuration(trivia.duration));
        dispatch(startGame({
            category: trivia.categoryId,
            type: trivia.typeId,
            mode: trivia.modeId,
            trivia: trivia.id
        }))
            .then(unwrapResult)
            .then(result => {
                setLoading(false);
                onClose();
            navigate("/game-board", {state: {triviaId: trivia.id }})
            })
            .catch((rejectedValueOrSerializedError) => {
                alert(rejectedValueOrSerializedError.message)
                setLoading(false);
            });
    }

    return (
        <LiveTriviaUserAvailableBoosts boosts={boosts}
            loading={loading} onStartGame={onStartGame} />
    )



}


const LiveTriviaUserAvailableBoosts = ({ boosts, loading, onStartGame }) => {

    return (
        <div className="boosts-container">
            <p className="boosts-header">Available Boosts</p>
            <div className="boosts">
                {boosts.map((boost, i) => <UserAvailableBoost boost={boost} key={i} />
                )}
            </div>
            <button className="start-button" onClick={onStartGame} disabled={loading}>
                <p className="start-text">
                {loading ? 'Starting...' : 'Start Game'}
                </p>
            </button>
        </div>
    )
}

const UserAvailableBoost = ({ boost }) => {
    return (
        <div className="boostContent">
            <div className="boostAmount">
            <img
                    src={`${backendUrl}/${boost.icon}`}
                    className="boostIcon" alt={boost.name}
                />
                <p className="amount1">x{formatNumber(boost.count)}</p>
            </div>
            <div className="boostDetails">
                <p className="boostName">{boost.name}</p>
                <p className="boostDescription">{boost.description}</p>
            </div>
        </div>
    )
}
export default LiveTriviaStaking