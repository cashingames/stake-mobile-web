import React, { useState } from "react";
import './PromotionsCards.scss';
import { IoChevronForwardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logToAnalytics from "../../utils/analytics";
import { useSelector } from "react-redux";

const PromotionsCards = () => {

    const user = useSelector(state => state.auth.user);



    const [isNewPromotion] = useState(true);
    const [isLeaderboard] = useState(false);
    return (
        <div className="leaders-container">
            {/* <BoostsCard /> */}
            <PromotionsBoard isNewPromotion={isNewPromotion} user={user} />
            <CashDrop isLeaderboard={isLeaderboard}/>
            {/* <ChallengeLeaderboard /> */}
        </div>
    )
}

const CashDrop = ({isLeaderboard}) => {
    return (
        <div className="top-leaders-container" style={{opacity: !isLeaderboard ? 0.4 : 1}}>
            <div className="top-leaders-sub-container">
                <div className="image-avatar">
                    <img
                        src="/images/locker-dynamic-color.png"
                        alt='crown'
                        className='avatar'
                    />
                </div>
                <div className="leaders-header-container">
                    <p className="top-leaders-header">Cash drop</p>
                    <p className="top-leaders-headeri">Lucky winners win the pools</p>
                </div>
            </div>
            <IoChevronForwardOutline size={22} className='icon'color="#1C453B"  />
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
                        src="/images/gift-dynamic.png"
                        alt='crown'
                        className='avatar'
                    />
                </div>
                <div className="leaders-header-container">
                    <p className="top-leaders-header">Promotions</p>
                    <p className="top-leaders-headeri">Daily and weekly cashbag</p>
                </div>
            </div>
            <IoChevronForwardOutline size={22} className='icon' color="#1C453B" />
        </div>
    )
}

export default PromotionsCards;