import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaCheckSquare } from 'react-icons/fa'
import { registerUser} from '../AuthSlice';
import { useNavigate, Link } from 'react-router-dom';
import { BiRectangle } from "react-icons/bi";
import AuthBanner from '../../../components/AuthBanner/AuthBanner';
import AuthTitle from '../../../components/AuthTitle/AuthTitle';

import './Signup.scss'


const Signup = () => {

    let navigate = useNavigate();
    const style = { color: '#CDD4DF', fontSize: "1.2rem" }
    const styleI = { color: '#4299f5', fontSize: "1.2rem" }
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [referrer, setReferrer] = useState('');
    const [countryCode, setCountryCode] = useState('+234')
    const [password, setPassword] = useState('')
    const [checked, setChecked] = useState(false)
    const [error, setError] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [phoneErr, setPhoneError] = useState(false);
    const [countryCodeErr, setCountryCodeError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [canSend, setCanSend] = useState(true)
    const [loading, setLoading] = useState(false);


    const onChangeEmail = (e) => {
        const email = e.currentTarget.value;
        // eslint-disable-next-line
        const rule = /^([a-zA-Z0-9_/\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; /* eslint-disable-line */
        setEmailError(!rule.test(email))
        setEmail(email)

    };
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
    const onChangePassword = (e) => {
        const password = e.currentTarget.value;
        password.length > 0 && password.length < 8 ? setPasswordError(true) : setPasswordError(false)
        setPassword(password)
    }
    const onChangeReferrer = (e) => {
        const referrer = e.currentTarget.value;
        setReferrer(referrer)
    }


    useEffect(() => {

        const invalid = emailError || email === '' || phone === '' || countryCode === '' || password === '' || phoneErr
            || countryCodeErr || passwordError || checked === false;
        setCanSend(!invalid);
    }, [emailError, phoneErr, countryCodeErr, passwordError, password, email, phone, countryCode, checked])

    const onSend = () => {
        setLoading(true);
        //dispatch(saveCreatedUserCredentials({ email, password, password_confirmation: password, phone_number: phone, country_code: countryCode }))
        registerUser({
            email, password,
            password_confirmation: password,
            phone_number: phone,
            country_code: countryCode,
            referrer: referrer,
        }).then(response => {
            // ReactGA.event({
            //     category: 'Authentication',
            //     action: 'Sign up phone or email otp sent'
            // });
            navigate('/verify-phone-number', {
                state: {
                    phone_number: phone,
                    next_resend_minutes: response.data.data.next_resend_minutes
                }
            })

        }, err => {
            // ReactGA.exception({
            //     description: 'An error ocurred',
            //     fatal: true
            //   });
            if (!err || !err.response || err.response === undefined) {
                setError("Your Network is Offline.");
            }
            else if (err.response.status === 500) {
                setError("Service not currently available. Please contact support");
            }
            else {
                const errors =
                    err.response && err.response.data && err.response.data.errors;
                const firstError = Object.values(errors, {})[0];
                setError(firstError[0])
            }
            setLoading(false);
        });
    }


    return (
        <div className='signupContainer'>
            <AuthBanner />
            <AuthTitle titleText="Create an account" styleProp='headerTitle' />
            <div className='formContainer'>
                <div className='inputsContainer'>
                    {error.length > 0 &&
                        <span className='inputError'>{error}</span>
                    }
                    <div className='inputContainer'>
                        <label htmlFor='email' className='inputLabel'>Email</label>
                        <input
                            placeholder="johndoe@example.com"
                            type='email'
                            // pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                            id='email'
                            value={email}
                            className='inputBox'
                            autoFocus={true}
                            onChange={e => onChangeEmail(e)}
                            required
                        />
                        {emailError &&
                            <span className='inputError'>*invalid email address</span>
                        }
                    </div>
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
                    <div className='inputContainer'>
                        <label htmlFor='password' className='inputLabel'>Password</label>
                        <div className='passInput'>
                            <input
                                placeholder="Enter password"
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                value={password}
                                className='passwordInput'
                                onChange={e => onChangePassword(e)}
                                minLength={8}
                                required
                            />
                            {password.length > 0 && <span className='show'
                                onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>}
                        </div>
                        {passwordError &&
                            <span className='inputError'>*password must not be less than eight(8) characters</span>
                        }
                    </div>
                    <div className='inputContainer'>
                        <label htmlFor='referrer' className='inputLabel'>Referral Code</label>
                        <input
                            placeholder="optional"
                            type='text'
                            id='referrer'
                            value={referrer}
                            className='inputBox'
                            onChange={e => onChangeReferrer(e)}
                            required
                        />
                    </div>
                    <div className='agreementsContainer'>
                        <span onClick={() => setChecked(!checked)}>{checked ? <FaCheckSquare style=
                            {styleI} /> : <BiRectangle style={style} />}</span>
                        <div className='agreementsTextContainer'>
                            <span className='agreementsText'>I agree to the</span>
                            <a className='agreementsLink' href="/terms">terms & conditions</a>
                            <span className='agreementsText'>and</span>
                            <a className='agreementsLink' href="/privacy">privacy policy</a>

                        </div>
                    </div>

                    <div className='appButtonContainer'>
                        <button className='buttonContainer'
                            type="submit" disabled={!canSend || loading} onClick={onSend}>
                            <span className='buttonText'>{loading ? "Processing" : "Create Account"}</span>

                        </button>
                    </div>
                    <p className='have-account'>Have an account already ? <a className='sign-in' href="/login">Sign in</a></p>
                    <Link to='/help-contact' className='contact-us'>Need help ? Contact us</Link>
                </div>
            </div>
        </div>
    )
}
export default Signup;