import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from '../../../utils/stringUtl'

import './StakeAmount.scss'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoChevronForwardOutline } from "react-icons/io5";

function StakeAmount({ onSubmit, amount, setAmount, disabled }) {

    const user = useSelector((state) => state.auth.user);
    const minimumExhibitionStakeAmount = useSelector(state => Number.parseFloat(state.common.minimumExhibitionStakeAmount ?? 0));
    const [amountErr, setAmountError] = useState(false);
    const [withdraw, setWithdraw] = useState(false);


    let navigate = useNavigate();

    const [hidden, setHidden] = useState(false);
    const onChangeAmount = (e) => {
        const amount = e.currentTarget.value;
        const amountEntered = amount.trim().length === 0 ? 0 : Number.parseFloat(amount)
        if (amountEntered < Number.parseFloat(minimumExhibitionStakeAmount) || amount > Number.parseFloat(user.walletBalance)) {
            setAmountError(true)
        } else setAmountError(false)
        setAmount(amount)
    }

    const submit = () => {
        onSubmit(amount);
    }

    useEffect(() => {
        const invalid = amountErr || amount === ''
        setWithdraw(!invalid);
    }, [amount, amountErr])

    return (
        <div className="amountContainer">
            <div className="walletContainer">
                <div className='total-header'>
                    <div className='total-title-container'>
                        <img src='/images/wallet-with-cash.png' alt='wallet' className='avatar' />
                        <p className='total-title-text'>Total balance</p>
                    </div>
                    <span onClick={() => setHidden(!hidden)}>{hidden ? <FaEyeSlash color='#072169' /> : <FaEye color='#072169' />}</span>
                </div>
                <div className='currency-bottom'>
                    <div className='currency-header'>
                        <span className='currency-text'>NGN</span>
                        {hidden ?
                            <span className='currency-amount'>***</span> :
                            <span className='currency-amount'>{formatCurrency(user.walletBalance)}</span>
                        }
                    </div>
                    <div className='funding-button' onClick={() => navigate('/fund-wallet')}>
                        <p className='funding-text'>Deposit</p>
                        <IoChevronForwardOutline size={18} className='icon' color='#072169' />
                    </div>
                </div>
            </div>

            <div className="input-container">
                <div className='label-container'>
                    <label htmlFor='amount' className='input-label'>Enter amount</label>
                    <p className='required-text'>Required</p>
                </div>
                <input
                    placeholder={`Minimum amount is NGN ${minimumExhibitionStakeAmount}`}
                    type='number'
                    id='amount'
                    value={amount}
                    className={amountErr ? 'input-boxi' : 'input-box'}
                    autoFocus={true}
                    onChange={e => onChangeAmount(e)}
                    required
                />
                {amountErr && amount < Number.parseFloat(minimumExhibitionStakeAmount) &&
                    <span className='input-error'>Minimum staking amount is NGN {minimumExhibitionStakeAmount}</span>
                }
                {amountErr && amount > Number.parseFloat(user.walletBalance) &&
                    <div className='input-error-container'>
                        <span className='input-error'>Insufficient wallet balance</span>
                        <div className='fund-container' onClick={() => navigate('/fund-wallet')}>
                            <span className='fund'>Fund wallet</span>
                        </div>
                    </div>
                }
            </div>

            <button onClick={submit} className='button-container' disabled={disabled || !withdraw}>
                <p className="buttonText">Start Game</p>
            </button>

        </div>
    )
}

export default StakeAmount;