import {unwrapResult} from "@reduxjs/toolkit";
import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import AnonymousRouteHeader from "../../../components/AnonymousRouteHeader/AnonymousRouteHeader";
import {verifyAccount} from "../AuthSlice";
import './ForgotPassword.scss'

const ForgotPassword = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [canSend, setCanSend] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');

    const onChangeEmail = (e) => {
        const email = e.currentTarget.value;
        // eslint-disable-next-line
        const rule = /^([a-zA-Z0-9_/\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; /* eslint-disable-line */
        setEmailError(! rule.test(email))
        setEmail(email)

    };

    useEffect(() => {
        const invalid = emailError || email === ''
        setCanSend(! invalid);
        setError('');
    }, [email, emailError])

    const onSend = async () => {
        setLoading(true);
        setCanSend(false);
        setError('');

        dispatch(verifyAccount({email})).then(unwrapResult).then((originalPromiseResult) => {
            setLoading(false);
            setCanSend(true);
            navigate('/verify-otp', {
                state: {
                    email: email
                }
            });
        }).catch((rejectedValueOrSerializedError) => {
            setLoading(false);
            setCanSend(true);
            setError("Please Use Registered Email Address");
        })

    }


    return (
        <>
            <AnonymousRouteHeader title='Forgot Password' styleProp='passwordHeader'/>
            <div className='passwordContainers'>
                <p className='text'>Enter your email below to enable us verify you are whom you say you are</p>
                <div> {
                    error.length > 0 && <span className="errorBox">
                        {error}</span>
                }
                    <div className='inputContainer'>
                        <label htmlFor="email" className='labels'>Email</label>
                        <input type='text' placeholder="johndoe or johndoe@example.com"
                            value={email}
                            className='email'
                            onChange={
                                e => onChangeEmail(e)
                            }
                            required/> {
                        emailError && <span className='inputError'>*invalid email address</span>
                    } </div>
                    <button onClick={
                            () => onSend()
                        }
                        className='btn'
                        disabled={
                            !canSend
                    }>
                        {
                        loading ? 'Sending...' : 'GET OTP'
                    } </button>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;
