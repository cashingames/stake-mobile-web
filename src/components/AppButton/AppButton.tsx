import React from 'react';
import styles from './AppButton.module.scss'



const AppButton = ({ buttonText, onClick, disabled }: any) => {
    return (
        <button className={ styles.buttonContainer}
            onClick={onClick} disabled={disabled} type="submit">
            <span className={styles.buttonText}>{buttonText}</span>
        </button>
    )
}
export default AppButton;