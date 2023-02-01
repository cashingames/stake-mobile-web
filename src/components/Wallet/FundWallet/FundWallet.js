import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../features/Auth/AuthSlice';
import { formatCurrency } from '../../../utils/stringUtl'
import { usePaystackPayment } from 'react-paystack';
import './FundWallet.scss'

function FundWallet() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [amount, setAmount] = useState()
    const [amountErr, setAmountError] = useState(false);
    const [canSend, setCanSend] = useState(true)
    const user = useSelector((state) => state.auth.user);
    const [showPayment, setShowPayment] = useState(false);
    const minimumWalletFundableAmount = useSelector(state => state.common.minimumWalletFundableAmount);
    // console.log(minimumWalletFundableAmount)

    const config = {
        email: user.email,
        amount: Number.parseFloat(amount * 100),
        publicKey: process.env.REACT_APP_PAYSTACK_KEY,
    };

    const onClose = () => {
        dispatch(getUser());
        setShowPayment(false);
        navigate('/wallet');
    };


    const onSuccess = () => {
        dispatch(getUser());
        setShowPayment(false);
        navigate('/wallet');
    }

    const onChangeAmount = (e) => {
        const amount = e.currentTarget.value;
        const amountEntered = amount.trim().length === 0 ? 0 : Number.parseFloat(amount)
        if (amountEntered < minimumWalletFundableAmount) {
            setAmountError(true)
        } else setAmountError(false)
        setAmount(amount)``
    }

    useEffect(() => {
        const invalid = amountErr || amount === '';
        setCanSend(!invalid);
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
                            disabled={!canSend}
                            onClick={() => {
                                initializePayment(onSuccess, onClose)
                            }}
                        >
                            <p className='text'>Fund Wallet</p>
                        </button>
                    </div>
                    {/* {open &&
                        <div className='dialog'>
                            <Dialogue open={open} handleClose={handleClose} />
                        </div>
                    } */}
                </>
            }
        </>
    )
}

export default FundWallet
