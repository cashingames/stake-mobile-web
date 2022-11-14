import React from 'react';
import './AuthTitle.scss'



const AuthTitle = ({titleText, styleProp}) => {
    return (
        <h1 className={`authHeader ${styleProp}`}>{titleText}</h1>
    )
}
export default AuthTitle