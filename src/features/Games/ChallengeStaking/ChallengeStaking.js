import React, { useEffect } from 'react'
import { useState } from 'react'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import { Spinner } from "react-activity";
import { formatCurrency } from '../../../utils/stringUtl'
import './ChallengeStaking.scss'
import Dialogue from '../../../components/Dialogue/Dialogue'
import BottomSheet from '../../../components/BottomSheet/BottomSheet';
import LowWallet from '../../../components/LowWallet/LowWallet';
import ChallengeInviteSuccessText from '../ChallengeInviteSuccessText/ChallengeInviteSuccessText';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendFriendInvite } from '../GameSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { getUser } from '../../Auth/AuthSlice';

const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function ChallengeStaking() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [amount, setAmount] = useState(200);
    const [amountErr, setAmountError] = useState(false);
    const [openSheet, setOpenSheet] = useState(false);
    const [loading, setLoading] = useState(false)
    const [alertMessage, setAlertMessage] = useState(false);
    const user = useSelector(state => state.auth.user);
    const activeCategory = useSelector(state => state.game.gameCategory);
    const minimumChallengeStakeAmount = useSelector(state => state.common.minimumChallengeStakeAmount);
    const maximumChallengeStakeAmount = useSelector(state => state.common.maximumChallengeStakeAmount);

    const onChangeStakeAmount = (e) => {
        const amount = e.currentTarget.value;

        if (Number.parseFloat(amount) < Number.parseFloat(minimumChallengeStakeAmount)) {
            setAmountError(true)
        }
        else setAmountError(false)

        if (Number.parseFloat(amount) > Number.parseFloat(maximumChallengeStakeAmount)) {
            setAmountError(true)
        } else setAmountError(false)
        setAmount(amount)
    }

    const closeBS = () => {
        setOpenSheet(false)
        dispatch(getUser())
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

        if (Number.parseFloat(amount) < Number.parseFloat(minimumChallengeStakeAmount)) {
            alert(`Minimum stake amount is ${minimumChallengeStakeAmount} naira`);
            setLoading(false);
            return false;
        }

        dispatch(sendFriendInvite({
            opponentId: location.state.selectedOpponent.id,
            categoryId: activeCategory.id,
            staking_amount: amount
        }
        ))
            .then(unwrapResult)
            .then(async result => {
                setOpenSheet(true)
            })
            .catch((rejectedValueOrSerializedError) => {
                setLoading(false);
                alert(rejectedValueOrSerializedError.message)
            });
    }

    //disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })
    const handleNavigation = () => {
        navigate('/')
    }
    return (
        <>
            <ScreenHeader title='Challenge Staking' styleProp='cStakingHeader' onClick={handleNavigation} />
            <div style={
                { backgroundImage: "url(/images/quiz-stage.jpg)" }
            }
                className='cStakinContainer'>
                <SelectedPlayers user={user} challengeDetails={location.state.selectedOpponent} />
                <InputStake user={user} onChangeStakeAmount={onChangeStakeAmount}
                    amount={amount} amountErr={amountErr} loading={loading} stakeCash={stakeAmount} />
            </div>
            {Number.parseFloat(user.walletBalance) < Number.parseFloat(amount) ?

                <BottomSheet open={openSheet} closeBottomSheet={closeBS} BSContent={<LowWallet close={closeBS} />} />
                :
                <BottomSheet open={openSheet} closeBottomSheet={closeBS} BSContent={<ChallengeInviteSuccessText onClose={closeBS} />} />
            }
            <Dialogue handleClose={closeAlert} open={alertMessage} dialogueMessage={alertMessage} />

        </>
    )
}

export default ChallengeStaking

const SelectedPlayers = ({ user, challengeDetails }) => {
    return (
        <div style={{ backgroundImage: "url(/images/challenge-stage.png)" }} className="spImage">
            <SelectedPlayer playerName={user.username} playerAvatar={user.avatar ? `${backendUrl}/${user.avatar}` : "/images/user-icon.png"} />
            <img src='/images/versus.png' alt='versus' />
            <SelectedPlayer playerName={challengeDetails.username} playerAvatar={challengeDetails.avatar ? challengeDetails.avatar : "/images/user-icon.png"} />
        </div>
    )
}

const SelectedPlayer = ({ playerName, playerAvatar }) => {
    return (
        <div className='avatarBg'>
            <div className='spAvatar'>
                <img src={playerAvatar} alt='user' onError={(e) => e.target.style.display = 'none'} />
            </div>
            <p className='spUsername'>@{playerName}</p>
        </div>
    )
}

const InputStake = ({ user, onChangeStakeAmount, amountErr, amount, stakeCash, loading }) => {
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
                    required
                />
                {amountErr &&
                    <span className='inputError'>*Minimum stake amount is 100 naira
                        and Maximum stake amount is 1000 naira`
                    </span>
                }
            </div>
            <div className="buttonContainer">
                <button className='start-button' onClick={stakeCash}>
                    <p className="start-text">{loading ? <Spinner
                        color='#ffff'
                        size={10} /> : "Stake Amount"} </p>
                </button>
            </div>
        </div>
    )
}