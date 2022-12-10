import React, {useState } from "react";
import { Spinner } from "react-activity";
import {useSelector } from "react-redux";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import StakingPredictionTable from '../../../components/StakingPredictionTable/StakingPredictionTable'
import { formatCurrency } from '../../../utils/stringUtl'
import { canStake } from "../GameSlice";
import './GameStaking.scss'


const GameStaking = () => {
    // const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    // const gameStakes = useSelector(state => state.game.gameStakes);
    const maximumExhibitionStakeAmount = useSelector(state => state.common.maximumExhibitionStakeAmount);
    const minimumExhibitionStakeAmount = useSelector(state => state.common.minimumExhibitionStakeAmount);
    console.log(minimumExhibitionStakeAmount)
    const [amount, setAmount] = useState(200);
    const [amountErr, setAmountError] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [canSend, setCanSend] = useState(true)


    const onChangeStakeAmount = (e) => {
        const amount = e.currentTarget.value;

        if (Number.parseFloat(amount) < Number.parseFloat(minimumExhibitionStakeAmount)) {
            setAmountError(true)
        }
        else setAmountError(false)

        if (Number.parseFloat(amount) > Number.parseFloat(maximumExhibitionStakeAmount)) {
            setAmountError(true)
        } else setAmountError(false)
        setAmount(amount)
    }

    const startGame = async () => {
        setLoading(true);
        // if (Number.parseFloat(user.walletBalance) < Number.parseFloat(amount)) {
        //     await analytics().logEvent('exhibition_staking_low_balance', {
        //         'id': user.username,
        //         'phone_number': user.phoneNumber,
        //         'email': user.email
        //     });
        //     openBottomSheet();
        //     setLoading(false);
        //     return
        // }

        canStake({ staking_amount: amount })
            .then(async response => {
                // openBottomSheet();
                setLoading(false);
            },

                err => {
                    if (!err || !err.response || err.response === undefined) {
                        alert("Your Network is Offline.");
                        setLoading(false);
                    }
                    else if (err.response.status === 400) {
                        alert(err.response.data.message);
                        setLoading(false);

                    }
                }
            )
    }

    // useEffect(() => {
    //     const invalid = amountErr || amount === '';
    //     setCanSend(!invalid);
    // }, [amount, amountErr])

    return (
        <>
            <ScreenHeader title='Game Staking' styleProp='staking' />
            <div className="staking-container">
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
                            onChange={e => onChangeStakeAmount(e)}
                            required
                        />
                        {amountErr &&
                            <span className='inputError'>*Minimum stake amount is {minimumExhibitionStakeAmount} naira
                                and Maximum stake amount is {maximumExhibitionStakeAmount} naira`
                            </span>
                        }
                    </div>
                    <div className="buttonContainer">
                    <button onClick={startGame} disabled={loading} className='start-button'>
                        <p className="start-text">{loading ? <Spinner
                            color='#ffff'
                            size={10} /> : "Stake Amount"} </p>
                    </button>
                    </div>
                </div>
                <div className="predictionContainer">
                    <p className="predictionHeading">Predictions Table</p>
                    <div className="predictionHeaders">
                            <p className="stakeWinning">WINNINGS</p>
                            <p className="stakeWinning">SCORE</p>
                            <p className="stakeWinning">ODDS</p>
                    </div>
                </div>
                <StakingPredictionTable />
                <StakingPredictionTable />
                <StakingPredictionTable />
                <StakingPredictionTable />

            </div>
        </>
    )
}
export default GameStaking;