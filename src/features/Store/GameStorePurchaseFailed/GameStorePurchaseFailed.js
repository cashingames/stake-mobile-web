import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './GameStorePurchaseFailed.scss';
const backendUrl = process.env.REACT_APP_API_ROOT_URL;



function GameStorePurchaseFailed() {
    const location = useLocation();
    //disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    return (
        <div className='mainContainer'>
            <div className='boostPurchaseContainer'>
                <p className='paymentHeader'>Payment Unsuccessful...</p>
                <div className='boostImg'>
                    <img src={`${backendUrl}/${location.state.boost_image}`} className="boost-icon" alt='boost' />
                </div>
                <p className='message'>Sorry {location.state.boost_name} purchase was not successful</p>
            </div>
            <div className='failed-btns'>
                <Link to='/' className='action-btn'>Contact Support</Link>
                <Link to='/store' className='action-btn'>Let's try again</Link>
            </div>
        </div>
    )
}

export default GameStorePurchaseFailed