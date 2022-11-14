import React from 'react';
import './GoogleSignup.scss'



const GoogleSignup = ({ buttonText }) => {
    return (
        <div className='googleButtonContainer'>
            <p className='googleButtonText'>{buttonText} with Google</p>
            <div className='googleButtonImage'>
                <img src="/images/google_icon.png" alt="banner" style={{width: '.6rem', height:'.6rem'}} />
            </div>
        </div>
    )
}
export default GoogleSignup;