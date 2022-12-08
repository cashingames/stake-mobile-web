import React from "react";
import { IoCheckmarkCircleOutline, IoTimeOutline } from "react-icons/io5";
import './StakingPredictionTable.scss'

const StakingPredictionTable = () => {
    return(
        <div className="stakeCase">
            <p className="stakeWinnings">&#8358;1000.00</p>
            <div className="stakeScoreContainer">
                <IoCheckmarkCircleOutline  size={16}/>
                <p className="stakeScore">10/10</p>
            </div>
            <div className="oddsContainer">
                <IoTimeOutline size={15} color='#FF932F'/>
                <p className="odds">x5</p>
            </div>
        </div>
    )
}

export default StakingPredictionTable