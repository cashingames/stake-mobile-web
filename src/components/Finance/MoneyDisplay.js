import { formatCurrency } from './../../utils/stringUtl';
import './MoneyDisplay.scss';

function MoneyDisplay({ amount }) {
    return (
        <div className="money-display">
            <span className="money-display-currency">NGN&nbsp;</span>
            <span className="money-display-text">{formatCurrency(amount)}</span>
        </div>
    );
}


export default MoneyDisplay;
