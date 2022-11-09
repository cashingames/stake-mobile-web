import React from 'react';
import styles from './AuthTitle.module.scss'



const AuthTitle = ({titleText}:any) => {
    return (
        <h1 className={styles.authHeader}>{titleText}</h1>
    )
}
export default AuthTitle