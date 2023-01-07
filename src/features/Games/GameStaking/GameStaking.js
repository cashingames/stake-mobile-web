import React, { useEffect, useState } from "react";
import { Spinner } from "react-activity";
import { useDispatch, useSelector } from "react-redux";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import StakingPredictionTable from '../../../components/StakingPredictionTable/StakingPredictionTable'
import { formatCurrency } from '../../../utils/stringUtl'
import { canStake, getGameStakes, setIsPlayingTrivia, startGame } from "../GameSlice";
import { getUser } from '../../Auth/AuthSlice'
import './GameStaking.scss'
import BottomSheet from "../../../components/BottomSheet/BottomSheet";
import UserAvailableBoosts from "../../../components/UserAvailableBoosts/UserAvailableBoosts";
import { useNavigate } from "react-router-dom";
import { logActionToServer } from "../../CommonSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import LowWallet from "../../../components/LowWallet/LowWallet";
import LoaderScreen from "../../LoaderScreen/LoaderScreen";


const GameStaking = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const gameStakes = useSelector(state => state.game.gameStakes);
    const maximumExhibitionStakeAmount = useSelector(state => state.common.maximumExhibitionStakeAmount);
    const minimumExhibitionStakeAmount = useSelector(state => state.common.minimumExhibitionStakeAmount);
    const features = useSelector(state => state.common.featureFlags);
    const [amount, setAmount] = useState(200);
    const [amountErr, setAmountError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [onloading, setOnLoading] = useState(false);
    const [open, setOpen] = useState(false);


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

    useEffect(() => {
        dispatch(getUser())
        dispatch(getGameStakes()).then(() => { setOnLoading(false) });
    }, [dispatch])

    useEffect(() => {
        if (features.length < 1) {
            navigate('/dashboard')
        }
        return
    })
    const navigateHandler = () => {
        navigate('/game-instructions')
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
    }

    const startGame = () => {
        setLoading(true);
        if (Number.parseFloat(amount) < Number.parseFloat(minimumExhibitionStakeAmount)) {
            alert(`Minimum stake amount is ${minimumExhibitionStakeAmount} naira`);
            setLoading(false);
            return false;
        }

        if (Number.parseFloat(amount) > Number.parseFloat(maximumExhibitionStakeAmount)) {
            alert(`Maximum stake amount is ${maximumExhibitionStakeAmount} naira`);
            setLoading(false);
            return false;
        }

        if (Number.parseFloat(user.walletBalance) < Number.parseFloat(amount)) {
            openBottomSheet();
            setLoading(false);
            return
        }

        dispatch(canStake({
            staking_amount: amount
        })).then(response => {
            openBottomSheet();
            setLoading(false);
        },
            err => {
                if (!err || !err.response || err.response === undefined) {
                    alert("Your Network is Offline.");
                    setLoading(false);
                }
                else if (err.response.status === 400) {
                    alert(err.response.data.message);
                    setLoading(false);

                }
            }
        )
    }
    //disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    if (onloading) {
        return <LoaderScreen backgroundColor="store-background-color" />
      }

    return (
        <>
            <ScreenHeader title='Game Staking' styleProp='staking' onClick={navigateHandler} />
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
                        <button onClick={startGame} disabled={loading} className='start-button'>
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
                    :
                    <BottomSheet
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
export default GameStaking;