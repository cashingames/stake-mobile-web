import './ResendOtp.scss'

const ResendOtp = ({ onPress, counter, isCountdownInProgress }) => {
    return (
        <div className="resendOtpText">
            {isCountdownInProgress &&
                <div className="resendTimerContainer">
                    <span className="statusText">Resend OTP in </span>
                    <span className="resendTimer">{counter}</span>
                </div>
            }
            {!isCountdownInProgress &&
                <button onClick={onPress} className='resendOtpButton'>
                    <p className="resendText">
                        Resend OTP
                    </p>
                </button>
            }
        </div>
    )
}

export default ResendOtp