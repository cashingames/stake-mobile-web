import React, { useEffect, useState } from 'react'
import FacebookLogin from 'react-facebook-login';
import { loginWithSocialLink, registerWithSocialLink, saveToken, setToken } from '../../features/Auth/AuthSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './FacebookSignIn.scss'
import BottomSheet from '../BottomSheet/BottomSheet';
import { FaFacebookF } from 'react-icons/fa';


function FacebookSignIn() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    // const [loading, setloading] = useState(false);
    const [phone_number, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [referrer, setReferrer] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [usernameErr, setUsernameError] = useState(false);
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [saving, setSaving] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const [openBottomSheet, setOpenBottomSheet] = useState(false);
    const closeBottomSheet = () => {
        setOpenBottomSheet(false)
    }
    const onChangeUsername = (e) => {
        const username = e.currentTarget.value;
        setUsername(username)
    }
    const onChangePhoneNumber = (e) => {
        const phone_number = e.currentTarget.value;
      phone_number.length < 4 ? setPhoneError(true) : setPhoneError(false)
        setPhoneNumber(phone_number)
    }
    const onChangeReferrer = (e) => {
        const referrer = e.currentTarget.value;
        setReferrer(referrer)
    }
    useEffect(() => {
        const usernameRule = /\s/;
        const validUsername = !usernameRule.test(username)
        setUsernameError(!validUsername);

        const invalid = usernameErr || username === "" || phoneError || phone_number === ''
        setCanSave(!invalid);

    }, [username, usernameErr, phoneError, phone_number])

    const registerUserWithFacebook = () => {
        setSaving(true);
        dispatch(registerWithSocialLink({
            email,
            firstName,
            lastName,
            phone_number,
            username,
            referrer
        })).then(unwrapResult)
            .then((originalPromiseResult) => {
                saveToken(originalPromiseResult.data.token)
                closeBottomSheet()
                navigate('/dashboard')
                setSaving(false)
            })
    }

    const responseFacebook = (response) => {
        dispatch(loginWithSocialLink(
            {
                firstName: response.first_name,
                lastName: response.last_name,
                email: response.email
            }
        )).then(unwrapResult)
            .then((originalPromiseResult) => {
                if (originalPromiseResult.data.isFirstTime) {
                    setEmail(originalPromiseResult.data.email)
                    setFirstName(originalPromiseResult.data.firstName)
                    setLastName(originalPromiseResult.data.lastName)
                    setOpenBottomSheet(true)
                    return
                }
                saveToken(originalPromiseResult.data.token)
                dispatch(setToken(originalPromiseResult.data.token))
            })
            .catch((rejectedValueOrSerializedError) => {
            })
    };
    
    return (
        <>
        <FacebookLogin
             appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
            fields="first_name,last_name,email,picture"
            callback={responseFacebook}
            buttonText=''
            cssClass="my-facebook-button"
            icon={<FaFacebookF fontSize='0.7rem' size={13}/>}
        />
         <BottomSheet open={openBottomSheet} closeBottomSheet={closeBottomSheet} BSContent={
                <RegisterFacebook
                    onPress={registerUserWithFacebook}
                    username={username}
                    usernameErr={usernameErr}
                    onChangeUsername={onChangeUsername}
                    onChangePhoneNumber={onChangePhoneNumber}
                    phoneError={phoneError}
                    phoneNumber={phone_number}
                    onChangeReferrer={onChangeReferrer}
                    referrer={referrer}
                    canSave={canSave}
                    saving={saving}
                />} />
        </>
    )
}

const RegisterFacebook = ({ username, onChangeUsername, usernameErr, onChangePhoneNumber
    , phoneError, phoneNumber, referrer, onChangeReferrer, onPress, canSave, saving}) => {
    return (
        <div className='google-sheet'>
            <p className='sheet-text'>Please input your details</p>
            <div className='sheet-input-containers'>
                <div className='sheet-input-container'>
                    <label htmlFor='username' className='input-label'>Username</label>
                    <input
                        placeholder='John'
                        id='username'
                        className='input'
                        value={username}
                        onChange={e => onChangeUsername(e)}
                        required
                    />
                    {usernameErr &&
                        <span className='input-error'>*username must not be empty and can only contain numbers and letters</span>
                    }
                </div>
                <div className='sheet-input-container'>
                    <label htmlFor='phoneNumber' className='input-label'>Phone Number</label>
                    <input
                        placeholder='080xxxxxxxx'
                        id='phoneNumber'
                        type='tel'
                        className='input'
                        value={phoneNumber}
                        onChange={e => onChangePhoneNumber(e)}
                        required
                    />
                    {phoneError &&
                        <span className='input-error'>*please input a correct phone number</span>
                    }
                </div>
                <div className='sheet-input-container'>
                    <label htmlFor='referrer' className='input-label'>Referral Code</label>
                    <input
                        placeholder="optional"
                        type='text'
                        id='referrer'
                        value={referrer}
                        className='input'
                        onChange={e => onChangeReferrer(e)}
                        required
                    />
                </div>
            </div>
            <button className='sheet-button' onClick={onPress} disabled={!canSave || saving}>
                <p>{saving ? 'Saving' : 'Proceed'}</p>
            </button>
        </div>
    )
}

export default FacebookSignIn