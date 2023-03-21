import React, { useState } from "react";
import { useSelector } from "react-redux";
import LowWallet from "../../../components/LowWallet/LowWallet";
import { formatCurrency } from '../../../utils/stringUtl'

import './StakeAmount.scss'

function StakeAmount({ onSubmit, onChange, amount, setAmount, readOnly, disabled,setOpenDialogue, setAlert}) {

    const user = useSelector((state) => state.auth.user);
    const maximumExhibitionStakeAmount = useSelector(state => Number.parseFloat(state.common.maximumExhibitionStakeAmount ?? 0));
    const minimumExhibitionStakeAmount = useSelector(state => Number.parseFloat(state.common.minimumExhibitionStakeAmount ?? 0));
    const [showLowWallet, setShowLowWallet] = useState(false);

    const validate = () => {

        const lowAmount = amount < minimumExhibitionStakeAmount;
        if (lowAmount) {
            setOpenDialogue(true)
            setAlert(`Minimum amount that can be staked is ${minimumExhibitionStakeAmount}`);
            return false;
        }

        const highAmount = amount > maximumExhibitionStakeAmount;
        if (highAmount) {
            setOpenDialogue(true)
            setAlert(`Maximum amount that can be staked is ${maximumExhibitionStakeAmount}`);
            return false;
        }

        const insufficientFunds = amount > Number.parseFloat(user.walletBalance);
        if (insufficientFunds) {
            setShowLowWallet(true)
            return false;
        }

        return true;
    }

    const submit = () => {
        if (validate())
            onSubmit(amount);
    }

    const amountChanged = (e) => {
        const value = e.currentTarget.value;
        setAmount(value);
        onChange(value);
    }

    return (
        <div className="amountContainer">

            <div className="walletContainer">
                <p className="wallet">Wallet Balance : &#8358;{formatCurrency(user.walletBalance)}</p>
            </div>

            <div className="inputContainer">
                <input
                    placeholder="Enter Stake Amount"
                    type='number'
                    value={amount}
                    className='stakeInput'
                    onChange={amountChanged}
                    readOnly={readOnly}
                    required
                />
            </div>

            <div className="buttonContainer">
                <button onClick={submit} className='start-button' disabled={disabled}>
                    <p className="start-text">Start Game</p>
                </button>
            </div>

            <LowWallet open={showLowWallet} onClose={() => setShowLowWallet(false)} />

        </div>
    )
}

export default StakeAmount;