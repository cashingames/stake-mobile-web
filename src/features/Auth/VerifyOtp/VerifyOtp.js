import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import AnonymousRouteHeader from "../../../components/AnonymousRouteHeader/AnonymousRouteHeader";
import { setUserPhone, verifyAccount } from '../AuthSlice';
import ResendOtp from "../../../components/ResendOtp/ResendOtp";
import { setUserPasswordResetToken, verifyOtp } from "../AuthSlice";
import './VerifyOtp.scss'
import { calculateTimeRemaining } from "../../../utils/utils";

const VerifyOtp = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [otpValues, setOtpValues] = useState(new Array(5).fill(''))
    const [canSubmit, setCanSubmit] = useState(false)
    const [counter, setCounter] = useState('');
    const [isCountdownInProgress, setIsCountdownInProgress] = useState(true);
    const [error, setError] = useState('');

    const location = useLocation()
    const token = otpValues.join('')





    useEffect(() => {
        const onComplete = () => {
            clearInterval(countDown);
            setIsCountdownInProgress(false)
        }
        let nextResendMinutes = 2;

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
                setError("Your passcode is not correct");
            })
    }

    const resendButton = () => {
        dispatch(verifyAccount({
            phone_number: location.state.phone
        }))
        setIsCountdownInProgress(true)
    }

    useEffect(() => {
        if (token.length < 5) {
            setCanSubmit(false)
            return;
        }
        setCanSubmit(true);

    }, [token])


    return (
        <>
            <div className='password-container'>
                <AnonymousRouteHeader title='OTP Verification' isClose={true} styleProp='verify-header' />
                <p className='text'>Enter Otp code</p>
                <form className='otp-form' onSubmit={handleSubmit}>
                    {error.length > 0 &&
                        <span className="error-box">{error}</span>
                    }
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
                    </div>
                    <button className='button-container' disabled={!canSubmit} type='submit'>
                        <span className='buttonText'>Continue</span>
                    </button>
                </form>
                <ResendOtp onPress={resendButton} counter={counter} isCountdownInProgress={isCountdownInProgress} />
            </div>

        </>
    )
}

export default VerifyOtp