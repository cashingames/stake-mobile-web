import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { geBonusStakes, getGameStakes, setAmountStaked, setWalletSource, startGame, startPracticeGame } from "../GameSlice";
import Dialogue from '../../../components/Dialogue/Dialogue'
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import './GameStaking.scss'
import { unwrapResult } from "@reduxjs/toolkit";
import { getUser } from "../../Auth/AuthSlice";
import AnonymousRouteHeader from "../../../components/AnonymousRouteHeader/AnonymousRouteHeader";
import { IoCheckmarkCircleOutline, IoTimeOutline } from "react-icons/io5";
import { formatCurrency } from "../../../utils/stringUtl";


const GameStaking = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(false);
    const gameType = useSelector(state => state.game.gameType);
    const gameCategoryId = useSelector(state => state.game.gameCategory.id);
    const gameTypeId = useSelector(state => state.game.gameType.id);
    const gameMode = useSelector(state => state.game.gameMode);
    const [openDialogue, setOpenDialogue] = useState(false);
    const [alertMessage, setAlert] = useState('');
    const [canSend, setCanSend] = useState(false);
    const [loading, setLoading] = useState(false);
    const cashMode = useSelector(state => state.game.cashMode);
    const practiceMode = useSelector(state => state.game.practiceMode);
    const user = useSelector((state) => state.auth.user);
    const [balanceName, setBalanceName] = useState('');
    const [walletType, setWalletType] = useState('');
    const minimumExhibitionStakeAmount = useSelector(state => state.common.minimumExhibitionStakeAmount);
    const depositBalance = Number.parseFloat(user.walletBalance) - Number.parseFloat(user.withdrawableBalance);
    const depositBalanceSelected = balanceName === 1 && Number.parseFloat(depositBalance) >= amount && amount >= Number.parseFloat(minimumExhibitionStakeAmount)
    const bonusSelected = balanceName === 2 && Number.parseFloat(user.bonusBalance) >= amount && amount >= Number.parseFloat(minimumExhibitionStakeAmount)



    useEffect(() => {

        //if no gameType name, it means the user navigated to this page directly
        if (gameType.name === undefined)
            navigate('/dashboard');
    }, [gameType.name, navigate]);

    const closeAlert = () => {
        setOpenDialogue(false)
    }


    const proceed = () => {
        setLoading(true);
        dispatch(setAmountStaked(amount))
        onStartGame()
    }

    const onStartGame = () => {
        setLoading(true);
        if (cashMode) {
            dispatch(setWalletSource(walletType))
            dispatch(startGame(
                {
                    category: gameCategoryId,
                    type: gameTypeId,
                    mode: gameMode.id,
                    staking_amount: amount,
                    wallet_type: walletType
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
        if (practiceMode) {
            dispatch(setWalletSource(walletType))
            dispatch(startPracticeGame(
                {
                    category: gameCategoryId,
                    type: gameTypeId,
                    mode: gameMode.id,
                    amount: amount,
                    wallet_type: walletType
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


    }


    const processStartGameError = async (err) => {
        const errors = err.message;
        setOpenDialogue(true)
        setAlert(errors);

        const firstError = Array.isArray(errors) ? Object.values(errors, {})[0][0] : errors;
        setOpenDialogue(true)
        setAlert(firstError);
    }

    const navigateHandler = () => {
        navigate('/dashboard');
    }

    const onChangeAmount = (e) => {
        const amount = e.currentTarget.value;
        if ((balanceName === `Deposit (NGN ${formatCurrency(depositBalance)})` && (Number.parseFloat(depositBalance) < amount || amount < Number.parseFloat(minimumExhibitionStakeAmount))) ||
            (balanceName === `Bonus (NGN ${formatCurrency(user.bonusBalance)})` && (Number.parseFloat(user.bonusBalance) < amount || amount < Number.parseFloat(minimumExhibitionStakeAmount)))) {
            setError(true)
        }
        else setError(false)
        setAmount(amount)
    }

    const onChangePracticeAmount = (e) => {
        const amount = e.currentTarget.value;
        if (amount === '') {
            setError(true)
        } else setError(false);
        setAmount(amount);
    }

    useEffect(() => {
        if (cashMode && balanceName === 1) {
            setWalletType('deposit_balance')
        }
        else if (cashMode && balanceName === 2) {
            setWalletType('bonus_balance')
        }
        else if (practiceMode && balanceName === 1) {
            setWalletType('demo_deposit_balance')
        }
        else if (practiceMode && balanceName === 2) {
            setWalletType('demo_bonus_balance')
        }
    }, [balanceName, depositBalance, user.bonusBalance, cashMode, practiceMode])

    useEffect(() => {
        const canSend = balanceName !== '' && (depositBalanceSelected === true || bonusSelected === true) && amount !== ''
        setCanSend(canSend);
    }, [amount, depositBalanceSelected, bonusSelected, balanceName])

    useEffect(() => {
        dispatch(getGameStakes())
        dispatch(geBonusStakes())
        dispatch(getUser())
    }, [dispatch])

    return (
        <div className="staking-container">
            <AnonymousRouteHeader title='Enter Stake' styleProp='staking' isClose={true} onClick={navigateHandler} />
            {cashMode &&
                <StakingBalances depositBalance={depositBalance} user={user}
                    minimumExhibitionStakeAmount={minimumExhibitionStakeAmount} setBalanceName={setBalanceName} balanceName={balanceName} />
            }
            {practiceMode &&
                <PracticeStakingBalances
                    setBalanceName={setBalanceName} balanceName={balanceName} />
            }
            {cashMode &&
                <div className="input-container">
                    <div className='label-container'>
                        <label htmlFor='amount' className='input-label'>Enter amount</label>
                        {/* <p className='required-text'>Required</p> */}
                    </div>
                    <input
                        placeholder={`Minimum amount is NGN ${minimumExhibitionStakeAmount}`}
                        type='number'
                        id='amount'
                        value={amount}
                        className={error ? 'input-boxi' : 'input-box'}
                        autoFocus={true}
                        onChange={e => onChangeAmount(e)}
                        required
                    />
                    {error && amount < Number.parseFloat(minimumExhibitionStakeAmount) &&
                        <span className='input-error'>Minimum staking amount is NGN {minimumExhibitionStakeAmount}</span>
                    }
                    {error && balanceName === 1 && amount > Number.parseFloat(depositBalance) &&
                        <div className='input-error-container'>
                            <span className='input-error'>Insufficient wallet balance</span>
                            <div className='fund-container' onClick={() => navigate('/fund-wallet')}>
                                <span className='fund'>Fund wallet</span>
                            </div>
                        </div>
                    }

                    {error && balanceName === 2 && amount > Number.parseFloat(user.bonusBalance) &&
                        <div className='input-error-container'>
                            <span className='input-error'>Insufficient bonus balance, stake from another balance</span>
                        </div>
                    }

                </div>
            }
            {practiceMode &&
                <div className="input-container">
                    <div className='label-container'>
                        <label htmlFor='amount' className='input-label'>Enter stake amount</label>
                    </div>
                    <input
                        placeholder={`Minimum amount is NGN ${minimumExhibitionStakeAmount}`}
                        type='number'
                        id='amount'
                        value={amount}
                        className={error ? 'input-boxi' : 'input-box'}
                        autoFocus={true}
                        onChange={e => onChangePracticeAmount(e)}
                        required
                    />
                </div>
            }
            {cashMode &&
                <button onClick={() => proceed()} className='button-container' disabled={loading || !canSend}>
                    <p className="buttonText">Start Game</p>
                </button>
            }
            {practiceMode &&
                <button onClick={proceed} className='button-container' disabled={loading || amount === '' || balanceName === ''}>
                    <p className="buttonText">Start Game</p>
                </button>
            }
            <StakingPredictionsTable amount={amount} walletType={walletType} />

            <Dialogue open={openDialogue} handleClose={closeAlert} dialogueMessage={alertMessage} />
        </div>
    )
}

const StakingPredictionsTable = ({ amount, walletType }) => {
    const gameStakes = useSelector(state => state.game.gameStakes);
    const bonusStakes = useSelector(state => state.game.bonusStakes);
    return (
        <div className="stake-container">
            <p className="stake-heading">Winning Odds</p>
            <div className="stake-headers">
                <p className="stake-score">OUTCOME</p>
                <p className="stake-head">ODDS</p>
                <p className="stake-pay">PAYOUT</p>
            </div>
            {walletType === 'deposit_balance' &&
                <>
                    {gameStakes.map((gameStake, i) => <StakingPredictionsRow key={i} gameStake={gameStake} position={i + 1}
                        amount={amount} />)
                    }
                </>
            }
            {walletType === 'demo_deposit_balance' &&
                <>
                    {gameStakes.map((gameStake, i) => <StakingPredictionsRow key={i} gameStake={gameStake} position={i + 1}
                        amount={amount} />)
                    }
                </>
            }
            {walletType === '' &&
                <>
                    {gameStakes.map((gameStake, i) => <StakingPredictionsRow key={i} gameStake={gameStake} position={i + 1}
                        amount={amount} />)
                    }
                </>
            }
            {walletType === 'bonus_balance' &&
                <>
                    {bonusStakes.map((gameStake, i) => <StakingPredictionsRow key={i} gameStake={gameStake} position={i + 1}
                        amount={amount} />)
                    }
                </>
            }
            {walletType === 'demo_bonus_balance' &&
                <>
                    {bonusStakes.map((gameStake, i) => <StakingPredictionsRow key={i} gameStake={gameStake} position={i + 1}
                        amount={amount} />)
                    }
                </>
            }
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

const StakingBalances = ({ depositBalance, minimumExhibitionStakeAmount, user, balanceName, setBalanceName }) => {

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



export default GameStaking;