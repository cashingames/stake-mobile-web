import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AnonymousRouteHeader from "../../../components/AnonymousRouteHeader/AnonymousRouteHeader";
import AuthTitle from '../../../components/AuthTitle/AuthTitle';
import { setUserPasswordResetToken, verifyOtp } from "../AuthSlice";
import './VerifyOtp.scss'

const VerifyOtp = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [otpValues, setOtpValues] = useState(new Array(5).fill(''))
    const [canSubmit, setCanSubmit] = useState(false)
    const [error, setError] = useState('');

    const token = otpValues.join('')

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
        console.log(token)
        setCanSubmit(false);
        setError('')
        dispatch(setUserPasswordResetToken(token));
        dispatch(verifyOtp({ token })).then(unwrapResult)
            .then((originalPromiseResult) => {
                setCanSubmit(true);
                console.log(originalPromiseResult, 'done')
                navigate('/reset-password');
            })
            .catch((rejectedValueOrSerializedError) => {
                setCanSubmit(true);
                setError("Your passcode is not correct");
            })
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
            <AnonymousRouteHeader title='Verify Otp' />
            <div className='passwordContainer'>
                <AuthTitle titleText='Verify OTP' />
                <p className='text'>Enter the One-time passcode we sent to the email you provided</p>
                <form className='otpForm' onSubmit={handleSubmit}>
                    {error.length > 0 &&
                        <span className="errorBox">{error}</span>
                    }
                    <div>
                        {otpValues.map((data, index) => {
                            return (
                                <input
                                    className='otpInput'
                                    name='otpValues'
                                    key={index}
                                    value={data}
                                    maxLength={1}
                                    onChange={(e) => changeValue(e.target, index)}
                                />
                            )
                        })}
                    </div>
                    <button className='btn' type='submit' disabled={!canSubmit}> Continue</button>
                </form>
            </div>ß
        </>
    )
}

export default VerifyOtp