import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './PromotionScreen.scss';
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader";

const PromotionScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const navigateHandler = () => {
        navigate('/promotions');
    }
    return (
        <>
            <div style={{ backgroundImage: "url(/images/game-play-background.png)" }} className="promotion-container">
                <ScreenHeader title={location.state.promotion_title} styleProp='header' iconProp='backIcon' onClick={navigateHandler} />
                <img
                    src={location.state.inner_banner}
                    alt='banner'
                    className='avatar'
                />

                <div className="details-main-container">
                    <div className="details-container">
                        <span className="details-header">About</span>
                        <span className="details-text">
                            {location.state.promotion_description}
                        </span>
                    </div>
                    {/* <div className="details-container">
                        <span className="details-header">How to participate</span>
                        <span className="details-text">{location.state.promotion_description}</span>
                    </div>
                    <button className='button-container' type='submit'>
                        <span className='buttonText'>Get Now</span>
                    </button> */}
                </div>
            </div>
        </>
    )
}
export default PromotionScreen;