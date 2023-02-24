import React from 'react';
import './InputOTP.scss';

function InputOTP({changeValue, otpValues}) {
  return (
    <div className="verifyRegistrationOtp-container">
            <form className="otpForm">
                {otpValues.map((data, index) => {
                    return (
                        <input
                            key={index}
                            value={data}
                            maxLength={1}
                            onChange={(e) => changeValue(e.target, index)}
                            className='otpInput' />
                    )
                })}
            </form>
        </div>
  )
}

export default InputOTP