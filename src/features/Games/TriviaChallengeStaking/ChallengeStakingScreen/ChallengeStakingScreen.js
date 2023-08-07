import React, { useEffect, useState } from 'react'
import { formatCurrency, formatNumber } from '../../../../utils/stringUtl'
import './ChallengeStakingScreen.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ScreenHeader from '../../../../components/ScreenHeader/ScreenHeader';
import { setChallengeAmountStaked, startChallengeRequest, startPracticeChallengeRequest } from '../TriviaChallengeGameSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import logToAnalytics from '../../../../utils/analytics';
import { Spinner } from 'react-activity';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

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
    const [balanceName, setBalanceName] = useState('');
    const gameCategoryId = useSelector(state => state.game.gameCategory.id);
    const minimumChallengeStakeAmount = useSelector(state => state.common.minimumChallengeStakeAmount);
    const maximumChallengeStakeAmount = useSelector(state => state.common.maximumChallengeStakeAmount);
    const gameType = useSelector(state => state.game.gameType);
    const [walletType, setWalletType] = useState('');
    const cashMode = useSelector(state => state.game.cashMode);
    const practiceMode = useSelector(state => state.game.practiceMode);
    const depositBalance = Number.parseFloat(user.walletBalance) - Number.parseFloat(user.withdrawableBalance);
    const depositBalanceSelected = balanceName === 1 && Number.parseFloat(depositBalance) >= amount && amount >= Number.parseFloat(minimumChallengeStakeAmount)
    const bonusSelected = balanceName === 2 && Number.parseFloat(user.bonusBalance) >= amount && amount >= Number.parseFloat(minimumChallengeStakeAmount)


    const onChangeStakeAmount = (e) => {
        const amount = e.currentTarget.value;

        if ((balanceName === 1 && (Number.parseFloat(depositBalance) < amount || amount < Number.parseFloat(minimumChallengeStakeAmount))) ||
            (balanceName === 2 && (Number.parseFloat(user.bonusBalance) < amount || amount < Number.parseFloat(minimumChallengeStakeAmount)))) {
            setAmountError(true)
        }
        else setAmountError(false)

        setAmount(amount)
    }

    const stakeAmount = async () => {
        setLoading(true);
        dispatch(setChallengeAmountStaked(amount))
        dispatch(startChallengeRequest({
            category: gameCategoryId,
            amount: amount,
            wallet_type: walletType
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

    const stakePracticeAmount = async () => {
        setLoading(true);

        dispatch(startPracticeChallengeRequest({
            category: gameCategoryId,
            amount: amount,
            wallet_type: walletType
        })).then(unwrapResult)
            .then(async result => {
                setLoading(false)
                logToAnalytics("practice_challenge_stake_now_clicked", {
                    'amount': amount,
                });
                navigate('/challenge-matching')
            })
            .catch((rejectedValueOrSerializedError) => {
                alert("Something went wrong. Please try again or contact support")
                setLoading(false)
            });
    }

    const handleNavigation = () => {
        navigate('/select-category')
    }

    useEffect(() => {
        if (cashMode && balanceName === 1) {
            setWalletType('CREDIT_BALANCE')
        }
        else if (cashMode && balanceName === 2) {
            setWalletType('BONUS_BALANCE')
        }
        else if (practiceMode && balanceName === 1) {
            setWalletType('DEMO_CREDIT_BALANCE')
        }
        else if (practiceMode && balanceName === 2) {
            setWalletType('DEMO_BONUS_BALANCE')
        }
    }, [balanceName, depositBalance, user.bonusBalance, cashMode, practiceMode])

    useEffect(() => {
        const canSend = balanceName !== '' && (depositBalanceSelected === true || bonusSelected === true) && amount !== ''
        setCanSend(canSend);
    }, [amount, depositBalanceSelected, bonusSelected, balanceName])


    useEffect(() => {

        //if no gameType name, it means the user navigated to this page directly
        if (gameType.name === undefined)
            navigate('/dashboard');
    }, [gameType.name, navigate]);


    return (
        <>
            <div style={{ backgroundImage: "url(/images/match-background.png)" }} className='challenge-staking-container'>
                <ScreenHeader title='Challenge Player' styleProp='challenge-staking-header' iconProp='backIcon' onClick={handleNavigation} />
                <div className='purchase-boost'>
                    <p className='boost-text'>Score high using boosts</p>
                    {cashMode &&
                        <>
                            {boosts?.length > 0 ?
                                <div className='boost-container'>
                                    {boosts.map((boost, i) => <BoostCardDetails key={i} boost={boost} />)}
                                </div>
                                :
                                <div className='boost-container'>
                                    <div className='boost-card-container'>
                                        <img
                                            src="/images/timefreeze-boost.png"
                                            className="boost-icon" alt='time freeze boost' />
                                        <p className="boost-name">x0</p>
                                    </div>
                                    <div className='boost-card-container'>
                                        <img
                                            src='/images/skip-boost.png'
                                            className="boost-icon" alt='Skip boost' />
                                        <p className="boost-name">x0</p>
                                    </div>
                                </div>
                            }
                        </>
                    }
                    {practiceMode &&
                        <DemoBoostCardDetails />
                    }
                </div>
                <SelectedPlayers user={user} />
                <WalletDetails balance={depositBalance} practiceMode={practiceMode} cashMode={cashMode} />
                {cashMode &&
                    <StakingBalances depositBalance={depositBalance} user={user}
                        setBalanceName={setBalanceName} balanceName={balanceName} />
                }
                {practiceMode &&
                    <PracticeStakingBalances
                        setBalanceName={setBalanceName} balanceName={balanceName} />
                }
                <InputStake user={user} onChangeStakeAmount={onChangeStakeAmount}
                    amount={amount} amountErr={amountErr} balanceName={balanceName} depositBalance={depositBalance}
                    minimumChallengeStakeAmount={minimumChallengeStakeAmount} maximumChallengeStakeAmount={maximumChallengeStakeAmount} />
                {cashMode &&
                    <button className='button-containeri' onClick={stakeAmount} disabled={loading || !canSend}>
                        <p className="button-text">{loading ? <Spinner
                            color='#ffff'
                            size={10} /> : "Stake Amount"}</p>
                    </button>
                }
                {practiceMode &&
                    <button className='button-containeri' onClick={stakePracticeAmount} disabled={loading || amount === '' || balanceName === ''}>
                        <p className="button-text">{loading ? <Spinner
                            color='#ffff'
                            size={10} /> : "Stake Amount"}</p>
                    </button>
                }
            </div>


        </>
    )
}

const SelectedPlayers = ({ user }) => {
    const username = user.username?.charAt(0) + user.username?.charAt(1)

    return (
        <div className="players-container" >
            <SelectedPlayer playerName={user.username} playerAvatar={username} />
            <img src='/images/versus.png' alt='versus ' className="versus" />
            <SelectedPlayer playerName='....' playerAvatar="?" backgroundColor='#FEECE7' />
        </div>
    )
}

const SelectedPlayer = ({ playerName, playerAvatar, backgroundColor }) => {
    return (
        <div className='player-container'>
            <div className='user-avatar' style={{ backgroundColor: backgroundColor }}>
                <span className='avatar-text'>{playerAvatar}</span>
            </div>
            <p className='player-name'>@{playerName}</p>
        </div>
    )
}
const WalletDetails = ({ balance, cashMode, practiceMode }) => {

    return (
        <div className='wallet-container'>
            <div className='total-header'>
                <div className='total-title-container'>
                    {cashMode &&
                        <p className='total-title-text'>Deposit balance</p>
                    }
                    {practiceMode &&
                        <p className='total-title-text'>Demo balance</p>
                    }
                </div>
            </div>

            <div className='funding-container'>
                <div className='currency-header'>
                    <span className='currency-text'>NGN</span>
                    {cashMode &&
                        <span className='currency-amount'>{formatCurrency(balance)}</span>
                    }
                    {practiceMode &&
                        <span className='currency-amount'>{formatCurrency(100000)}</span>
                    }
                </div>
            </div>
        </div>
    )
}

const StakingBalances = ({ depositBalance, user, balanceName, setBalanceName }) => {

    const balanceAccounts = [
        {
            key: 1,
            value: `Deposit (NGN ${formatCurrency(depositBalance)})`,
            // eslint-disable-next-line
            disabled: depositBalance == 0,
        },
        {
            key: 2,
            value: `Bonus (NGN ${formatCurrency(user.bonusBalance)})`,
            // eslint-disable-next-line
            disabled: user.bonusBalance == 0,
        }
    ]

    return (
        <div className="balances-container">
            <div className="label-container">
                <span className="balance-label">Where are you staking from?</span>
                <span className="required-text">Required</span>
            </div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" style={{ fontFamily: 'sansation-regular', color: '#1C453B', fontSize: '0.92rem', }}>Select Wallet</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={balanceName}
                    label="Select Wallet"
                    onChange={(e) => setBalanceName(e.target.value)}
                    sx={{
                        height: ' 3.5rem',
                        borderRadius: '14px',
                        fontSize: '0.95rem',
                        background: '#FFF',
                        border: '0.1px solid #D9D9D9',
                        outline: 0,
                        fontFamily: 'sansation-regular',
                        color: '#1C453B',
                    }}
                >
                    {balanceAccounts && balanceAccounts.map((balanceAccount, i) => {
                        return (
                            <MenuItem key={balanceAccount.key} value={balanceAccount.key} disabled={balanceAccount.disabled}
                                style={{ color: '#1C453B', fontFamily: 'sansation-regular' }}>{balanceAccount.value}</MenuItem>
                        )
                    }
                    )}
                </Select>
            </FormControl>
        </div>
    )
}
const PracticeStakingBalances = ({ balanceName, setBalanceName }) => {

    const balanceAccounts = [
        {
            key: 1,
            value: `Deposit (NGN ${formatCurrency(100000)})`,
        },
        {
            key: 2,
            value: `Bonus (NGN ${formatCurrency(100000)})`,
        }
    ]

    return (
        <div className="balances-container">
            <div className="label-container">
                <span className="balance-label">Where are you staking from?</span>
                <span className="required-text">Required</span>
            </div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" style={{ fontFamily: 'sansation-regular', color: '#1C453B', fontSize: '0.92rem', }}>Select Wallet</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={balanceName}
                    label="Select Wallet"
                    onChange={(e) => setBalanceName(e.target.value)}
                    sx={{
                        height: ' 3.5rem',
                        borderRadius: '14px',
                        fontSize: '0.95rem',
                        background: '#FFF',
                        border: '0.1px solid #D9D9D9',
                        outline: 0,
                        fontFamily: 'sansation-regular',
                        color: '#1C453B',
                    }}
                >
                    {balanceAccounts && balanceAccounts.map((balanceAccount, i) => {
                        return (
                            <MenuItem key={balanceAccount.key} value={balanceAccount.key} disabled={balanceAccount.disabled}
                                style={{ color: '#1C453B', fontFamily: 'sansation-regular' }}>{balanceAccount.value}</MenuItem>
                        )
                    }
                    )}
                </Select>
            </FormControl>
        </div>
    )
}

const InputStake = ({ user, onChangeStakeAmount, amountErr, amount, minimumChallengeStakeAmount, maximumChallengeStakeAmount, balanceName, depositBalance }) => {
    let navigate = useNavigate();

    return (

        <div className="input-container">
            <div className='label-container'>
                <label htmlFor='amount' className='input-label'>Enter amount</label>
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
            {amountErr && balanceName === 1 && (amount > Number.parseFloat(depositBalance)) &&
                <div className='input-error-container'>
                    <span className='input-error'>Insufficient wallet balance</span>
                    <div className='fund-container' onClick={() => navigate('/fund-wallet')}>
                        <span className='fund'>Fund wallet</span>
                    </div>
                </div>
            }

            {amountErr && balanceName === 2 && amount > Number.parseFloat(user.bonusBalance) &&
                <div className='input-error-container'>
                    <span className='input-error'>Insufficient bonus balance, stake from another balance</span>
                </div>
            }
            {/* {amountErr && Number.parseFloat(amount) < Number.parseFloat(minimumChallengeStakeAmount) &&
                <span className='input-error'>Minimum staking amount is NGN {minimumChallengeStakeAmount}</span>
            } */}
            {Number.parseFloat(amount) < Number.parseFloat(minimumChallengeStakeAmount) &&
                <span className='input-error'>Minimum staking amount is NGN {minimumChallengeStakeAmount}</span>
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

const DemoBoostCardDetails = () => {
    return (
        <div className='boost-container'>
            <div className='boost-card-container'>
                <img src='/images/timefreeze-boost.png' className="boost-icon" alt='boost' />
                <p className='boost-name'>x{formatNumber(20)}</p>
            </div>
            <div className='boost-card-container'>
                <img src='/images/skip-boost.png' className="boost-icon" alt='boost' />
                <p className='boost-name'>x{formatNumber(20)}</p>
            </div>
        </div>
    )
}
export default ChallengeStakingScreen;
