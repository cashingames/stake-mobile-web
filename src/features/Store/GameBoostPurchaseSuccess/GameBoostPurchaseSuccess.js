import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './GameBoostPurchaseSuccess.scss';
const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function GameBoostPurchaseSuccess() {
    const navigate = useNavigate()
    const location = useLocation();

    const home = () => {
        navigate('/dashboard')
    }

    //disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    return (
        <div className='mainContainer' style={
            { backgroundImage: "url(/images/success-background.png)" }
          }>
            <div className='boostPurchaseContainer'>
                <p className='paymentHeader'>Payment Successful...</p>
                <div className='boostImg'>
                    <img src={`${backendUrl}/${location.state.boost_image}`} className="boost-icon" alt='boost' />
                </div>
                <p className='message'>{location.state.boost_name} was purchased successfully for NGN {location.state.boost_price}</p>
            </div>
                <button className='actionBtn' onClick={home}>Okay, got it</button>
        </div>
    )
}

export default GameBoostPurchaseSuccess