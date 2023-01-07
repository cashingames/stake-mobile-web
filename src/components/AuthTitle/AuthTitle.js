import React from 'react';
import './AuthTitle.scss'



const AuthTitle = ({titleText, styleProp}) => {
    return (
        <p className={`authHeader ${styleProp}`}>{titleText}</p>
    )
}
export default AuthTitle