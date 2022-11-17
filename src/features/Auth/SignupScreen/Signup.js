import React, { useState, useEffect } from 'react';
import AuthBanner from '../../../components/AuthBanner/AuthBanner';
import AuthTitle from '../../../components/AuthTitle/AuthTitle';
import GoogleSignup from '../../../components/GoogleSignup/GoogleSignup';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import './Signup.scss'
import { saveCreatedUserCredentials } from '../AuthSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const Signup = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [countryCode, setCountryCode] = useState('+234')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('');
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
        phone.length > 0 && phone.length < 4 ? setPhoneError(true) : setPhoneError(false)
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
    const onChangeConfirmPassword = (e) => {
        const password_confirmation = e.currentTarget.value;
        setPasswordConfirmation(password_confirmation)
    }
    useEffect(() => {
        const invalid = emailError || email === '' || phone === '' || countryCode === '' || password === '' || phoneErr
            || countryCodeErr || passwordError || password_confirmation !== password;
        setCanSend(!invalid);
    }, [emailError, phoneErr, countryCodeErr, passwordError, password_confirmation, password, email, phone, countryCode])

    const onNext = () => {
        console.log('saving')
        setLoading(true);
        //save this information in store
        dispatch(saveCreatedUserCredentials({ email, password, password_confirmation: password, phone_number: phone, country_code: countryCode }))
            navigate("/sign-up-profile")
    }


    return (
        <div className='signupContainer'>
            <AuthBanner />
            <AuthTitle titleText="Create an account" styleProp='headerTitle' />
            <div className='socialLinkContainer'>
                <p className='socialLinkText'>Use your social link</p>
                <div>
                    <GoogleSignup buttonText="Sign up" />
                </div>
                <p className='socialLinkText'>or</p>
            </div>
            <div className='formContainer'>
                <div className='inputsContainer'>
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
                                maxLength={8}
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
                        <label htmlFor='confirm-password' className='inputLabel'>Confirm password</label>
                        <div className='passInput'>
                            <input
                                placeholder="Confirm password"
                                type={showPassword ? 'text' : 'password'}
                                id='confirm-password'
                                value={password_confirmation}
                                className='passwordInput'
                                onChange={e => onChangeConfirmPassword(e)}
                                maxLength={8}
                                required
                            />
                            {password_confirmation.length > 0 && <span className='show'
                                onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>}
                        </div>
                        {password_confirmation !== password &&
                            <span className='inputError'>*passwords must match</span>
                        }
                    </div>
                    <div className='agreementsContainer'>
                        <input type='checkbox' className='agreementsCheckbox' defaultChecked
                            name="agree" required />
                        <div className='agreementsTextContainer'>
                            <span className='agreementsText'>I agree to the</span>
                            <a className='agreementsLink' href="/terms">terms & conditions</a>
                            <span className='agreementsText'>and</span>
                            <a className='agreementsLink' href="/privacy">privacy policy</a>

                        </div>
                    </div>
                    <div className='appButtonContainer'>
                        <button className='buttonContainer'
                            type="submit" disabled={!canSend || loading} onClick={onNext}>
                            <span className='buttonText'>{loading ? "Processing" : "Continue"}</span>

                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Signup;