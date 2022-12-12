import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/stringUtl'
import { usePaystackPayment } from 'react-paystack';
import './FundWalletComponent.scss'

function FundWalletComponent({close}) {
    const [amount, setAmount] = useState()
    const [amountErr, setAmountError] = useState(false);
    const [canSend, setCanSend] = useState(true)
    const user = useSelector((state) => state.auth.user);
    const [showPayment, setShowPayment] = useState(false);

    const config = {
        email: user.email,
        amount: Number.parseFloat(amount * 100),
        publicKey: process.env.REACT_APP_PAYSTACK_KEY,
    };

    const onClose = () => {
        setShowPayment(false);
        close()
    };


    const onSuccess = () => {
        setShowPayment(false);
        close()
    }

    const onChangeAmount = (e) => {
        const amount = e.currentTarget.value;
        const amountEntered = amount.trim().length === 0 ? 0 : Number.parseFloat(amount)
        if (amountEntered < 100) {
            setAmountError(true)
        } else setAmountError(false)
        setAmount(amount)
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
                                    formatCurrency(100)
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
                                <span className='inputError'>*please input an amount equal to or greater than 100 naira</span>
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
                </>
            }
        </>
    )
}

export default FundWalletComponent;
