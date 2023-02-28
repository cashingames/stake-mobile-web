import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ResendPhoneOtp, verifyPhoneOtp, setToken, saveToken } from '../AuthSlice';
import { calculateTimeRemaining } from "../../../utils/utils";
import './VerifyRegistrationOtp.scss'
import { unwrapResult } from "@reduxjs/toolkit";
import ResendOtp from "../../../components/ResendOtp/ResendOtp";
import firebaseConfig from "../../../firebaseConfig";
import { logEvent } from "firebase/analytics";
import InputOTP from "../../../components/InputOTP/InputOTP";
import VerifyEmailText from "../../../components/VerifyEmailText/VerifyEmailText";
// import ReactGA from 'react-ga';


const VerifyRegistrationOtp = () => {
    const analytics = firebaseConfig();
    
    const dispatch = useDispatch();
    const location = useLocation();
    const [otpValues, setOtpValues] = useState(new Array(5).fill(''))
    const [counter, setCounter] = useState('');
    const [isCountdownInProgress, setIsCountdownInProgress] = useState(true);
    const [canLogin, setCanLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const otpScreenText = 'To verify your account, please input the One Time Password sent to your phone.';


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

    const verify = () => {
        setLoading(true);
        dispatch(verifyPhoneOtp({
            phone_number: location.state.phone_number,
            token: otpToken
        }))

            .then(unwrapResult)
            .then(response => {
                saveToken(response.data)
                logEvent(analytics, "verification_registratiion_phone_number_success", {
                    'id': location.state.username,
                    'phone_number': location.state.phone_number
                });
                logEvent(analytics, "verified_user", {
                    'id': location.state.username,
                    'phone_number': location.state.phone_number
                });
                dispatch(setToken(response.data))
            })
            .catch((rejectedValueOrSerializedError) => {
                alert("Failed to log in, please input the correct code");
                logEvent(analytics, "verified_user_error", {
                    'id': location.state.username,
                    'phone_number': location.state.phone_number
                });
                setLoading(false);
            })
    }


    return (
        <div className="verification__phone-container">
            <VerifyEmailText text={otpScreenText}/>
            <InputOTP otpValues={otpValues} changeValue={changeValue} />
            <ResendOtp onPress={resendButton} counter={counter} isCountdownInProgress={isCountdownInProgress} />
            <button className='button-container' disabled={!canLogin || loading} type='submit' onClick={verify}>
                <span className='button-text'>{loading ? "Verifying..." : "Verify"}</span>
            </button>
        </div>
    )
}
export default VerifyRegistrationOtp