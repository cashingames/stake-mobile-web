import React from 'react';
import styles from './AppButton.module.scss'



const AppButton = ({ buttonText }: any) => {
    return (
        <div className={styles.buttonContainer}>
            <span className={styles.buttonText}>{buttonText}</span>
        </div>
        )
}
export default AppButton;