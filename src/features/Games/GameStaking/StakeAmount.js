import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './StakeAmount.scss'
import { useNavigate } from "react-router-dom";

function StakeAmount({ onSubmit, amount, setAmount, disabled }) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const minimumExhibitionStakeAmount = useSelector(state => Number.parseFloat(state.common.minimumExhibitionStakeAmount ?? 0));
    const totalBalance = user.hasBonus === true && (Number.parseFloat(user.bonusBalance) >= Number.parseFloat(minimumExhibitionStakeAmount)) ? Number.parseFloat(user.bonusBalance) ?? 0 : Number.parseFloat(user.walletBalance) ?? 0
    const [amountErr, setAmountError] = useState(false);
    const [withdraw, setWithdraw] = useState(false);

    const onChangeAmount = (e) => {
        const amount = e.currentTarget.value;
        const amountEntered = amount.trim().length === 0 ? 0 : Number.parseFloat(amount)
        if (amountEntered < Number.parseFloat(minimumExhibitionStakeAmount) || amount > totalBalance) {
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
                    disabled
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