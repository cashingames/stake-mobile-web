import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AnonymousRouteHeader from "../../../components/AnonymousRouteHeader/AnonymousRouteHeader";
import { verifyAccount } from "../AuthSlice";
import './ForgotPassword.scss'
import { IoChevronForwardOutline } from "react-icons/io5";

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

        dispatch(verifyAccount({ phone_number: phone, country_code: countryCode })).then(unwrapResult).then((originalPromiseResult) => {
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
            <div className='password-containers'>
                <AnonymousRouteHeader title='Password reset' styleProp='password-header' noClose={true} />
                <div> {
                    error.length > 0 && <span className="error-box">
                        {error}</span>
                }
                    <div className='input-container'>
                        <label htmlFor='phone' className='input-label'>Phone number</label>
                        <div className='phone-container'>
                            <input
                                placeholder="+234"
                                type='text'
                                value={countryCode}
                                className='country-code'
                                onChange={e => onChangeCountryCode(e)}
                                required
                            />
                            <input
                                placeholder="80xxxxxxxxxx"
                                type='tel'
                                id='phone'
                                value={phone}
                                className='phone-input'
                                onChange={e => onChangePhone(e)}
                                maxLength={11}
                            />
                        </div>

                        {phoneErr &&
                            <span className='input-error'>*please input a correct phone number</span>
                        }
                        {countryCodeErr &&
                            <span className='input-error'>*please input a valid country code</span>
                        }
                    </div>
                    <p className='text'>An Otp code would be sent to your phone number.</p>

                    <button className='button-container' disabled={!canSend || loading} type='submit' onClick={
                        () => onSend()
                    }>
                        <span className='buttonText'>{loading ? "Sending..." : "Reset password"}</span>
                        <IoChevronForwardOutline size={20} color='#FFF' className='icon' />
                    </button>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;
