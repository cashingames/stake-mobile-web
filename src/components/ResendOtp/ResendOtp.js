import './ResendOtp.scss'

const ResendOtp = ({ onPress, counter, isCountdownInProgress}) => {
    return (
        <div className={`resend-timer-container ${isCountdownInProgress ? 'disabled' : ''}`} onClick={onPress}>
            
            <span className="status-text">{!isCountdownInProgress ? 'Resend Otp code' : 'Resend Otp code in'}</span>
            {isCountdownInProgress &&
                <span className="resend-timer"> {counter}</span>
            }
        </div>
    )
}

export default ResendOtp