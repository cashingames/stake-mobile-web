import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ResendPhoneOtp, verifyPhoneOtp, setToken, saveToken } from '../AuthSlice';
import { calculateTimeRemaining } from "../../../utils/utils";
import './VerifyRegistrationOtp.scss'
import { unwrapResult } from "@reduxjs/toolkit";
import ResendOtp from "../../../components/ResendOtp/ResendOtp";
import ReactGA from 'react-ga';


const VerifyRegistrationOtp = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    let navigate = useNavigate();
    const [otpValues, setOtpValues] = useState(new Array(5).fill(''))
    const [counter, setCounter] = useState('');
    const [isCountdownInProgress, setIsCountdownInProgress] = useState(true);
    const [canLogin, setCanLogin] = useState(true);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const onComplete = () => {
            clearInterval(countDown);
            setIsCountdownInProgress(false)
        }
        let nextResendMinutes = location.state.next_resend_minutes;

        const futureDate = new Date()
        futureDate.setMinutes(futureDate.getMinutes() + nextResendMinutes)

        const countDown = setInterval(() => {

            const timeString = calculateTimeRemaining(futureDate.getTime(), onComplete);
            setCounter(timeString);
        }, 1000);

        return () => clearInterval(countDown);
        // eslint-disable-next-line 
    }, [])

    const otpToken = otpValues.join('')

    const changeValue = (e, index) => {
        setOtpValues([...otpValues.map((d, i) => {
            return i === index ? e.value : d
        })])
        if (e.value && e.nextSibling) {
            e.nextSibling.focus()
        }
    }

    useEffect(() => {
        if (otpToken.length < 5) {
            setCanLogin(false)
            return;
        }
        setCanLogin(true);
    }, [otpToken])

    const resendButton = () => {
        dispatch(ResendPhoneOtp({
            username: location.state.username
        }))
        setIsCountdownInProgress(true)
    }

    const goToDashboard = () => {
        setLoading(true);
        dispatch(verifyPhoneOtp({
            phone_number: location.state.phone_number,
            token: otpToken
        }))

            .then(unwrapResult)
            .then(response => {
                saveToken(response.data)
                dispatch(setToken(response.data))
                ReactGA.event({
                    category: 'Authentication',
                    action: 'Sign up successful'
                });
                setLoading(false);
                navigate('/dashboard')
            })
            .catch((rejectedValueOrSerializedError) => {
                alert("Failed to log in, please input the correct code");
                ReactGA.exception({
                    description: 'An error ocurred',
                    fatal: true
                });
                setLoading(false);
            })
    }


    return (
        <div className="verifyRegistrationOtp-container">
            <VerifyEmailText />
            <form className="otpForm">
                {otpValues.map((data, index) => {
                    return (
                        <input
                            key={index}
                            value={data}
                            maxLength={1}
                            onChange={(e) => changeValue(e.target, index)}
                            className='otpInput' />
                    )
                })}
            </form>
            <ResendOtp onPress={resendButton} counter={counter} isCountdownInProgress={isCountdownInProgress} />
            <button className='buttonContainer' disabled={!canLogin || loading} type='submit' onClick={goToDashboard}>
                <span className='buttonText'>{loading ? "Verifying" : "Login"}</span>
            </button>
        </div>
    )
}

const VerifyEmailText = () => {
    return (
        <div className="verifyText">
            <h1 className="verifyHeadText">
                Good job, you are almost there
            </h1>
            <p className="verifySubText">
                To verify your account, please input the One Time Password sent to your phone number.
            </p>
        </div>
    )
}


export default VerifyRegistrationOtp