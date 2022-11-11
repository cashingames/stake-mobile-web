import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaFacebookF, FaApple } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import AuthTitle from "../../../components/AuthTitle/AuthTitle";
import styles from './Login.module.scss'

import {
    useAppDispatch,
    useAppSelector,
} from '../../../app/hooks';

import { authSelector } from '../../auth/selectors'
import { loginUser } from '../../auth/actions'

const Login: React.FC = () => {
    const dispatch = useAppDispatch();

    const {
        token
    } = useAppSelector(authSelector);

    const [canLogin, setCanLogin] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const onSubmit = () => {

    }

    useEffect(() => {
        const logMeIn = email.length > 4 && password.length > 5;
        setCanLogin(logMeIn)
    }, [email, password])

    return (
        <div className={styles.login}>
            <AuthTitle titleText="Sign in" style={{
                marginTop: '20px'
            }} />

            <form className={styles.loginBox}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type='email'
                        placeholder="Enter your email"
                        value={email}
                        required
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <div className={styles.password}>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            required
                            onChange={(event) => setPassword(event.target.value)} />
                        {password.length > 1 && <span onClick={() => setShowPassword(!showPassword)}>{showPassword ?
                            <FaEye /> : <FaEyeSlash />} </span>
                        }
                    </div>
                </div>
                <p className={styles.forgot}>Forg password?</p>
                <button type="submit" disabled={!canLogin}
                onClick={() => dispatch(loginUser())}
                    style={{
                        background: canLogin ? "#EF2F55" : 'grey',
                        color: '#fff'
                    }}>Sign in</button>
                <p>or sign in using</p>
                <div className={styles.socialBtns}>
                    <button><FcGoogle /> Google</button>
                    <button><FaFacebookF /> Facebook</button>
                    <button><FaApple /> Apple</button>
                </div>
            </form>
            <div className={styles.signUp}>
                <p className={styles.signupText}>Don't have an account ? create one</p>
            </div>
        </div>
    )
}
export default Login;