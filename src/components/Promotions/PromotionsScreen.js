import React, { useState } from "react";
import { useSelector } from "react-redux";
import ScreenHeader from "../ScreenHeader/ScreenHeader";
import { useNavigate } from "react-router-dom";
import './PromotionsScreen.scss'
import logToAnalytics from "../../utils/analytics";



const PromotionsScreen = () => {
    const navigate = useNavigate();
    const [isNewPromotion] = useState(false);
    const user = useSelector(state => state.auth.user);

    const navigateHandler = () => {
        navigate('/dashboard');
    }

    const promotions = [
        {
            "id": 1,
            "bannerImage": "/images/trivia-banner.png",
            "name": 'Weekly trivia'
        },
        {
            "id": 2,
            "bannerImage": "/images/trivia-banner.png",
            "name": 'Wise weekly trivia'
        },
    ]


    return (
        <>
            <ScreenHeader title='Promotions' styleProp='header' iconProp='backIcon' onClick={navigateHandler} />
            <div style={{ backgroundImage: "url(/images/game-play-background.png)" }} className={isNewPromotion ? "promotions-container" : 'no-promotions-container'}>
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
        </>
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