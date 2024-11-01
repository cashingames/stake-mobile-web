import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import AnonymousRouteHeader from "../../../components/AnonymousRouteHeader/AnonymousRouteHeader";
import { resendPasswordOtp, setUserPhone } from '../AuthSlice';
import ResendOtp from "../../../components/ResendOtp/ResendOtp";
import { setUserPasswordResetToken, verifyOtp } from "../AuthSlice";
import './VerifyOtp.scss'
import { calculateTimeRemaining } from "../../../utils/utils";
import { IoChevronForward } from "react-icons/io5";


const VerifyOtp = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [otpValues, setOtpValues] = useState(new Array(5).fill(''))
    const [canSubmit, setCanSubmit] = useState(false)
    const [counter, setCounter] = useState('');
    const [isCountdownInProgress, setIsCountdownInProgress] = useState(true);
    const [countdownDone, setCountdownDone] = (useState(false));
    const [error, setError] = useState('');
    const location = useLocation()
    const token = otpValues.join('');
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const onComplete = () => {
            clearInterval(countDown);
            setIsCountdownInProgress(false)
        }
        let nextResendMinutes = 5;

        const futureDateStamp = new Date()
        futureDateStamp.setMinutes(futureDateStamp.getMinutes() + nextResendMinutes)

        const futureDate = futureDateStamp.getTime()

        const countDown = setInterval(() => {

            const timeString = calculateTimeRemaining(futureDate, onComplete);
            setCounter(timeString);
        }, 1000);

        return () => clearInterval(countDown);

    }, [])



    const changeValue = (e, index) => {
        setOtpValues([...otpValues.map((d, i) => {
            return i === index ? e.value : d
        })])

        if (e.value && e.nextSibling) {
            e.nextSibling.focus()
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setCanSubmit(false);
        setError('')
        dispatch(setUserPasswordResetToken(token));
        dispatch(setUserPhone(location.state.phone));
        dispatch(verifyOtp({ token })).then(unwrapResult)
            .then((originalPromiseResult) => {
                setCanSubmit(true);
                navigate('/reset-password');
            })
            .catch((rejectedValueOrSerializedError) => {
                setCanSubmit(true);
                setAlertMessage('')
                setError("Invalid authentication code provided");
                setOtpValues(new Array(5).fill(''));
            })
    }

    const resendButton = () => {
        dispatch(resendPasswordOtp({
            phone_number: location.state.phone
        }))
        setCountdownDone(true);
        setOtpValues(new Array(5).fill(''));
        setError('');
        setAlertMessage('Otp resent successfully');
    }

    useEffect(() => {
        if (token.length < 5) {
            setCanSubmit(false)
            return;
        }
        setCanSubmit(true);

    }, [token])

    const navigateHandler = () => {
        navigate('/login');
    }
    return (
        <>
            <div className='password-container'>
                <AnonymousRouteHeader title='OTP Verification' isClose={true} styleProp='verify-header' onClick={navigateHandler} />
                {error.length > 0 &&
                    <div className='error-container'>
                        <span className='input-error'>{error}</span>
                    </div>
                }
                {alertMessage.length > 0 &&
                    <div className='alert-container'>
                        <span className='input-error'>{alertMessage}</span>
                    </div>
                }
                <p className='text'>Enter Otp code</p>
                <form className='otp-form' onSubmit={handleSubmit}>
                    <div>
                        {otpValues.map((data, index) => {
                            return (
                                <input
                                    className='otp-input'
                                    name='otpValues'
                                    key={index}
                                    value={data}
                                    maxLength={1}
                                    onChange={(e) => changeValue(e.target, index)}
                                />
                            )
                        })}
                    </div>
                    <div className="expire-container">
                        <p className="digit-text">Enter 5 digit OTP Code</p>
                        {isCountdownInProgress &&
                            <p className='digit-text'>Expires in {counter}</p>
                        }
                    </div>
                    <button className='button-container' disabled={!canSubmit} type='submit'>
                        <span className='buttonText'>Verify Otp</span>
                    </button>
                </form>
                <ResendOtp onPress={resendButton} countdowvnDone={countdownDone} isCountdownInProgress={isCountdownInProgress} />
                <a href='https://wa.me/2348025116306' className='whatsapp-chat'>
                    <img width="50px" height="50px" src="/images/whatsapp-icon.png" alt="logo" className="social-img" />
                    <div className='text-container'>
                        <div className='header-container'>
                            <span className='header'>OTP Verification Help</span>
                            <IoChevronForward color='#1C453B' />
                        </div>
                        <span className='whatsapp-title'>Live chat with support on Whatsapp</span>
                    </div>
                </a>
            </div>

        </>
    )
}

export default VerifyOtp