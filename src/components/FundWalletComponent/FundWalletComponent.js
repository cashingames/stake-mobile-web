import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/stringUtl'
import { usePaystackPayment } from 'react-paystack';
import './FundWalletComponent.scss'
import { getUser } from '../../features/Auth/AuthSlice';

function FundWalletComponent({close}) {
    const dispatch = useDispatch();

    const [amount, setAmount] = useState();
    const [amountErr, setAmountError] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const [showPayment, setShowPayment] = useState(false);
    const minimumWalletFundableAmount = useSelector(state => state.common.minimumWalletFundableAmount);


    const config = {
        email: user.email,
        amount: Number.parseFloat(amount * 100),
        publicKey: process.env.REACT_APP_PAYSTACK_KEY,
    };

    const onClose = () => {
        dispatch(getUser());
        setShowPayment(false);
        close()
    };


    const onSuccess = () => {
        dispatch(getUser());
        setShowPayment(false);
        close()
    }

    const onChangeAmount = (e) => {
        const amount = e.currentTarget.value;
        const amountEntered = amount.trim().length === 0 ? 0 : Number.parseFloat(amount)
        if (amountEntered < minimumWalletFundableAmount ) {
            setAmountError(true)
        } else setAmountError(false)
        setAmount(amount)
    }
    useEffect(() => {
        const invalid = amountErr || amount === '' || amount === undefined || amount === null  ;
        setCanSave(!invalid);
    }, [amount, amountErr])

    const initializePayment = usePaystackPayment(config);
    return (
        <>
            {!showPayment &&
                <>
                    <div className='fundWalletContainer'>
                        <div className='balance'>
                            <p className='availableAmount'>
                                Bal: &#8358;{
                                    formatCurrency(user.walletBalance)
                                } </p>
                            <p className='walletTitle'>How much do you want to deposit ? (&#8358;)</p>
                            <input value={amount}
                                autoFocus={true}
                                placeholder='500'
                                type='number'
                                onChange={e => onChangeAmount(e)}
                                className='fundAmount' />
                            <div className='flag'>
                                <img src='/images/naija_flag.png' alt='nigeria flag' />
                                <p className='flagText'>NGN</p>
                            </div>
                            {amountErr &&
                                <span className='inputError'>*Amount cannot be less than {minimumWalletFundableAmount} naira</span>
                            }
                        </div>
                    </div>
                    <div className='fundButtonContainer'>
                        <button className='actionBtnContainer'
                            disabled={!canSave}
                            onClick={() => {
                                initializePayment(onSuccess, onClose)
                            }}
                        >
                            <p className='text'>Fund Wallet</p>
                        </button>
                    </div>
                </>
            }
        </>
    )
}

export default FundWalletComponent;
