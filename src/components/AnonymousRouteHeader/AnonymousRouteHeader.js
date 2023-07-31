import React from "react";

import { IoChevronBack, IoClose } from 'react-icons/io5'
import './AnonymousRouteHeader.scss'

function AnonymousRouteHeader({ title, styleProp, isClose, noClose, onClick }) {
    return (
        <div className={`anonymousRouteHeader ${styleProp}`}>
            {noClose &&
                <IoChevronBack size={26} className='icon'
                    onClick={onClick} />
            }
            {isClose &&
                <div className="exit-container">
                    <IoClose size={26} className='icon'
                        onClick={onClick} />
                </div>
            }
            <h1 className='title'>{title}</h1>
            <div></div>
        </div>
    )
}

export default AnonymousRouteHeader;