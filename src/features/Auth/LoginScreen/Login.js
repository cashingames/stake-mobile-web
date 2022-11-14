import React, { useState, useEffect } from 'react';
import AuthBanner from '../../../components/AuthBanner/AuthBanner';
import AuthTitle from '../../../components/AuthTitle/AuthTitle';
import { FaEye, FaEyeSlash} from 'react-icons/fa'
import './Login.scss'
import GoogleSignup from '../../../components/GoogleSignup/GoogleSignup';



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [canLogin, setCanLogin] = useState(true)

    useEffect(() => {
        const invalid = email.length < 4 || password.length < 8;
        setCanLogin(!invalid)
    }, [email, password])

    return (
        <div className='login'>
            <AuthBanner />
            <AuthTitle titleText="Sign In" styleProp='headerTitle' />
            <div className='inputsContainer'>
                <form className='formContainer'>
                    <div className='inputContainer'>
                        <label htmlFor='email' className='inputLabel'>Email or Username</label>
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
                        <p className='forgotPasswordText'>Forgot password ?</p>
                    </div>
                    <div className='appButtonContainer'>
                    <button className='buttonContainer' disabled={!canLogin}>
                        <span className='buttonText'>Sign in</span>
                    </button>
                    </div>
                </form>

            </div>
            <div className='socialContainer'>
                <p className='socialLinkText'>Don't have an account ?  <a className='signup' href='/login'>Create one</a></p>
                <p className='socialLinkText'>or</p>
                <GoogleSignup buttonText='Sign in' />
            </div>
        </div>
    )
}

export default Login;