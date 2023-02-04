import React from "react";
import { IoCheckmarkCircleOutline, IoTimeOutline } from "react-icons/io5";
import { formatCurrency } from "../../../utils/stringUtl";
import './StakingPredictionsRow.scss'

const StakingPredictionsRow = ({ stake, odd }) => {
    return (
        <tr>
            <td><IoCheckmarkCircleOutline size={16} /><span>{odd.score}</span></td>
            <td><IoTimeOutline size={15} color='#FF932F' /><span className="odds">x{odd.odd}</span></td>
            <td>&#8358;{formatCurrency(stake * odd.odd)}</td>
        </tr>
    )
}

export default StakingPredictionsRow