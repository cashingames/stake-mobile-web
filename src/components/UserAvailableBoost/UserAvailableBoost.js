import React from "react"
import { formatNumber } from "../../utils/stringUtl";
import './UserAvailableBoost.scss'


const backendUrl = process.env.REACT_APP_API_ROOT_URL;


const UserAvailableBoost = ({ boost }) => {
    return (
        <div className="boostContent">
            <div className="boostAmount">
                <img
                    src={`${backendUrl}/${boost.icon}`}
                    className="boostIcon" alt={boost.name}
                />
                <p className="amount1">x{formatNumber(boost.count)}</p>
            </div>
            <div className="boostDetails">
                <p className="boostName">{boost.name}</p>
                <p className="boostDescription">{boost.description}</p>
            </div>
        </div>
    )
}
export default UserAvailableBoost;