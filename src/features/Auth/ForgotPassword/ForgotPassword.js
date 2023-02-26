import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AnonymousRouteHeader from "../../../components/AnonymousRouteHeader/AnonymousRouteHeader";
import { verifyAccount } from "../AuthSlice";
import './ForgotPassword.scss'

const ForgotPassword = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [phoneErr, setPhoneError] = useState(false);
    const [countryCodeErr, setCountryCodeError] = useState(false);
    const [canSend, setCanSend] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [countryCode, setCountryCode] = useState('+234');

    const onChangePhone = (e) => {
        const phone = e.currentTarget.value;
        phone.length > 0 && phone.length < 10 ? setPhoneError(true) : setPhoneError(false)
        setPhone(phone)
    }
    const onChangeCountryCode = (e) => {
        const countryCode = e.currentTarget.value;
        countryCode.length > 0 && countryCode.length < 2 ? setCountryCodeError(true) : setCountryCodeError(false)
        setCountryCode(countryCode)
    }
    useEffect(() => {
        const invalid = phoneErr || phone === '' || countryCodeErr || countryCode === ''
        setCanSend(!invalid);
        setError('');
    }, [phone, phoneErr, countryCode, countryCodeErr])

    const onSend = async () => {
        setLoading(true);
        setCanSend(false);
        setError('');

        dispatch(verifyAccount({ phone_number: phone , country_code: countryCode})).then(unwrapResult).then((originalPromiseResult) => {
            setLoading(false);
            setCanSend(true);
            navigate('/verify-otp', {
                state: {
                    phone: phone
                }
            });
        }).catch((rejectedValueOrSerializedError) => {
            setLoading(false);
            setCanSend(true);
            setError("Phone number does not exist");
        })

    }


    return (
        <>
            <AnonymousRouteHeader title='Forgot Password' styleProp='passwordHeader' />
            <div className='passwordContainers'>
                <p className='text'>Enter your phone number below to enable us verify you are whom you say you are</p>
                <div> {
                    error.length > 0 && <span className="errorBox">
                        {error}</span>
                }
                    <div className='inputContainer'>
                        <label htmlFor='phone' className='inputLabel'>Phone number</label>
                        <div className='phoneContainer'>
                            <input
                                placeholder="+234"
                                type='text'
                                value={countryCode}
                                className='countryCode'
                                onChange={e => onChangeCountryCode(e)}
                                required
                            />
                            <input
                                placeholder="80xxxxxxxxxx"
                                type='tel'
                                id='phone'
                                value={phone}
                                className='phoneInput'
                                onChange={e => onChangePhone(e)}
                                maxLength={11}
                            />
                        </div>

                        {phoneErr &&
                            <span className='inputError'>*please input a correct phone number</span>
                        }
                        {countryCodeErr &&
                            <span className='inputError'>*please input a valid country code</span>
                        }
                    </div>
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
