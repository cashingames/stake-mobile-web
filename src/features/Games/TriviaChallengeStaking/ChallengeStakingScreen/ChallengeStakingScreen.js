import React, { useEffect, useState } from 'react'
import { Spinner } from "react-activity";
import { formatCurrency } from '../../../../utils/stringUtl'
import './ChallengeStakingScreen.scss';
import Dialogue from '../../../../components/Dialogue/Dialogue'
import LowWallet from '../../../../components/LowWallet/LowWallet';
import BottomSheet from '../../../../components/BottomSheet/BottomSheet';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ScreenHeader from '../../../../components/ScreenHeader/ScreenHeader';
import { getUser } from '../../../Auth/AuthSlice';
import { startChallengeRequest } from '../TriviaChallengeGameSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import logToAnalytics from '../../../../utils/analytics';

const backendUrl = process.env.REACT_APP_API_ROOT_URL;



const ChallengeStakingScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const boosts = useSelector(state => state.common.boosts);
    const [amount, setAmount] = useState(200);
    const [amountErr, setAmountError] = useState(false);
    const [openSheet, setOpenSheet] = useState(false);
    const [loading, setLoading] = useState(false)
    const [alertMessage, setAlertMessage] = useState(false);
    const gameCategoryId = useSelector(state => state.game.gameCategory.id);
    const minimumChallengeStakeAmount = useSelector(state => state.common.minimumChallengeStakeAmount);
    const gameType = useSelector(state => state.game.gameType);


    const onChangeStakeAmount = (e) => {
        const amount = e.currentTarget.value;

        if (Number.parseFloat(amount) < Number.parseFloat(minimumChallengeStakeAmount)) {
            setAmountError(true)
        }
        else setAmountError(false)

        setAmount(amount)
    }

    const closeBS = () => {
        dispatch(getUser())
        setOpenSheet(false)
    }

    const closeAlert = () => {
        setAlertMessage(false)
    }

    const stakeAmount = async () => {
        setLoading(true);
        if (Number.parseFloat(user.walletBalance) < Number.parseFloat(amount)) {
            setOpenSheet(true);
            setLoading(false);
            return
        }

        dispatch(startChallengeRequest({
            category: gameCategoryId,
            amount: amount
        })).then(unwrapResult)
            .then(async result => {
                setLoading(false)
                logToAnalytics("trivia_challenge_stake_now_clicked", {
                    'amount': amount,
                });
                // navigate('/')
                alert("doneeee")
            })
            .catch((rejectedValueOrSerializedError) => {
                alert("Something went wrong. Please try again or contact support")
                setLoading(false)
            });
    }

    const goToStore = () => {
        logToAnalytics("trivia_challenge_get_boost_clicked");
        navigate('/store');
    }

    const handleNavigation = () => {
        navigate('/select-category')
    }

    useEffect(() => {

        //if no gameType name, it means the user navigated to this page directly
        if (gameType.name === undefined)
            navigate('/dashboard');
    }, [gameType.name, navigate]);


    return (
        <>
            <ScreenHeader title='Challenge Staking' styleProp='challenge-staking-header' onClick={handleNavigation} />
            <div style={{ backgroundImage: "url(/images/quiz-stage.jpg)" }} className='challenge-staking-container'>
                <SelectedPlayers user={user} />
                <InputStake user={user} onChangeStakeAmount={onChangeStakeAmount}
                    amount={amount} amountErr={amountErr} loading={loading} stakeCash={stakeAmount} minimumChallengeStakeAmount={minimumChallengeStakeAmount} />
                <div className='purchase-boost'>
                    <p className='boost-text'>Score higher with boosts</p>
                    <div className='boost-container'>
                        {boosts.map((boost, i) => <BoostCardDetails key={i} boost={boost} />)}
                    </div>
                    <p className='buy-boost-text' onClick={goToStore}>Get boosts</p>
                </div>
            </div>
            <BottomSheet open={openSheet} closeBottomSheet={closeBS} BSContent={<LowWallet onClose={closeBS} />} />
            <Dialogue handleClose={closeAlert} open={alertMessage} dialogueMessage={alertMessage} />

        </>
    )
}

const SelectedPlayers = ({ user }) => {
    return (
        <div style={{ backgroundImage: "url(/images/challenge-stage.png)" }} className="players-container">
            <SelectedPlayer playerName={user.username} playerAvatar={user.avatar ? `${backendUrl}/${user.avatar}` : "/images/user-icon.png"} />
            <img src='/images/versus.png' alt='versus' />
            <SelectedPlayer playerName='....' playerAvatar="/images/question.png" />
        </div>
    )
}

const SelectedPlayer = ({ playerName, playerAvatar }) => {
    return (
        <div className='player-container'>
            <div className='avatar-container'>
                <img src={playerAvatar} alt='user' onError={(e) => e.target.style.display = 'none'} />
            </div>
            <p className='player-name'>@{playerName}</p>
        </div>
    )
}

const InputStake = ({ user, onChangeStakeAmount, amountErr, amount, stakeCash, loading, minimumChallengeStakeAmount }) => {
    return (
        <div className="amountContainers">
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
                    // disabled= {true}
                    required
                />
                {amountErr &&
                    <span className='inputError'>*Minimum stake amount is {minimumChallengeStakeAmount} naira
                    </span>
                }
            </div>
            <div className="buttonContainer">
                <button className='start-button' onClick={stakeCash} disabled={loading}>
                    <p className="start-text">{loading ? <Spinner
                        color='#ffff'
                        size={10} /> : "Stake Amount"}</p>
                </button>
            </div>
        </div>
    )
}

const BoostCardDetails = ({ boost }) => {
    return (
        <div className='boost-card-container'>
            <img src={`${backendUrl}/${boost.icon}`} className="boost-icon" alt='boost' />
            <div className='boost-details-container'>
                <div className='boost-name-count'>
                    <p className='boost-name'>{boost.name}</p>
                </div>
            </div>
        </div>
    )
}
export default ChallengeStakingScreen;
