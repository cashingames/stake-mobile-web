import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import AuthBanner from '../../../components/AuthBanner/AuthBanner';
import AuthTitle from '../../../components/AuthTitle/AuthTitle';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import { loginUser, saveToken, setToken } from '../AuthSlice';
import './Login.scss'
import logToAnalytics from '../../../utils/analytics';


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

    const onLogin = () => {
        setLoading(true);
        setCanLogin(false);
        setError("");
        loginUser({
            email, password
        }).then(response => {
            saveToken(response.data.data);
            dispatch(setToken(response.data.data));
            logToAnalytics('login_successful');
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
                    navigate('/', {
                        phone_number: err.response.data.errors.phoneNumber,
                        username: err.response.data.errors.username, next_resend_minutes: 1
                    })
                }

                const firstError = Array.isArray(errors) ? Object.values(errors, {})[0][0] : errors;
                setError(firstError)
            }
            setLoading(false);
        });
    }

    if (loading) {
        return <LoaderScreen />
    }

    return (
        <div className='login'>
            <AuthBanner />
            <AuthTitle titleText="Sign In" styleProp='headerTitle' />
            <div className='inputsContainer'>
                <div className='formContainer'>
                    {error.length > 0 &&
                        <span className='inputError'>{error}</span>
                    }
                    <div className='inputContainer'>
                        <label htmlFor='email' className='inputLabel'>Email or username</label>
                        <input
                            placeholder='johndoe or johndoe@example.com'
                            id='email'
                            type="email"
                            className='inputBox'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className='inputContainer'>
                        <label htmlFor='password' className='inputLabel'>Password</label>
                        <div className='passInput'>
                            <input
                                placeholder='Enter password'
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                className='passwordInput'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            {password.length > 0 && <span className='show'
                                onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>}
                        </div>
                    </div>
                    <div className='forgotPasswordContainer'>
                        <a href='/forgot-password' className='forgotPasswordText'>Forgot Password?</a>
                    </div>
                    <div className='appButtonContainer'>
                        <button className='buttonContainer' disabled={!canLogin || loading} type='submit' onClick={onLogin}>
                            <span className='buttonText'>{loading ? "Signing in" : "Sign In"}</span>
                        </button>
                    </div>
                </div>

            </div>
            <div className='socialContainer'>
                <p className='socialLinkText'>Don't have an account ?  <a className='signup' href='/sign-up'>Create one</a></p>
            </div>
            <Link to='/help-contact' className='contact-us'>Need help ? Contact us</Link>
        </div>
    )
}

export default Login;