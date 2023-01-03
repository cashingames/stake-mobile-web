import React from 'react'
import { useState } from 'react'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import { Spinner } from "react-activity";
import { formatCurrency } from '../../../utils/stringUtl'
import './ChallengeStaking.scss'
import Dialogue from '../../../components/Dialogue/Dialogue'
import BottomSheet from '../../../components/BottomSheet/BottomSheet';
import LowWallet from '../../../components/LowWallet/LowWallet';
import ChallengeInviteSuccessText from '../ChallengeInviteSuccessText/ChallengeInviteSuccessText';
import { useNavigate } from 'react-router-dom';

function ChallengeStaking() {
    const [openSheet, setOpenSheet] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false)

    const navigate = useNavigate()

    const closeBS = () => {
        setOpenSheet(false)
    }

    const closeAlert = () => {
        setAlertMessage(false)
    }

    const handleNavigation = () => {
        navigate('/')
    }
    return (
        <>
            <ScreenHeader title='Challenge Staking' styleProp='cStakingHeader' onClick={handleNavigation} />
            <div style={
                { backgroundImage: "url(/images/quiz-stage.jpg)" }
            }
                className='cStakinContainer'>
               <SelectedPlayers />
               <InputStake />
            </div>
            <BottomSheet open={openSheet} closeBottomSheet={closeBS} BS={<LowWallet />}/>
            <BottomSheet open={openSheet} closeBottomSheet={closeBS} BS={<ChallengeInviteSuccessText />}/>
            <Dialogue handleClose={closeAlert} open={alertMessage} dialogueMessage={alertMessage}/>

        </>
    )
}

export default ChallengeStaking

const SelectedPlayers = () => {
    return(
        <div style={{ backgroundImage: "url(/images/challenge-stage.png)" }} className="spImage">
            <SelectedPlayer name='John'/>
            <img src='/images/versus.png' alt='versus' />
            <SelectedPlayer name='Petergghejjj' />
        </div>
    )
}

const SelectedPlayer = ({name}) => {
    return(
        <div className='avatarBg'>
            <div className='spAvatar'>
                <img src='images/user-icon.png' alt='user' onError={(e) => e.target.style.display='none'} />
            </div>
            <p className='spUsername'>@{name}</p>
        </div>
    )
}

const InputStake = () => {
    const [amount, setAmount] = useState(200);
    const [amountErr] = useState(false);
    const [loading] = useState(false)
    return(
        <div className="amountContainers">
        <div className="walletContainer">
            <p className="wallet">Wallet Balance : &#8358;{formatCurrency(200)}</p>
        </div>
        <div className="inputContainer">
            <input
                placeholder="Enter Stake Amount"
                type='number'
                value={amount}
                className='stakeInput'
                onChange={e => setAmount(e.target.value)}
                required
            />
            {amountErr &&
                <span className='inputError'>*Minimum stake amount is 100 naira
                    and Maximum stake amount is 1000 naira`
                </span>
            }
        </div>
        <div className="buttonContainer">
            <button  className='start-button'>
                <p className="start-text">{loading ? <Spinner
                    color='#ffff'
                    size={10} /> : "Stake Amount"} </p>
            </button>
        </div>
    </div>
    )
}