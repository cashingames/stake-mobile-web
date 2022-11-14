import React, { useState, useEffect } from "react";
import AuthTitle from '../../../components/AuthTitle/AuthTitle';
import './ForgotPassword.scss'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [canSend, setCanSend] = useState(true)
    const [loading] = useState(false)

    const onChangeEmail = (e) => {
        const email = e.currentTarget.value;
        // eslint-disable-next-line
        const rule = /^([a-zA-Z0-9_/\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; /* eslint-disable-line */
        setEmailError(!rule.test(email))
        setEmail(email)

    };

    useEffect(() => {
        const invalid = emailError || email === ''
        setCanSend(!invalid);
    }, [email,emailError])



    return (
        <div className='passwordContainer'>
            <AuthTitle titleText='Forgot Password' />
            <p className='text'>Enter your email below to enable us verify you are whom you say you are</p>
            <form>
                <div className='inputContainer'>
                    <label htmlFor="email" className='labels'>Email or username</label>
                    <input
                        type='text'
                        placeholder="johndoe or johndoe@example.com"
                        value={email}
                        className='email'
                        onChange={e => onChangeEmail(e)}
                        required
                    />
                    {emailError &&
                        <span className='inputError'>*invalid email address</span>
                    }
                </div>
                <button className='btn' disabled={!canSend}>{loading ? 'Sending...' : 'GET OTP'} </button>
            </form>
        </div>
    )
}

export default ForgotPassword;