import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyPhoneOtp, setToken, saveToken, resendPhoneOtp } from '../AuthSlice';
import { calculateTimeRemaining } from "../../../utils/utils";
import './VerifyRegistrationOtp.scss'
import { unwrapResult } from "@reduxjs/toolkit";
import ResendOtp from "../../../components/ResendOtp/ResendOtp";
import firebaseConfig from "../../../firebaseConfig";
import { logEvent } from "firebase/analytics";
import InputOTP from "../../../components/InputOTP/InputOTP";
import AnonymousRouteHeader from "../../../components/AnonymousRouteHeader/AnonymousRouteHeader";
import { IoChevronForward } from "react-icons/io5";
import Dialogue from '../../../components/Dialogue/Dialogue'
// import ReactGA from 'react-ga';


const VerifyRegistrationOtp = () => {
    const analytics = firebaseConfig();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [otpValues, setOtpValues] = useState(new Array(5).fill(''))
    const [counter, setCounter] = useState('');
    const [countdownDone, setCountdownDone] = (useState(false));
    const [isCountdownInProgress, setIsCountdownInProgress] = useState(true);
    const [canLogin, setCanLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState('');


    useEffect(() => {
        const onComplete = () => {
            clearInterval(countDown);
            setIsCountdownInProgress(false)
        }
        let nextResendMinutes = 5;

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
    const closeAlert = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (otpToken.length < 5) {
            setCanLogin(false)
            return;
        }
        setCanLogin(true);
    }, [otpToken])

    const resendButton = () => {
        dispatch(resendPhoneOtp({
            username: location.state.username
        }))
        setCountdownDone(true)
        setOtpValues(new Array(5).fill(''));
        setOpen(true)
        setAlertMessage('Otp resent successfully')
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
                setOtpValues(new Array(5).fill(''));
                setAlertMessage("Your passcode is not correct");
                logEvent(analytics, "verified_user_error", {
                    'id': location.state.username,
                    'phone_number': location.state.phone_number
                });
                setLoading(false);
            })
    }

    const navigateHandler = () => {
        navigate('/login');
    }


    return (
        <div className="verification-phone-container">
            <AnonymousRouteHeader title='OTP Verification' isClose={true} styleProp='verify-header' onClick={navigateHandler} />
            <p className='text'>Enter Otp code</p>
            <InputOTP otpValues={otpValues} changeValue={changeValue} />
            <div className="expire-container">
                <p className="digit-text">Enter 5 digit OTP Code</p>
                {isCountdownInProgress &&
                    <p className='digit-text'>Expires in {counter}</p>
                }
            </div>
         
            <button className='button-container' disabled={!canLogin || loading} type='submit' onClick={verify}>
                <span className='buttonText'>{loading ? 'Verifying...' : 'Login'}</span>
            </button>
            <ResendOtp onPress={resendButton} countdownDone={countdownDone} isCountdownInProgress={isCountdownInProgress} />
            <a href='https://wa.me/2348025116306' className='whatsapp-chat'>
                <img width="50px" height="50px" src="/images/whatsapp-icon.png" alt="logo" className="social-img" />
                <div className='text-container'>
                    <div className='header-container'>
                        <span className='header'>Contact Support</span>
                        <IoChevronForward color='#072169' />
                    </div>
                    <span className='whatsapp-title'>Live chat with support on Whatsapp</span>
                </div>
            </a>
            <Dialogue open={open} handleClose={closeAlert} dialogueMessage={alertMessage} />

        </div>
    )
}
export default VerifyRegistrationOtp