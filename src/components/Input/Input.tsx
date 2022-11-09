import React from 'react';
import styles from './Input.module.scss'



const Input = ({ inputLabelText, placeholderText, inputType, minLength, maxLength }: any) => {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>{inputLabelText}</label>
            <input className={styles.inputBox} type={inputType} placeholder={placeholderText} minLength={minLength} maxLength={maxLength} />
        </div>
    )
}
export default Input;