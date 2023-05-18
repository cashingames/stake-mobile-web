import React from "react";

import { IoChevronBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import './AnonymousRouteHeader.scss'

function AnonymousRouteHeader({ title, styleProp }) {
    const navigate = useNavigate()
    return (
        <div className={`anonymousRouteHeader ${styleProp}`}>
            <div className="headerTitle">
                <IoChevronBack size={24} className='icon'
                    onClick={
                        () => navigate(-1)
                    } />
                <h1 className='title'>{title}</h1>
            </div>
        </div>
    )
}

export default AnonymousRouteHeader;