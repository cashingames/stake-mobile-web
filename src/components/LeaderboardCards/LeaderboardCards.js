import React, { useState } from "react";
import './LeaderboardCards.scss';
import { IoChevronForwardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logToAnalytics from "../../utils/analytics";
import { useSelector } from "react-redux";

const LeaderboardCards = () => {

    const user = useSelector(state => state.auth.user);



    const [isNewPromotion] = useState(true);
    const [isLeaderboard] = useState(false);
    return (
        <div className="leaders-container">
            {/* <BoostsCard /> */}
            <PromotionsBoard isNewPromotion={isNewPromotion} user={user} />
            <TopLeaderboards isLeaderboard={isLeaderboard} />
            {/* <ChallengeLeaderboard /> */}
        </div>
    )
}

const TopLeaderboards = ({isLeaderboard}) => {
    return (
        <div className="top-leaders-container" style={{opacity: isLeaderboard ? 1 : 0.4}}>
            <div className="top-leaders-sub-container">
                <div className="image-avatar">
                    <img
                        src="/images/leader-coin.png"
                        alt='crown'
                        className='avatar'
                    />
                </div>
                <div className="leaders-header-container">
                    <p className="top-leaders-header">Leaderboard</p>
                    <p className="top-leaders-headeri">Top gamers for the week/month</p>
                </div>
            </div>
            <IoChevronForwardOutline size={18} className='icon' />
        </div>
    )
}

const PromotionsBoard = ({isNewPromotion, user}) => {
    let navigate = useNavigate();

    const checkAvailablePromotions = () => {
        logToAnalytics('wallet_amount_clicked', {
            'username': user.username,
            'phone_number': user.phone_number,
            'email': user.email
        });
        navigate('/promotions')
    }

    return (
        <div className="top-leaders-container" style={{opacity: isNewPromotion ? 1 : 0.4}} onClick={checkAvailablePromotions}>
            <div className="top-leaders-sub-container">
                <div className="image-avatari">
                    <img
                        src="/images/promotion-gift.png"
                        alt='crown'
                        className='avatar'
                    />
                </div>
                <div className="leaders-header-container">
                    <p className="top-leaders-header">Promotions</p>
                    <p className="top-leaders-headeri">Daily and weekly promotions</p>
                </div>
            </div>
            <IoChevronForwardOutline size={18} className='icon' />
        </div>
    )
}

// const ChallengeLeaderboard = () => {
//     return (
//         <div className="challenge-container">
//             <p className="top-leaders-header">Challenges</p>
//             <img
//                 src="/images/challenge-coin.png"
//                 alt='crown'
//                 className='avatar'
//             />
//             <p className="top-leaders-text">Daily & weekly challenges</p>
//             <div className="challenge-button">
//                 <p className="play-button-text">Coming Soon!!</p>
//             </div>
//         </div>
//     )
// }

// const BoostsCard = () => {
//     const navigate = useNavigate();

//     const goToStore = () => {
//         logToAnalytics("boost_card_clicked");
//         navigate('/store')
//     };

//     return (
//         <div className="boosts-container" onClick={goToStore}>
//             <p className="top-leaders-header">Boost</p>
//             <img
//                 src="/images/boost-chest.png"
//                 alt='crown'
//                 className='avatar'
//             />
//             <p className="top-leaders-text">Bonuses, Time freeze & Skips</p>
//             <div className="boost-button">
//                 <p className="play-button-text">Learn More</p>
//             </div>
//         </div>
//     )
// }

export default LeaderboardCards;