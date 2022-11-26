import React from "react";

import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import './AnonymousRouteHeader.scss'

function AnonymousRouteHeader({ title, styleProp }) {
    const navigate = useNavigate()
    return (
        <div className={`anonymousRouteHeader ${styleProp}`}>
            <img src="/images/logo-small.png" alt="banner" style={{ width: '4rem' }}  onClick={
                        () => navigate('/')
                    } />
            <div className="headerTitle">
                <IoArrowBack className='icon'
                    onClick={
                        () => navigate(-1)
                    } />
                <h1 className='title'>{title}</h1>
            </div>
        </div>
    )
}

export default AnonymousRouteHeader;