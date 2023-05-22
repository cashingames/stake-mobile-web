import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { IoEllipseOutline, IoCheckmarkCircle, IoChevronForwardOutline } from 'react-icons/io5';
import { registerUser } from '../AuthSlice';
import { useNavigate, Link } from 'react-router-dom';
import AuthTitle from '../../../components/AuthTitle/AuthTitle';

import './Signup.scss'
import logToAnalytics from '../../../utils/analytics';


const Signup = () => {

    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    // const [referrer, setReferrer] = useState('');
    const [countryCode, setCountryCode] = useState('+234');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [bonusChecked, setBonusChecked] = useState(false);
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [fNameErr, setFnameErr] = useState(false);
    const [lNameErr, setLnameErr] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [phoneErr, setPhoneError] = useState(false);
    const [countryCodeErr, setCountryCodeError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassErr, setConfirmPassError] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [canSend, setCanSend] = useState(true);
    const [loading, setLoading] = useState(false);


    const onChangeEmail = (e) => {
        const email = e.currentTarget.value;
        // eslint-disable-next-line
        const rule = /^([a-zA-Z0-9_/\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; /* eslint-disable-line */
        setEmailError(!rule.test(email))
        setEmail(email)

    };

    const onChangeFirstname = (e) => {
        const firstName = e.currentTarget.value;
        setFirstname(firstName)
    }
    const onChangeLastname = (e) => {
        const lastName = e.currentTarget.value;
        setLastname(lastName)
    }
    const onChangeUsername = (e) => {
        const username = e.currentTarget.value;
        const usernameRule = /\s/;
        const validUsername = usernameRule.test(username)
        // eslint-disable-next-line
        username.length > 0 && username.length < 4 || (validUsername) ? setUsernameError(true) : setUsernameError(false)
        setUsername(username)
    }
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
    const onChangeConfirmPassword = (e) => {
        const confirmPassword = e.currentTarget.value;
        confirmPassword.length > 0 && confirmPassword.length < 8 ? setConfirmPassError(true) : setConfirmPassError(false);
        setConfirmPassword(confirmPassword)
    }
    // const onChangeReferrer = (e) => {
    //     const referrer = e.currentTarget.value;
    //     setReferrer(referrer)
    // }


    useEffect(() => {
        const nameRule = /\d/;
        const validFirstName = !nameRule.test(firstname);
        const validLastName = !nameRule.test(lastname);
        setFnameErr(!validFirstName);
        setLnameErr(!validLastName);

        const invalid = emailError || email === '' || username === '' || usernameError || phone === '' || countryCode === '' || password === '' || phoneErr
            || countryCodeErr || passwordError || checked === false || confirmPassErr || confirmPassword === '' || confirmPassword !== password || fNameErr || firstname === "" || lNameErr || lastname === " ";
        setCanSend(!invalid);
    }, [emailError, usernameError, phoneErr, countryCodeErr, passwordError, password, email, username, phone,
        countryCode, checked, confirmPassErr, confirmPassword, fNameErr, firstname, lNameErr, lastname])

        const logMeIn = () => {
            navigate('/login')
        }

    const onSend = () => {
        setLoading(true);
        //dispatch(saveCreatedUserCredentials({ email, password, password_confirmation: password, phone_number: phone, country_code: countryCode }))
        registerUser({
            email, password,
            password_confirmation: password,
            phone_number: phone,
            country_code: countryCode,
            username: username,
            first_name: firstname,
            last_name: lastname,
            // referrer: referrer,
            // bonus_checked: bonusChecked,
        }).then(response => {
            logToAnalytics('registration_unverified', {
                'email': email,
                'phone_number': phone
            });
            navigate('/verify-phone-number', {
                state: {
                    phone_number: phone,
                    next_resend_minutes: response.data.data.next_resend_minutes
                }
            })

        }, err => {
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
        <div className='signup-container'>
            <AuthTitle titleText="Create Account" styleProp='header-title' />
            <div className='form-container'>
                <div className='inputs-container'>
                    {error.length > 0 &&
                        <span className='inputs-error'>{error}</span>
                    }
                    <div className='input-container'>
                        <div className='label-container'>
                            <label htmlFor='phone' className='input-label'>Phone number</label>
                            <p className='required-text'>Required</p>
                        </div>
                        <div className={phoneErr || countryCodeErr ? 'phone-containeri' : 'phone-container'}>
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
                    <div className='input-container'>
                        <div className='label-container'>
                            <label htmlFor='firstname' className='input-label'>First name</label>
                            <p className='required-text'>Required</p>
                        </div>
                        <input
                            placeholder="First name as it appears on your bank account"
                            type='text'
                            id='firstname'
                            value={firstname}
                            className={fNameErr ? 'input-boxi' : 'input-box'}
                            autoFocus={true}
                            onChange={e => onChangeFirstname(e)}
                            required
                        />
                        {fNameErr &&
                            <span className='input-error'>*First name can't have numbers</span>
                        }
                    </div>
                    <div className='input-container'>
                        <div className='label-container'>
                            <label htmlFor='lastname' className='input-label'>Last name</label>
                            <p className='required-text'>Required</p>
                        </div>
                        <input
                            placeholder="Last name as it appears on your bank account"
                            type='text'
                            id='lastname'
                            value={lastname}
                            className={lNameErr ? 'input-boxi' : 'input-box'}
                            autoFocus={true}
                            onChange={e => onChangeLastname(e)}
                            required
                        />
                        {lNameErr &&
                            <span className='input-error'>*Last name can't have numbers</span>
                        }
                    </div>
                    <div className='input-container'>
                        <div className='label-container'>
                            <label htmlFor='email' className='input-label'>Email</label>
                            <p className='required-text'>Required</p>
                        </div>
                        <input
                            placeholder="johndoe@example.com"
                            type='email'
                            // pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                            id='email'
                            value={email}
                            className={emailError ? 'input-boxi' : 'input-box'}
                            autoFocus={true}
                            onChange={e => onChangeEmail(e)}
                            required
                        />
                        {emailError &&
                            <span className='input-error'>*invalid email address</span>
                        }
                    </div>
                    <div className='input-container'>
                        <div className='label-container'>
                            <label htmlFor='username' className='input-label'>Username</label>
                            <p className='required-text'>Required</p>
                        </div>
                        <input
                            placeholder="Input a username"
                            type='text'
                            // pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                            id='username'
                            value={username}
                            className={usernameError ? 'input-boxi' : 'input-box'}
                            autoFocus={true}
                            onChange={e => onChangeUsername(e)}
                            required
                        />
                        {usernameError &&
                            <span className='input-error'>*username must not be less than 4 characters and must not have spaces</span>
                        }
                    </div>
                    <div className='input-container'>
                        <div className='label-container'>
                            <label htmlFor='password' className='input-label'>Password</label>
                            {password.length > 0 && <span className='show'
                                onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>}
                        </div>
                        <input
                            placeholder="Enter password"
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            value={password}
                            className={passwordError ? 'input-boxi' : 'input-box'}
                            onChange={e => onChangePassword(e)}
                            minLength={8}
                            required
                        />
                        {passwordError &&
                            <span className='input-error'>*password must not be less than eight(8) characters</span>
                        }
                    </div>
                    <div className='input-container'>
                        <div className='label-container'>
                            <label htmlFor='confirmPassword' className='input-label'>Confirm password</label>
                            {confirmPassword.length > 0 && <span className='show'
                                onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>}
                        </div>
                        <input
                            placeholder="Confirm password"
                            type={showPassword ? 'text' : 'password'}
                            id='confirmPassword'
                            value={confirmPassword}
                            className={confirmPassErr ? 'input-boxi' : 'input-box'}
                            onChange={e => onChangeConfirmPassword(e)}
                            minLength={8}
                            required
                        />
                        {confirmPassErr &&
                            <span className='input-error'>*password must not be less than eight(8) characters</span>
                        }
                    </div>
                    {/* <div className='inputContainer'>
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
                    </div> */}
                    <div className='agreements-container'>
                        <span onClick={() => setChecked(!checked)}>{checked ? <IoCheckmarkCircle size={26} color='#00FFA3' /> : <IoEllipseOutline size={26} color='#D9D9D9'
                        />}</span>
                        <div className='agreements-text-container'>
                            <span className='agreements-text'>I agree to the </span>
                            <Link className='agreements-link' to="/terms">Terms & conditions,</Link>
                            <Link className='agreements-link' to="/privacy"> Privacy policy</Link>
                            <span className='agreements-text'> of Cashingames. I also declare i am 18 and above.</span>


                        </div>
                    </div>
                    <div className='bonus-container'>
                        <span onClick={() => setBonusChecked(!bonusChecked)}>{bonusChecked ? <IoCheckmarkCircle size={26} color='#00FFA3' /> : <IoEllipseOutline size={26} color='#D9D9D9'
                        />}</span>
                        <span className='agreements-text'>I would like to receive my sign up bonus.</span>
                    </div>

                    <div className='buttons-container'>
                        <button className='button-container' disabled={!canSend || loading} type='submit' onClick={onSend}>
                            <span className='buttonText'>{loading ? "Creating" : "Create Account"}</span>
                            <IoChevronForwardOutline size={20} color='#FFF' className='icon' />
                        </button>
                        <p className='or-text'>Or</p>
                        <button className='button-containeri' onClick={logMeIn}>
                            <span className='buttonText'>Login to account</span>
                            <IoChevronForwardOutline size={20} color='#072169' className='icon' />
                        </button>
                    </div>
                    <Link to='/help-contact' className='contact-us'>Need help ? Contact us</Link>
                </div>
            </div>
        </div>
    )
}
export default Signup;