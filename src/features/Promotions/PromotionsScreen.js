import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logToAnalytics from "../../utils/analytics";


import './PromotionsScreen.scss'
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader";

const PromotionsScreen = () => {
    const navigate = useNavigate();
    const [isNewPromotion] = useState(true);
    const user = useSelector(state => state.auth.user);

    const navigateHandler = () => {
        navigate('/dashboard');
    }

    const promotions = [
        {
            "id": 1,
            "bannerImage": "/images/bonus-banner1.png",
            "innerBanner": "/images/bonus-banner2.png",
            "name": 'Welcome Bonus',
            "description": 'Get an instant 100% Cashback bonus on your first deposit to a limit of N10,000! You can use your bonus amount to stake and earn cash. Bonus expires in 7 days. Terms and conditions apply.'
        },
        {
            "id": 2,
            "bannerImage": "/images/cashback-bonus-banner1.png",
            "innerBanner": "/images/cashback-bonus-banner2.png",
            "name": 'Up for grabs',
            "description": "Get 10% cashback on your losses daily! We've got you covered. The higher your stakes, the bigger your bonus! Bonus expires in 3 Days. Terms and conditions apply."
        },
    ]


    return (
        <div style={{ backgroundImage: "url(/images/game-play-background.png)" }} className={isNewPromotion ? "promotions-container" : 'no-promotions-container'}>
            <ScreenHeader title='Promotions' styleProp='header' iconProp='backIcon' onClick={navigateHandler} />

            {!isNewPromotion ?
                <div className="image-container">
                    <div className="image-avatar">
                        <img
                            src="/images/gift-dynamic.png"
                            alt='gift'
                            className='avatar'
                        />
                    </div>
                    <span className="no-promotions-text">No promotions yet, check back later</span>
                </div>
                :
                <div className="banners-container">
                    {
                        promotions.map((promotion, i) => <PromotionBanner key={i} promotion={promotion} user={user}
                        />)
                    }
                </div>

            }
        </div>
    )
}

const PromotionBanner = ({ promotion, user }) => {
    const navigate = useNavigate();

    const viewPromotion = () => {
        logToAnalytics("promotions_button_clicked", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
            'promotion_title': promotion.name,
        })
        navigate('/promotion', {
            state: {
                promotion_title: promotion.name,
                inner_banner: promotion.innerBanner,
                promotion_description: promotion.description,
            }
        })
    }

    return (
        <div className="banner-container" onClick={viewPromotion}>
            <img
                src={promotion.bannerImage}
                alt='banner'
                className='trivia-avatar'
            />
        </div>
    )
}
export default PromotionsScreen;