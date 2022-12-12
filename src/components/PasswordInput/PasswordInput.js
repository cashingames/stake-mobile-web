import React from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import './PasswordInput.scss'

function PasswordInput({label, placeholder, showPassword, value, setValue, setShowPassword, errorText, error}) {
    return (
        <div className='inputContainer'>
            <label htmlFor='password' className='inputLabel'>{label}</label>
            <div className='passInput'>
                <input placeholder={placeholder}
                    type={
                        showPassword ? 'text' : 'password'
                    }
                    className='passwordInput'
                    value={value}
                    onChange={
                        e => setValue(e.target.value)
                    }
                    required/> {
                value.length > 0 && <span className='show'
                    onClick={
                        () => setShowPassword(!showPassword)
                }>
                    {
                    showPassword ? <FaEye/>: <FaEyeSlash/>
                }</span>
            } </div>
           <p className='error'>{errorText}</p>
        </div>
    )
}

export default PasswordInput
