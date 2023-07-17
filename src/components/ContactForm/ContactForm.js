import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sendUserFeedback } from '../../features/CommonSlice';
import Dialogue from '../Dialogue/Dialogue'
import './ContactForm.scss'

function ContactForm({ user }) {
    const dispatch = useDispatch();
    const [saving, setSaving] = useState(false);
    const [email] = useState(user.email);
    const [message_body, setMessage] = useState('');
    const [messageError, setMessageError] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const first_name = user.firstName;
    const last_name = user.lastName;

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
        }))
            .then(unwrapResult)
            .then(async result => {
                setOpenAlert(true)
                setMessage('')
                setAlertMessage('Thanks for your feedback. You would be responded to shortly')
                setSaving(false)
            })
            .catch((rejectedValueOrSerializedError) => {
                setOpenAlert(true)
                setMessage('')
                setAlertMessage(rejectedValueOrSerializedError.message)
                setSaving(false)
            });
    }

    useEffect(() => {
        const invalid = messageError || message_body === ''
        setCanSave(!invalid);
    }, [messageError, message_body])

    return (
        <div className='container-form'>
            <div className='inputContainer'>
                <label htmlFor='email' className='inputLabel'>Email</label>
                <p className='email'>{email}</p>
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
            <button className='send-btn' disabled={!canSave || saving} onClick={sendFeedback} >Send</button>
            <Dialogue open={openAlert} handleClose={closeAlert} dialogueMessage={alertMessage} />
        </div>
    )
}

export default ContactForm;