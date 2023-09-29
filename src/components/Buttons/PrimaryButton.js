
import './PrimaryButton.scss';

const PrimaryButton = ({ text, action, disabled, className }) => {
    return (
        <button
            className={`primary-button ${className}`}
            onClick={action}
            disabled={disabled}
        >
            {text}
        </button>
    )
}
export default PrimaryButton;