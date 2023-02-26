import React from 'react';
import './InputOTP.scss';

function InputOTP({changeValue, otpValues}) {
  return (
            <form className="otp-form">
                {otpValues.map((data, index) => {
                    return (
                        <input
                            key={index}
                            value={data}
                            maxLength={1}
                            onChange={(e) => changeValue(e.target, index)}
                            className='otp-input' />
                    )
                })}
            </form>
  )
}

export default InputOTP