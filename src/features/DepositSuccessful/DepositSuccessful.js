import React from 'react';
import './DepositSuccessful.scss'
import { useNavigate } from 'react-router-dom';


const DepositSuccessful = () => {
    const navigate = useNavigate();

    const returnToWallet = () => {
        navigate('/wallet');

    }
    return (
        <div style={{ backgroundImage: "url(/images/success-background.png)" }} className="deposit-successful">
            <div className='success-container'>
                <img src='/images/success-mark.png' alt='flutterwave' className='gateway-icon' />
                <p className='success-text'>Deposit successful</p>
            </div>
            <button className='button-container' onClick={returnToWallet}>
                <span className='buttonText'>Login to account</span>
            </button>
        </ div>
    )
}
export default DepositSuccessful;