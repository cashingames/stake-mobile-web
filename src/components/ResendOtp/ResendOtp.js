import './ResendOtp.scss'

const ResendOtp = ({ onPress, isCountdownInProgress, countdownDone, noPress}) => {
    return (
        <div className={`resend-timer-container ${isCountdownInProgress || countdownDone ? 'disabled' : ''}`} onClick={isCountdownInProgress || countdownDone ? noPress : onPress} disabled={isCountdownInProgress || countdownDone} >
            
            <span className={`status-text ${isCountdownInProgress || countdownDone ? 'disabled-text' : ''}`}>Resend Otp code</span>
        </div>
    )
}

export default ResendOtp