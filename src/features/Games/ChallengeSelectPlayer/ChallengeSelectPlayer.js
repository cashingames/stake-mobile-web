import React, { useState } from "react";
import { IoCheckmarkCircle, IoCheckmarkSharp, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import BottomSheet from "../../../components/BottomSheet/BottomSheet";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import ChallengeInviteSuccessText from "../ChallengeInviteSuccessText/ChallengeInviteSuccessText";
import ChallengeStakingBottomSheet from "../ChallengeStakingBottomSheet/ChallengeStakingBottomSheet";
import Dialogue from '../../../components/Dialogue/Dialogue'
import './ChallengeSelectedPlayer.scss'


const ChallengeSelectPlayer = () => {

    const [input, setInput] = useState('')
    const [isSelected, setIsSelected] = useState(false)
    const [openSheet, setOpenSheet] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false)
    const [state] = useState(true)

    const closeBS = () => {
        setOpenSheet(false)
    }
    
    const closeAlert = () => {
        setAlertMessage(false)
    }

    const navigate = useNavigate()

    const navigateHandler = () => {
        navigate('/dashboard')
    }

    const send = () => {
        setIsSelected(!isSelected)
    }

    return (
        <>
            <ScreenHeader title='Challenge - Select a player' styleProp='csHeader' onClick={navigateHandler}/>
            <div className="csContainer">
                <div className="searchBox">
                    <IoSearch size={20} color="#524D4D" className="csIcon"/>
                    <input 
                        className="csInput"
                        placeholder="Search friend's name"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button className="searchBtn">Search</button>
                </div>
                <div>
                    {state ? 
                    <FriendDetails onClick={send} isSelected={isSelected}/>
                    :
                    <p className="noData">No Data</p>
                    }
                </div>
            </div>
            <SendInviteButton disabled={!isSelected}/>
            <BottomSheet open={openSheet} closeBottomSheet={closeBS} BS={<ChallengeStakingBottomSheet />}/>
            <BottomSheet open={openSheet} closeBottomSheet={closeBS} BS={<ChallengeInviteSuccessText />}/>
            <Dialogue handleClose={closeAlert} open={alertMessage} dialogueMessage={alertMessage}/>
        </>
    )
}
export default ChallengeSelectPlayer;


const FriendDetails = ({isSelected, onClick}) => {
    return(
        <div className={`${isSelected ? 'fdSelected' : 'friendDetails'}`} onClick={onClick}>
            <div className="friendsLeft">
                <div className="fdImgCase">
                    <img src="/images/user-icon.png" alt='user' /> 
                </div>
                <p className="fdUsername">John</p>
            </div>
            <IoCheckmarkCircle color={isSelected && '#EF2F55'}/>
        </div>
    )
}

const SendInviteButton = ({disabled}) => {
    return(
        <button className="sIBtn" disabled={disabled}>
            <IoCheckmarkSharp  size={30} color='#FFFF'/>
        </button>
    )
}