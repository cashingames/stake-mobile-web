import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyEmailOTP } from '../AuthSlice';
import { unwrapResult } from "@reduxjs/toolkit";
import InputOTP from "../../../components/InputOTP/InputOTP";
import VerifyEmailText from "../../../components/VerifyEmailText/VerifyEmailText";
import Dialogue from '../../../components/Dialogue/Dialogue'
import './EmailVerification.scss'


const EmailVerification = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [otpValues, setOtpValues] = useState(new Array(5).fill(''))
    const [canLogin, setCanLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [openDialogue, setOpenDialogue] = useState(false);
    const [alertMessage, setAlert] = useState('');
    const otpScreenText = 'To verify your account, please input the One Time Password sent to your email.';

    const closeAlert = () => {
        setOpenDialogue(false)
        navigate('/dashboard')
    }

    const changeValue = (e, index) => {
        setOtpValues([...otpValues.map((d, i) => {
            return i === index ? e.value : d
        })])
        if (e.value && e.nextSibling) {
            e.nextSibling.focus()
        }
    }

    const otpToken = otpValues.join('')
    useEffect(() => {
        if (otpToken.length < 5) {
            setCanLogin(false)
            return;
        }
        setCanLogin(true);
    }, [otpToken])

    const goToDashboard = () => {
        setLoading(true);
        dispatch(verifyEmailOTP({
            token: otpToken
        }))
            .then(unwrapResult)
            setOpenDialogue(true)
            setAlert('Email successfully verifed!')
        setLoading(false)
            .catch((rejectedValueOrSerializedError) => {
                setOpenDialogue(true)
                setAlert(rejectedValueOrSerializedError);
                setLoading(false);
            })
    }


    return (
        <div className="verification__email-container">
            <VerifyEmailText text={otpScreenText} />
            <InputOTP otpValues={otpValues} changeValue={changeValue} />
            <button className='button-container' disabled={!canLogin || loading} type='submit' onClick={goToDashboard}>
                <span className='button-text'>{loading ? "Verifying" : "Login"}</span>
            </button>
            <Dialogue open={openDialogue} handleClose={closeAlert} dialogueMessage={alertMessage} />
        </div>
    )
}
export default EmailVerification