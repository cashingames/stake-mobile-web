import React from 'react'
const VerifyEmailText = ({text}) => {
    return (
        <div className="verifyText">
            <h1 className="verifyHeadText">
                Good job, you are almost there
            </h1>
            <p className="verifySubText">
                {text}
            </p>
        </div>
    )
}


export default VerifyEmailText