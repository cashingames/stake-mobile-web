import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import AuthTitle from '../../../components/AuthTitle/AuthTitle';
import { getUser, loginUser, saveToken, setToken } from '../AuthSlice';
import './Login.scss'
import logToAnalytics from '../../../utils/analytics';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { getCommonData } from '../../CommonSlice';
import { setupAxios } from '../../../utils/utils';


const Login = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [canLogin, setCanLogin] = useState(true)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        const invalid = email.length < 4 || password.length < 8;
        setCanLogin(!invalid)
    }, [email, password]);

    const createAccount = () => {
        navigate('/sign-up')
    }

    const onLogin = () => {
        setLoading(true);
        loginUser({
            email, password
        }).then(response => {
            const token = response.data.data;
            saveToken(token);
            dispatch(setToken(token));
            setupAxios(token, dispatch)
            logToAnalytics('login_successful');
            const _1 = dispatch(getUser());
            const _2 = dispatch(getCommonData());
            Promise.all([_1, _2]).then(() => {
                setLoading(false);
                navigate('/dashboard')
            }).catch((e) => {
                alert(e.message);
            });
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

                if (err.response.status === 400 && err.response.data.message === 'Account not verified') {
                    console.log(err)
                    logToAnalytics('registration_unverified', {
                        'username': errors.username,
                        'phone_number': errors.phone_number,
                        'email': errors.email
                    });
                    navigate('/verify-phone-number', {
                        state: {
                            phone_number: err.response.data.errors.phoneNumber,
                            username: err.response.data.errors.username,
                            next_resend_minutes: 1
                        }
                    })
                }

                const firstError = Array.isArray(errors) ? Object.values(errors, {})[0][0] : errors;
                setError(firstError)
            }
            setLoading(false);
        });
    }

    return (
        <div className='login'>
            <AuthTitle titleText="Login to your account" styleProp='header-title' />
            <div className='inputs-container'>
                <div className='form-container'>

                    {error.length > 0 &&
                        <div className='error-container'>
                            <span className='input-error'>{error}</span>
                        </div>
                    }
                    <div className='input-container'>
                        <label htmlFor='email' className='input-label'>Enter email or username</label>
                        <input
                            placeholder='johndoe or johndoe@example.com'
                            id='email'
                            type="email"
                            className='input-box'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className='input-container'>
                        <div className='label-container'>
                            <label htmlFor='password' className='input-label'>Password</label>
                            {password.length > 0 && <span className='show'
                                onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>}
                        </div>
                        <input
                            placeholder='Enter password'
                            id='password'
                            type={showPassword ? 'text' : 'password'}
                            className='input-box'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='forgot-password-container'>
                        <Link to='/forgot-password' className='forgot-password-text'>Forgot Password?</Link>
                    </div>
                    <div className='buttons-container'>
                        <button className='button-container' disabled={!canLogin || loading} type='submit' onClick={onLogin}>
                            <span className='buttonText'>{loading ? "Signing in" : "Log me in"}</span>
                            <IoChevronForwardOutline size={20} color='#FFF' className='icon' />
                        </button>
                        <p className='or-text'>Or</p>
                        <button className='button-containeri' onClick={createAccount}>
                            <span className='buttonText'>Create Account</span>
                            <IoChevronForwardOutline size={20} color='#1C453B' className='icon' />
                        </button>
                    </div>
                </div>

            </div>
            <Link to='/help-contact' className='contact-us'>Need help ? Contact us</Link>
        </div>
    )
}

export default Login;