import React, {useState, useEffect} from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthTitle from '../../../components/AuthTitle/AuthTitle';
import './ResetPassword.scss'

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [canSubmit, setCanSubmit] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        const valid = password.length >= 8
        setCanSubmit(valid)
    }, [password])

    

    return(
        <div className='passwordContainer'>
            <AuthTitle titleText='Set New Pasword' />
            <p className='text'>Enter your new password below</p>
            <form>
                <div className='inputContainer'>
                    <label htmlFor="password" className='label'>Enter New Password</label>
                    <div className="passInput">
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className='passwordInput'
                    />
                    { password.length > 0 && <span className='show'
                    onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>}
                    </div>
                   
 
                </div>
                <button className='btn' disabled={!canSubmit}>Set New Password</button>
            </form>
        </div>
    )
}

export default ResetPassword;