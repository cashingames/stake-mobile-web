import React from 'react';
import './WithdrawalSuccessful.scss'
import { useNavigate } from 'react-router-dom';


const WithdrawalSuccessful = () => {
    const navigate = useNavigate();

    const returnToWallet = () => {
        navigate('/dashboard');

    }
    return (
        <div style={{ backgroundImage: "url(/images/success-background.png)" }} className="withdrawal-successful">
            <div className='success-container'>
                <img src='/images/success-mark.png' alt='flutterwave' className='gateway-icon' />
                <p className='success-text'>Withdrawal successful</p>
            </div>
            <button className='button-container' onClick={returnToWallet}>
                <span className='buttonText'>Okay, got it</span>
            </button>
        </ div>
    )
}
export default WithdrawalSuccessful;