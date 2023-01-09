import React from 'react'
import { formatNumber } from '../../utils/stringUtl'
import './OtherLeaders.scss';

const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function OtherLeaders({ leaders }) {
    const currentLeader = leaders?.slice(3, leaders.length) ?? null;
    if (currentLeader === null) {
        return <></>;
    }
    return (
        <div>
            {currentLeader.map((leader, i) => <OtherLeader key={i} leader={leader}
                position={formatNumber(i + 4)}
            />)}
        </div>
    )
}

const OtherLeader = ({leader, position}) => {
    return (
        <div className='otherLeader-container'>
            <div className='avatar-case'>
                <div className='avatar-container'>
                    <img
                        src={leader.avatar ? `${backendUrl}/${leader.avatar}` : "/images/user-icon.png"}
                        className='avatar'alt='avatar'
                        onError={(e) => e.target.style.display = 'none'}

                    />
                </div>
                <div className='user-points'>
                    <p className='user'>{`${leader.username}`}</p>
                    <p className='points'>{formatNumber(leader.points)} pts</p>
                </div>
            </div>
            <div className='rank-case'>
                <p className='rank'>{position}</p>
            </div>
        </div>
    )
}

export default OtherLeaders