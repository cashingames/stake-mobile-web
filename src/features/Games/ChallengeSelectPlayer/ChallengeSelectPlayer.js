import React from "react";
import { useNavigate } from "react-router-dom";
import './ChallengeSelectedPlayer.scss'
const ChallengeSelectPlayer = () => {
    
    const navigate = useNavigate()

    const navigateHandler = () => {
        navigate('/dashboard')
    }

    return (
        <div className="challengeSelectedPlayer">
        <p className="csTitle">Not Available</p>
        <p className="csText">Click on the button below to go back home</p>
        <button className="csBtn" onClick={navigateHandler}>Home</button>
        </div>
    )
}
export default ChallengeSelectPlayer;