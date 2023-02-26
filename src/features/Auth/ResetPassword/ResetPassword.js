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
    const [password, setPassword] = useState('')
    const [canSubmit, setCanSubmit] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [passErr, setPassError] = useState(false);
    const phone = useSelector(state => state.auth.passwordReset.userPhone);
    const code = useSelector(state => state.auth.passwordReset.userCode);

    console.log(code);
    const onChangePassword = (e) => {
        const password = e.currentTarget.value;
        password.length > 0 && password.length < 8 ? setPassError(true) : setPassError(false)
        setPassword(password)
    }

    useEffect(() => {
        const invalid = passErr
        setCanSubmit(!invalid);
        setError('');
    }, [passErr])

    const onSend = async () => {
        setLoading(true);
        setCanSubmit(false);
        setError('');

        dispatch(resetPassword({ password, phone, code, password_confirmation: password }))
            .then(unwrapResult)
            .then((originalPromiseResult) => {
                setLoading(false);
                setCanSubmit(true);
                alert('Password reset successful')
                navigate('/');
            })
            .catch((rejectedValueOrSerializedError) => {
                setError("Password reset failed, try again");
                setLoading(false);
            })
    }



    return (
        <>
            <AnonymousRouteHeader title='Reset Password' />
            <div className='passwordContainer'>
                <p className='text'>Enter your new password below</p>
                <div>
                    {error.length > 0 &&
                        <span className="errorBox">{error}</span>
                    }
                    <div className='inputContainer'>
                        <label htmlFor="password" className='label'>Enter New Password</label>
                        <div className="passInput">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => onChangePassword(e)}
                                className='passwordInput'
                            />
                            {password.length > 0 && <span className='show'
                                onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>}
                        </div>
                        {passErr &&
                                <span className='inputError'>*password must not be less than eight(8) characters</span>
                            }


                    </div>
                    <button onClick={() => onSend()} className='btn' disabled={!canSubmit}>{loading ? 'Sending...' : 'Set New Password'}</button>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;