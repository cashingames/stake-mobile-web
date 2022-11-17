import React, {useState, useEffect} from "react";
import AuthTitle from '../../../components/AuthTitle/AuthTitle';
import './VerifyOtp.scss'

const VerifyOtp = () => {
    const [otpValues, setOtpValues] = useState(new Array(5).fill(''))
    const [canSubmit, setCanSubmit] = useState(false)
    const token = otpValues.join('')
    
    const changeValue = (e, index) => {
        setOtpValues([...otpValues.map((d, i) => {
            return i === index ? e.value : d
        })])

        if(e.value && e.nextSibling){
            e.nextSibling.focus()
        }
    } 

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(token)
    }

    useEffect(() => {
        const valid = token.length > 4
        setCanSubmit(valid)
    }, [token])


    return(
    <div className='passwordContainer'>
        <AuthTitle titleText='Verify OTP' />
        <p className='text'>Enter the One-time passcode we sent to the email you provided</p>
        <form className='otpForm' onSubmit={handleSubmit}>
            <div>
                {otpValues.map((data, index) => {
                    return(
                        <input 
                        className='otpInput'
                        name='otpValues'
                        key={index}
                        value={data} 
                        maxLength={1}
                        onChange={(e) => changeValue(e.target, index)}
                        />
                    )
                })}
            </div>
            <button className='btn' type='submit' disabled={!canSubmit}> Continue</button>
        </form>
        </div>
    )
}

export default VerifyOtp