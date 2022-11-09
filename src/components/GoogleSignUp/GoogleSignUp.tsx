import React from 'react';
import styles from './GoogleSignUp.module.scss'



const GoogleSignUp = ({ buttonText }: any) => {
    return (
        <div className={styles.googleButtonContainer}>
            <p className={styles.googleButtonText}>{buttonText} with Google</p>
            <div className={styles.googleButtonImage}>
                <img src="/images/google_icon.png" alt="banner" style={{width: '.6rem', height:'.6rem'}} />
            </div>
        </div>
    )
}
export default GoogleSignUp