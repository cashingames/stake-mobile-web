import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AnonymousRouteHeader from "../../../components/AnonymousRouteHeader/AnonymousRouteHeader";
import { resetPassword } from "../AuthSlice";
import './ResetPassword.scss'

const ResetPassword = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [canSubmit, setCanSubmit] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [passErr, setPassError] = useState(false);
    const [confirmPassErr, setConfirmPassError] = useState(false);
    const phone = useSelector(state => state.auth.passwordReset.userPhone);
    const code = useSelector(state => state.auth.passwordReset.userCode);
    const [alertMessage, setAlertMessage] = useState('');


    const onChangePassword = (e) => {
        const password = e.currentTarget.value;
        password.length > 0 && password.length < 8 ? setPassError(true) : setPassError(false)
        setPassword(password)
    }
    const onChangeConfirmPassword = (e) => {
        const confirmPassword = e.currentTarget.value;
        confirmPassword.length > 0 && confirmPassword.length < 8 ? setConfirmPassError(true) : setConfirmPassError(false);
        setConfirmPassword(confirmPassword)
    }

    useEffect(() => {
        const invalid = passErr || confirmPassErr || password === '' || confirmPassword === '' || confirmPassword !== password;
        setCanSubmit(!invalid);
        setError('');
    }, [passErr, confirmPassErr, password, confirmPassword])

    const onSend = async () => {
        setLoading(true);
        setCanSubmit(false);
        setError('');

        dispatch(resetPassword({ password, phone, code, password_confirmation: password }))
            .then(unwrapResult)
            .then((originalPromiseResult) => {
                setLoading(false);
                setCanSubmit(true);
                setError('');
                setAlertMessage('Password reset successful')
                navigate('/login');
            })
            .catch((rejectedValueOrSerializedError) => {
                setAlertMessage('')
                setError("Password reset failed, try again");
                setLoading(false);
            })
    }

    const navigateHandler = () => {
        navigate('/login');
    }


    return (
        <>
            <div className='password-container' >
                <AnonymousRouteHeader title='Update your password' isClose={true} styleProp='reset-header' onClick={navigateHandler} />
                <div>
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
                    <div className='inputs-container'>
                        <div className='input-container'>
                            <div className='label-container'>
                                <label htmlFor='password' className='input-label'>Enter new password</label>
                                {password.length > 0 && <span className='show'
                                    onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>}
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => onChangePassword(e)}
                                className={passErr ? 'password-inputi' : 'password-input'}
                                placeholder="Password must not be less than 8 digits"
                            />
                            {passErr &&
                                <span className='inputError'>*password must not be less than eight(8) characters</span>
                            }
                        </div>

                        <div className='input-container'>
                            <div className='label-container'>
                                <label htmlFor='confirmPassword' className='input-label'>Confirm password</label>
                                {confirmPassword.length > 0 && <span className='show'
                                    onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>}
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={e => onChangeConfirmPassword(e)}
                                className={confirmPassErr ? 'password-inputi' : 'password-input'}
                                placeholder="Password must not be less than 8 digits"
                            />
                            {confirmPassErr &&
                                <span className='inputError'>*passwords must match</span>
                            }
                        </div>
                    </div>
                    <button onClick={() => onSend()} className='btn' disabled={!canSubmit}>{loading ? 'Updating...' : 'Update password'}</button>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;