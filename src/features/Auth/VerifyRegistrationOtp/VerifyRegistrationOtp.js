import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ResendPhoneOtp, verifyPhoneOtp, setToken, saveToken } from '../AuthSlice';
import { calculateTimeRemaining } from "../../../utils/utils";
import './VerifyRegistrationOtp.scss'
import { unwrapResult } from "@reduxjs/toolkit";


const VerifyRegistrationOtp = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    // console.log(location)
    let navigate = useNavigate();
    const [firstDigit, setFirstDigit] = useState('');
    const [secondDigit, setSecondDigit] = useState('');
    const [thirdDigit, setThirdDigit] = useState('');
    const [fourthDigit, setFourthDigit] = useState('');
    const [fifthDigit, setFifthDigit] = useState('');
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

    }, )

    useEffect(() => {
        const invalid = firstDigit === '' || secondDigit === '' || thirdDigit === '' 
        || fourthDigit === '' || fifthDigit === '';
        setCanLogin(!invalid)
    }, [firstDigit, secondDigit,thirdDigit,fourthDigit,fifthDigit])

    const resendButton = () => {
        // console.log('otp resent')
        dispatch(ResendPhoneOtp({
            username: location.state.username
        }))
        setIsCountdownInProgress(true)
    }

    const onChangeFirstDigit = (e) => {
        const firstDigit = e.currentTarget.value;
        setFirstDigit(firstDigit)
    }

    const onChangeSecondDigit = (e) => {
        const secondDigit = e.currentTarget.value;
        setSecondDigit(secondDigit)
    }
    const onChangeThirdDigit = (e) => {
        const thirdDigit = e.currentTarget.value;
        setThirdDigit(thirdDigit)
    }
    const onChangeFourthDigit = (e) => {
        const fourthDigit = e.currentTarget.value;
        setFourthDigit(fourthDigit)
    }
    const onChangeFifthDigit = (e) => {
        const fifthDigit = e.currentTarget.value;
        setFifthDigit(fifthDigit)
    }

    const goToDashboard = () => {
        setLoading(true);
        dispatch(verifyPhoneOtp({
            phone_number: location.state.phone_number,
            token: `${firstDigit}${secondDigit}${thirdDigit}${fourthDigit}${fifthDigit}`
        }))
            // console.log("token phone", token)

            .then(unwrapResult)
            .then(response => {
                // console.log("phone verification response", response.data);
                saveToken(response.data)
                dispatch(setToken(response.data))
                setLoading(false);
                navigate('/dashboard')
            })
            .catch((rejectedValueOrSerializedError) => {
                // console.log(rejectedValueOrSerializedError)
                alert("Failed to log in, please input the correct code");
                setLoading(false);
            })
    }


    return (
        <div className="verifyRegistrationOtp-container">
            <VerifyEmailText />
            <InputOtp firstDigit={firstDigit} setFirstDigit={onChangeFirstDigit}
                secondDigit={secondDigit} setSecondDigit={onChangeSecondDigit}
                thirdDigit={thirdDigit} setThirdDigit={onChangeThirdDigit}
                fourthDigit={fourthDigit} setFourthDigit={onChangeFourthDigit}
                fifthDigit={fifthDigit} setFifthDigit={onChangeFifthDigit}
                onPress={resendButton} counter={counter}
                isCountdownInProgress={isCountdownInProgress}
            />
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
                A One Time Password(OTP) has been sent to your phone number.
                Please input the five(5) digit
                number below to verify your phone number so you
                can play exicting games and stand a chance to win lots of prizes
            </p>
        </div>
    )
}

const InputOtp = ({ firstDigit, setFirstDigit,
    secondDigit, setSecondDigit,
    thirdDigit, setThirdDigit,
    fourthDigit, setFourthDigit,
    fifthDigit, setFifthDigit,
    onPress, counter, isCountdownInProgress
}) => {
    return (
        <div className="otpContainer">
            <div className="inputContainer">
                <input
                    type='number'
                    value={firstDigit}
                    onChange={setFirstDigit}
                    maxLength={1}
                    className='input'
                />
                <input
                    type='number'
                    value={secondDigit}
                    onChange={setSecondDigit}
                    maxLength={1}
                    className='input'
                />
                <input
                    type='number'
                    value={thirdDigit}
                    onChange={setThirdDigit}
                    maxLength={1}
                    className='input'
                />
                <input
                    type='number'
                    value={fourthDigit}
                    onChange={setFourthDigit}
                    maxLength={1}
                    className='input'
                />
                <input
                    type='number'
                    value={fifthDigit}
                    onChange={setFifthDigit}
                    maxLength={1}
                    className='input'
                />
            </div>
            <ResendOtp onPress={onPress} counter={counter} isCountdownInProgress={isCountdownInProgress} />
        </div>
    )
}

const ResendOtp = ({ onPress, counter, isCountdownInProgress }) => {


    return (
        <div className="resendOtpText">
            {isCountdownInProgress &&
                <div className="resendTimerContainer">
                    <span className="statusText">Resend OTP in </span>
                    <span className="resendTimer">{counter}</span>
                </div>
            }
            {!isCountdownInProgress &&
                <button onClick={onPress} className='resendOtpButton'>
                    <p className="resendText">
                        Resend OTP
                    </p>
                </button>
            }
        </div>
    )
}

export default VerifyRegistrationOtp