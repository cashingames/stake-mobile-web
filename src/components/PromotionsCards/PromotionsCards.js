import React, { useState } from "react";
import './PromotionsCards.scss';
import { IoChevronForwardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logToAnalytics from "../../utils/analytics";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/stringUtl";

const PromotionsCards = () => {

    const user = useSelector(state => state.auth.user);



    const [isNewPromotion] = useState(true);
    const [isCashDrop] = useState(false);
    return (
        <div className="leaders-container">
            {/* <BoostsCard /> */}
            <PromotionsBoard isNewPromotion={isNewPromotion} user={user} />
            <CashDrop isCashDrop={isCashDrop} user={user} />
            {/* <ChallengeLeaderboard /> */}
        </div>
    )
}

const CashDrop = ({ isCashDrop, user }) => {
    let navigate = useNavigate();

    const checkAvailableCashDrop = () => {
        logToAnalytics('cashdrop_tab_clicked', {
            'username': user.username,
            'phone_number': user.phone_number,
            'email': user.email
        });
        navigate('/cash-drop')
    }

    const doNothing = () => {

    }

    return (
        <div className="top-leaders-container" style={{ opacity: !isCashDrop ? 0.4 : 1 }} onClick={isCashDrop? checkAvailableCashDrop : doNothing}>
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
                    {isCashDrop ?
                        <p className="top-leaders-headerii">NGN {formatCurrency(348000)}</p>
                        :
                        <p className="top-leaders-headeri">Lucky winners win the pools</p>
                    }
                </div>
            </div>
            {isCashDrop ?
                <div className="live-container">
                    <img src='/images/star.png' alt='start' className='star' />
                    <span className="live-text">Live Now</span>
                </div>
                :
                <IoChevronForwardOutline size={22} className='icon' color="#1C453B" />
            }

        </div>
    )
}

const PromotionsBoard = ({ isNewPromotion, user }) => {
    let navigate = useNavigate();

    const checkAvailablePromotions = () => {
        logToAnalytics('promotions_tab_clicked', {
            'username': user.username,
            'phone_number': user.phone_number,
            'email': user.email
        });
        navigate('/promotions')
    }

    return (
        <div className="top-leaders-container" style={{ opacity: isNewPromotion ? 1 : 0.4 }} onClick={checkAvailablePromotions}>
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