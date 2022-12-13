import React from "react";
import { IoCheckmarkCircleOutline, IoTimeOutline } from "react-icons/io5";
import { formatCurrency } from "../../utils/stringUtl";
import './StakingPredictionTable.scss'

const StakingPredictionTable = ({gameStake,amount, styleProp}) => {
    return(
        <div className={`${styleProp} stakeCase`}>
            <p className="stakeWinnings">&#8358;{formatCurrency(amount * gameStake.odd)}</p>
            <div className="stakeScoreContainer">
                <IoCheckmarkCircleOutline  size={16}/>
                <p className="stakeScore">{gameStake.score}/10</p>
            </div>
            <div className="oddsContainer">
                <IoTimeOutline size={15} color='#FF932F'/>
                <p className="odds">x{gameStake.odd}</p>
            </div>
        </div>
    )
}

export default StakingPredictionTable