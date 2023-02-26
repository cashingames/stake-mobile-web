import React from 'react'
import './VerifyEmailText.scss'
const VerifyEmailText = ({text}) => {
    return (
        <div className="verify-text">
            <h1 className="verify__head-text">
                Good job, you are almost there
            </h1>
            <p className="verify__sub-text">
                {text}
            </p>
        </div>
    )
}


export default VerifyEmailText