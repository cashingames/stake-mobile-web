import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendUserFeedback } from '../../features/CommonSlice';
import Dialogue from '../Dialogue/Dialogue'
import './AuthContactUs.scss'
import { IoChevronForward } from 'react-icons/io5';
import AnonymousRouteHeader from '../AnonymousRouteHeader/AnonymousRouteHeader';

function AuthContactForm() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [saving, setSaving] = useState(false);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message_body, setMessage] = useState('');
    const [firstNameErr, setFirstNameError] = useState(false);
    const [lastNameErr, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneErr, setPhoneError] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);


    const onChangeFirstName = (event) => {
        first_name.length > 0 && first_name.length < 3 ? setFirstNameError(true) : setFirstNameError(false);
        setFirstName(event.target.value)
    }

    const onChangeLastName = (event) => {
        last_name.length > 0 && last_name.length < 3 ? setLastNameError(true) : setLastNameError(false);
        setLastName(event.target.value)
    }

    const onChangeEmail = (event) => {
        const email = event.currentTarget.value;
        //  eslint-disable-next-line
        const rule = /^([a-zA-Z0-9_/\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        setEmailError(!rule.test(email))
        setEmail(email)
    }
    const onChangePhone = (e) => {
        const phone = e.currentTarget.value;
        phone.length > 0 && phone.length < 11 ? setPhoneError(true) : setPhoneError(false)
        setPhone(phone)
    }


    const onChangeMessage = (event) => {
        message_body.length > 0 && message_body.length < 3 ? setMessageError(true) : setMessageError(false);
        setMessage(event.target.value)
    }

    const closeAlert = () => {
        setOpenAlert(false)
    }

    const sendFeedback = () => {
        setSaving(true)
        dispatch(sendUserFeedback({
            first_name,
            last_name,
            email,
            message_body,
            phone_number: phone
        }))
            .then(unwrapResult)
            .then(async result => {
                setOpenAlert(true)
                setMessage('')
                setFirstName('')
                setLastName('')
                setEmail('')
                setPhone('')
                setAlertMessage('Thanks for your feedback. You would be responded to shortly')
                setSaving(false)
            })
            .catch((rejectedValueOrSerializedError) => {
                setOpenAlert(true)
                setMessage('')
                setFirstName('')
                setLastName('')
                setEmail('')
                setPhone('')
                setSaving(false)
                setAlertMessage(rejectedValueOrSerializedError.message)
            });
    }

    useEffect(() => {
        const invalid = messageError || message_body === '' || firstNameErr || first_name === '' ||
            lastNameErr || last_name === '' || emailError || email === '' || phoneErr || phone === ''
        setCanSave(!invalid);
    }, [messageError, message_body, firstNameErr, first_name, lastNameErr, last_name, emailError, email, phoneErr, phone])

    const navigateHandler = () => {
        navigate('/login');
    }

    return (

            <div className='form-container'>
            <AnonymousRouteHeader title='Contact Us' styleProp='agreement' noClose={true} onClick={navigateHandler} />

                <h1 className='form-title'>Do you have any question? Write to us</h1>
                <a href='https://wa.me/2348025116306' className='whatsapp-chat'>
                    <img width="50px" height="50px" src="/images/whatsapp-icon.png" alt="logo" className="social-img" />
                    <div className='text-container'>
                        <div className='header-container'>
                            <span className='header'>Need live help</span>
                            <IoChevronForward color='#072169' />
                        </div>
                        <span className='whatsapp-title'>Live chat with support on Whatsapp</span>
                    </div>
                </a>
                <div className='inputContainer'>
                    <label htmlFor='email' className='inputLabel'>First Name</label>
                    <input
                        id='first_name'
                        type="text"
                        className='inputBox'
                        value={first_name}
                        onChange={onChangeFirstName}
                        required
                    />
                    {firstNameErr && <span className='inputError'>*first name must not be empty</span>}
                </div>
                <div className='inputContainer'>
                    <label htmlFor='email' className='inputLabel'>Last Name</label>
                    <input
                        id='last_name'
                        type="text"
                        className='inputBox'
                        value={last_name}
                        onChange={onChangeLastName}
                        required
                    />
                    {lastNameErr && <span className='inputError'>*last name must not be empty</span>}
                </div>
                <div className='inputContainer'>
                    <label htmlFor='email' className='inputLabel'>Email</label>
                    <input
                        id='email'
                        type="text"
                        className='inputBox'
                        value={email}
                        onChange={onChangeEmail}
                        required
                    />
                    {emailError && <span className='inputError'>*please input a valid email</span>}
                </div>
                <div className='inputContainer'>
                    <label htmlFor='phone' className='inputLabel'>Phone number</label>
                    <input
                        id='phone'
                        type="tel"
                        className='inputBox'
                        value={phone}
                        onChange={onChangePhone}
                        required
                        maxLength={11}
                    />
                    {phoneErr && <span className='inputError'>*please input a valid phone number</span>}
                </div>
                <div className='inputContainer'>
                    <textarea
                        placeholder='Your message'
                        id='last_name'
                        type="text"
                        className='textArea'
                        value={message_body}
                        onChange={onChangeMessage}
                        rows={10}
                        required
                    />
                    {messageError && <span className='inputError'>Please input your message</span>}
                </div>
                <button className='send-btn' disabled={!canSave || saving} onClick={sendFeedback}>Send</button>
                <Dialogue open={openAlert} handleClose={closeAlert} dialogueMessage={alertMessage} />
            </div>
    )
}

export default AuthContactForm;