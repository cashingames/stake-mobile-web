import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';
import { logEvent } from 'firebase/analytics';
import { IoCheckmarkCircle, IoEllipseOutline } from 'react-icons/io5';
import './FundWalletScreen.scss'
import AnonymousRouteHeader from '../../components/AnonymousRouteHeader/AnonymousRouteHeader'
import { getUser } from '../Auth/AuthSlice';
import firebaseConfig from '../../firebaseConfig';
import { formatCurrency } from '../../utils/stringUtl';

function FundWalletScreen() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const analytics = firebaseConfig();
    const [showPayment, setShowPayment] = useState(false);
    const [flutterChecked, setFlutterChecked] = useState(false);
    const [amount, setAmount] = useState(0)
    const user = useSelector((state) => state.auth.user);
    const [canSend, setCanSend] = useState(true);
    const [amountErr, setAmountError] = useState(false);
    const [paystackChecked, setPaystackChecked] = useState(false);




    const onClose = () => {
        dispatch(getUser());
        setShowPayment(false);
        alert("Failed...");
        navigate('/wallet');
    };
    const config = {
        email: user.email,
        amount: Number.parseFloat(amount * 100),
        publicKey: process.env.REACT_APP_PAYSTACK_KEY,
    };
    const initializePayment = usePaystackPayment(config);

    const onSuccess = () => {
        logEvent(analytics, 'wallet_funding_successfully', {
            'product_id': user.username,
            'item_name': 'Wallet Funding',
            'phone_number': user.phoneNumber,
            'email': user.email,
            'currency': 'NGN',
            'value': formatCurrency(amount),
        });
        dispatch(getUser());
        setShowPayment(false);
        navigate('/wallet');
    }

    useEffect(() => {
        const invalid = amountErr || amount === 0;
        setCanSend(!invalid);
    }, [amount, amountErr])
    return (
        <div className='main-fund'>
            <div className='fund-wallet-screen'>
                <AnonymousRouteHeader title='Deposit' styleProp='password-header' noClose={true} />
                <FundWallet setAmount={setAmount} amount={amount} showPayment={showPayment}
                    setAmountError={setAmountError} amountErr={amountErr} paystackChecked={paystackChecked}
                    setPaystackChecked={setPaystackChecked} flutterChecked={flutterChecked} setFlutterChecked={setFlutterChecked} />
            </div>
            <div className='fund-button-container'>
                <button className='actionBtnContainer'
                    disabled={(!paystackChecked && !flutterChecked) || !canSend}
                    onClick={() => {
                        initializePayment(onSuccess, onClose)
                    }}
                >
                    <p className='text'>Fund Wallet</p>
                </button>
            </div>
        </ div>
    )
}

const FundWallet = ({ amount, setAmount, showPayment, setAmountError, amountErr,
    paystackChecked, setPaystackChecked, flutterChecked, setFlutterChecked }) => {
    const minimumWalletFundableAmount = useSelector(state => state.common.minimumWalletFundableAmount);


    const onChangeAmount = (e) => {
        const amount = e.currentTarget.value;
        const amountEntered = amount.trim().length === 0 ? 0 : Number.parseFloat(amount)
        if (amountEntered < minimumWalletFundableAmount) {
            setAmountError(true)
        } else setAmountError(false)
        setAmount(amount)``
    }


    const togglePaystack = () => {
        setFlutterChecked(false);
        setPaystackChecked(true);
    }

    const toggleFlutter = () => {
        setPaystackChecked(false);
        setFlutterChecked(false);
        alert('This payment gateway is not available now')
    }




    return (
        <>
            {!showPayment &&

                <div className='fund-Container'>
                    <div className='input-container'>
                        <div className='label-container'>
                            <label htmlFor='amount' className='input-label'>Enter amount</label>
                            <p className='required-text'>Required</p>
                        </div>
                        <input
                            placeholder={`Minimum of NGN ${minimumWalletFundableAmount}`}
                            type='number'
                            id='amount'
                            value={amount}
                            className={amountErr ? 'input-boxi' : 'input-box'}
                            autoFocus={true}
                            onChange={e => onChangeAmount(e)}
                            required
                        />
                        {amountErr &&
                            <span className='input-error'>*Minimum fundable amount is NGN {minimumWalletFundableAmount}</span>
                        }
                    </div>
                    <div className='gateways-container'>
                        <div className='label-container'>
                            <p className='gateway-header-text'>Choose gateway</p>
                            <p className='required-text'>Required</p>
                        </div>
                        <p className='gateway-sub-header'>Select a preferred gateway to fund wallet</p>
                        <div className='main-gateway-container'>
                            <div onClick={togglePaystack} className='gateway-container'>
                                <span onClick={() => setPaystackChecked(!paystackChecked)}>{paystackChecked ? <IoCheckmarkCircle size={26} color='#00FFA3' /> : <IoEllipseOutline size={26} color='#D9D9D9'
                                />}</span>
                                <img src='/images/paystack-icon.png' alt='paystack' className='gateway-icon' />

                            </div>
                            <div onClick={toggleFlutter} className='gateway-container'>
                                <span onClick={() => setFlutterChecked(!flutterChecked)}>{flutterChecked ? <IoCheckmarkCircle size={26} color='#00FFA3' /> : <IoEllipseOutline size={26} color='#D9D9D9'
                                />}</span>
                                <img src='/images/flutter-icon.png' alt='flutterwave' className='gateway-icon' />
                            </div>
                        </div>
                    </div>
                    {/* {open &&
                        <div className='dialog'>
                            <Dialogue open={open} handleClose={handleClose} />
                        </div>
                    } */}
                </div>
            }
        </>
    )
}

export default FundWalletScreen
