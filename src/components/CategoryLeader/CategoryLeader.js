import React from 'react';
import { formatNumber } from '../../utils/stringUtl';
import OtherLeaders from '../OtherLeaders/OtherLeaders';
import './CategoryLeader.scss';

const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function CategoryLeader({ category ,leaders}) {
    if (leaders === null || leaders === undefined || leaders.length === 0) {
        return <></>
    }
    return (
        <div className='category-container'>
            <p className='category-title'>{category}</p>
            <CategoryTopLeaders leaders={leaders}  />
            <OtherLeaders styleProp='category' userStyleProp='category-user' leaders={leaders} />
        </div>
    )
}

export default CategoryLeader

function CategoryTopLeaders({leaders}) {
    const topLeaders = leaders?.slice(0, 3) ?? null;
    const firstLeader = topLeaders[0] ?? { username: "..." };
    const secondLeader = topLeaders[1] ?? { username: "..." };
    const thirdLeader = topLeaders[2] ?? { username: "..." };

    return (
        <div className='top-leaders'>
            <CategoryTopLeader
                position='3'
                name={`${thirdLeader.username}`}
                point={`${thirdLeader.points ? `${thirdLeader.points}` : 0}`}
                avatar={thirdLeader.avatar}
            />
            <CategoryTopLeader
                position='1'
                name={`${firstLeader.username}`}
                point={`${firstLeader.points ? `${firstLeader.points}` : 0}`}
                avatar={firstLeader.avatar}
                topLeaderStyle='firstPosition'
            />
            <CategoryTopLeader
                position='2'
                name={`${secondLeader.username}`}
                point={`${secondLeader.points ? `${secondLeader.points}` : 0}`}
                avatar={secondLeader.avatar}
            />
        </div>
    )
}

function CategoryTopLeader({ name, position, point, topLeaderStyle, avatar }) {
    return (
        <div className={`categoryLeader-container ${topLeaderStyle}`}>
            <div className='avatar-case'>
                <img src={avatar ? `${backendUrl}/${avatar}` : "/images/user-icon.png"}
                    alt='avatar'
                    onError={(e) => e.target.style.display = 'none'} />
            </div>
            <div className='number-conatiner'>
                <p className='number'>{formatNumber(position)}</p>
            </div>
            <p className='name'>{name}</p>
            <div className='leader-point'>
                <p className='point'>{formatNumber(point)} pts</p>
            </div>
        </div>
    )
}