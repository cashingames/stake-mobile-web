import React, { useState } from 'react'
import { formatNumber } from '../../utils/stringUtl';
import './OtherLeaders.scss';

const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function OtherLeaders({ styleProp, userStyleProp, leaders }) {

    const currentLeaders = leaders?.slice(3, leaders.length) ?? null;
    if (currentLeaders === null) {
        return <></>;
    }

    return (
        <div className={`${styleProp} otherleader-container`}>
            {currentLeaders.map((leader, i) => <OtherLeader key={i} leader={leader}
                position={formatNumber(i + 4)}
                userStyleProp={userStyleProp}
            />)}

            {currentLeaders.length === 0 && <p className='no-data'>No Data</p>}

        </div>
    )
}

function OtherLeader({ leader, position, userStyleProp }) {
    return (
        <div className='other-container'>
            <div className='avatar-container'>
                <div className='avatar-case'>
                    <img
                        src={leader.avatar ? `${backendUrl}/${leader.avatar}` : "/images/user-icon.png"}
                        className='avatar' alt='avatar'
                        onError={(e) => e.target.style.display = 'none'}

                    />
                </div>
                <div className='name-points'>
                    <p className={userStyleProp}>{leader.username}</p>
                    <p className='points'>{formatNumber(leader.points)} pts</p>
                </div>
            </div>
            <div className='position'>
                <p className='position-text'>{position}</p>
            </div>
        </div>
    )
}

export default OtherLeaders;
