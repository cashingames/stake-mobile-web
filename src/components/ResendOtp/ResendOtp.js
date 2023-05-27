import './ResendOtp.scss'

const ResendOtp = ({ onPress, isCountdownInProgress, countdowvnDone}) => {
    return (
        <div className={`resend-timer-container ${isCountdownInProgress || countdowvnDone ? 'disabled' : ''}`} onClick={onPress} disabled={isCountdownInProgress || countdowvnDone}>
            
            <span className={`status-text ${isCountdownInProgress || countdowvnDone ? 'disabled-text' : ''}`}>Resend Otp code</span>
        </div>
    )
}

export default ResendOtp