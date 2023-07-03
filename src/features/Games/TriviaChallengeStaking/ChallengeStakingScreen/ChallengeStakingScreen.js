import React, { useEffect, useState } from 'react'
import { formatCurrency, formatNumber } from '../../../../utils/stringUtl'
import './ChallengeStakingScreen.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ScreenHeader from '../../../../components/ScreenHeader/ScreenHeader';
import { startChallengeRequest } from '../TriviaChallengeGameSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import logToAnalytics from '../../../../utils/analytics';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { Spinner } from 'react-activity';

const backendUrl = process.env.REACT_APP_API_ROOT_URL;



const ChallengeStakingScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const boosts = useSelector(state => state.auth.user.boosts);
    const [amount, setAmount] = useState('');
    const [amountErr, setAmountError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [canSend, setCanSend] = useState(false);
    const gameCategoryId = useSelector(state => state.game.gameCategory.id);
    const minimumChallengeStakeAmount = useSelector(state => state.common.minimumChallengeStakeAmount);
    const maximumChallengeStakeAmount = useSelector(state => state.common.maximumChallengeStakeAmount);
    const gameType = useSelector(state => state.game.gameType);


    const onChangeStakeAmount = (e) => {
        const amount = e.currentTarget.value;

        if (Number.parseFloat(amount) < Number.parseFloat(minimumChallengeStakeAmount) ||
            Number.parseFloat(amount) > Number.parseFloat(maximumChallengeStakeAmount) || Number.parseFloat(amount) > Number.parseFloat(user.walletBalance)) {
            setAmountError(true)
        }
        else setAmountError(false)

        setAmount(amount)
    }

    const stakeAmount = async () => {
        setLoading(true);

        dispatch(startChallengeRequest({
            category: gameCategoryId,
            amount: amount
        })).then(unwrapResult)
            .then(async result => {
                setLoading(false)
                logToAnalytics("trivia_challenge_stake_now_clicked", {
                    'amount': amount,
                });
                navigate('/challenge-matching')
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

        const invalid = amount === '' || amountErr
        setCanSend(!invalid);

    }, [amount, amountErr])


    useEffect(() => {

        //if no gameType name, it means the user navigated to this page directly
        if (gameType.name === undefined)
            navigate('/dashboard');
    }, [gameType.name, navigate]);


    return (
        <>
            <ScreenHeader title='Challenge Player' styleProp='challenge-staking-header' iconProp='backIcon' onClick={handleNavigation} />
            <div style={{ backgroundImage: "url(/images/game-play-background.png)" }} className='challenge-staking-container'>
                <div className='purchase-boost'>
                    <p className='boost-text'>{user.username}, score higher with boosts</p>
                    {boosts?.length > 0 ?
                        <div className='boost-container'>
                            {boosts.map((boost, i) => <BoostCardDetails key={i} boost={boost} />)}
                        </div>
                        :
                        <span className='no-boost'>You dont have any available boost</span>
                    }
                    <p className='buy-boost-text' onClick={goToStore}>Get boosts</p>
                </div>
                <SelectedPlayers user={user} />
                <WalletDetails balance={user.walletBalance} />
                <InputStake user={user} onChangeStakeAmount={onChangeStakeAmount}
                    amount={amount} amountErr={amountErr}
                    minimumChallengeStakeAmount={minimumChallengeStakeAmount} maximumChallengeStakeAmount={maximumChallengeStakeAmount} />
                <button className='button-container' onClick={stakeAmount} disabled={loading || !canSend}>
                    <p className="button-text">{loading ? <Spinner
                        color='#ffff'
                        size={10} /> : "Stake Amount"}</p>
                </button>
            </div>


        </>
    )
}

const SelectedPlayers = ({ user }) => {
    return (
        <div className="players-container">
            <SelectedPlayer playerName={user.username} playerAvatar={user.avatar ? `${backendUrl}/${user.avatar}` : "/images/user-icon.png"} />
            <img src='/images/versus.png' alt='versus ' className="versus" />
            <SelectedPlayer playerName='....' playerAvatar="/images/question.png" />
        </div>
    )
}

const WalletDetails = ({ balance }) => {
    let navigate = useNavigate();

    // const [hidden, setHidden] = useState(false);

    return (
        <div className='wallet-container'>
            <div className='total-header'>
                <div className='total-title-container'>
                    <img src='/images/wallet-with-cash.png' alt='wallet' className='avatar' />
                    <p className='total-title-text'>Total balance</p>
                </div>
                {/* <span onClick={() => setHidden(!hidden)}>{hidden ? <FaEyeSlash color='#072169' /> : <FaEye color='#072169' />}</span> */}
            </div>

            <div className='funding-container'>
                <div className='currency-header'>
                    <span className='currency-text'>NGN</span>
                    <span className='currency-amount'>{formatCurrency(balance)}</span>
                    {/* {hidden ?
                        <span className='currency-amount'>***</span> :
                        <span className='currency-amount'>{formatCurrency(balance)}</span>
                    } */}
                </div>
                <div className='funding-button' onClick={() => navigate('/fund-wallet')}>
                    <p className='funding-text'>Deposit</p>
                    <IoChevronForwardOutline size={20} color='#072169' className='icon' />

                </div>
            </div>
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

const InputStake = ({ user, onChangeStakeAmount, amountErr, amount, minimumChallengeStakeAmount, maximumChallengeStakeAmount }) => {
    let navigate = useNavigate();

    return (

        <div className="input-container">
            <div className='label-container'>
                <label htmlFor='amount' className='input-label'>Enter stake amount</label>
                <p className='required-text'>Required</p>
            </div>
            <input
                placeholder={`Minimum amount is NGN ${minimumChallengeStakeAmount}`}
                type='number'
                id='amount'
                value={amount}
                className={amountErr ? 'input-boxi' : 'input-box'}
                autoFocus={true}
                onChange={e => onChangeStakeAmount(e)}
                required
            />
            {amountErr && Number.parseFloat(amount) < Number.parseFloat(minimumChallengeStakeAmount) &&
                <span className='input-error'>Minimum staking amount is NGN {minimumChallengeStakeAmount}</span>
            }
            {amountErr && Number.parseFloat(amount) > Number.parseFloat(maximumChallengeStakeAmount) &&
                <span className='input-error'>Maximum staking amount is NGN {maximumChallengeStakeAmount}</span>
            }
            {amountErr && Number.parseFloat(amount) > Number.parseFloat(user.walletBalance) &&
                <div className='input-error-container'>
                    <span className='input-error'>Insufficient wallet balance</span>
                    <div className='fund-container' onClick={() => navigate('/fund-wallet')}>
                        <span className='fund'>Fund wallet</span>
                    </div>
                </div>
            }
        </div>


    )
}

const BoostCardDetails = ({ boost }) => {
    return (
        <div className='boost-card-container'>
            <img src={`${backendUrl}/${boost.icon}`} className="boost-icon" alt='boost' />
            <p className='boost-name'>x{formatNumber(boost.count)}</p>
        </div>
    )
}
export default ChallengeStakingScreen;
