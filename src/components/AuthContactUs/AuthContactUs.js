import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendUserFeedback } from '../../features/CommonSlice';
import Dialogue from '../Dialogue/Dialogue'
import './AuthContactUs.scss'

function AuthContactForm() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [saving, setSaving] = useState(false);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message_body, setMessage] = useState('');
    const [firstNameErr, setFirstNameError] = useState(false);
    const [lastNameErr, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false)
    const [messageError, setMessageError] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);

    const goBack = () => {
        navigate(-1)
    }


    const onChangeFirstName = (event) => {
        first_name.length > 0 && first_name.length < 3 ? setFirstNameError(true) : setFirstNameError(false);
        setFirstName(event.target.value)
    }

    const onChangeLastName = (event) => {
        last_name.length > 0 && last_name.length < 3 ? setLastNameError(true) : setLastNameError(false);
        setLastName(event.target.value)
    }

    const onChangeEmail = (event) => {
        /* eslint-disable-line */
        const rule = /^([a-zA-Z0-9_/\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; /* eslint-disable-line */
        setEmailError(!rule.test(email))
        setEmail(event.currentTarget.value)
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
        })).then(() => {
            setOpenAlert(true)
            setMessage('')
            setFirstName('')
            setLastName('')
            setEmail('')
            setAlertMessage('Thanks for your feedback. You would be responded to shortly')
            setSaving(false)
        })
    }

    useEffect(() => {
        const invalid = messageError || message_body === '' || firstNameErr || first_name === '' ||
            lastNameErr || last_name === '' || emailError || email === ''
        setCanSave(!invalid);
    }, [messageError, message_body, firstNameErr, first_name, lastNameErr, last_name, emailError, email])

    return (
        <div className='form-container'>
            <h1 className='form-title'>Need help ? Fill the form and we would respond to you</h1>
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
                <textarea
                    placeholder='Your message'
                    id='last_name'
                    type="text"
                    className='textArea'
                    value={message_body}
                    onChange={onChangeMessage}
                    rows={15}
                    required
                />
                {messageError && <span className='inputError'>Please input your message</span>}
            </div>
            <button className='send-btn' disabled={!canSave || saving} onClick={sendFeedback}>Send</button>
            <p className='go-btn' onClick={goBack}>Go Back</p>
            <Dialogue open={openAlert} handleClose={closeAlert} dialogueMessage={alertMessage} />
        </div>
    )
}

export default AuthContactForm;