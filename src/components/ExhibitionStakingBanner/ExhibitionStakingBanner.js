import React from "react";
import './ExhibitionStakingBanner.scss'


const ExhibitionStakingBanner = ({onPress}) => {
    return (
        <div className="stakeContainer">
            <p className="stakeAmount">Stand a chance of winning up to 1 Million
                Naira by playing this game
            </p>
            <button className="stakeButton" onClick={onPress}>
                <p className="showMe">PLAY NOW</p>
            </button>
        </div>
    )
}
export default ExhibitionStakingBanner;