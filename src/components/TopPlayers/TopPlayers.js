import React from 'react';
import Avatar from '@mui/material/Avatar';
import { IoArrowForward } from "react-icons/io5";
import { Person } from '@mui/icons-material';
import './TopPlayers.scss'
import { formatNumber } from '../../utils/stringUtl';

const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function TopPlayers({ leaders }) {
    const topLeaders = leaders?.slice(0, 3) ?? null;
    const firstLeader = topLeaders[0] ?? { username: "..." };
    const secondLeader = topLeaders[1] ?? { username: "..." };
    const thirdLeader = topLeaders[2] ?? { username: "..." };
    return (
        <>
            {topLeaders.length > 0 ?
                <>
                    <div className='topPlayerContainer'>
                        <div className='wrapper'>
                            <p className='topPlayer'>Top Players</p>
                            <div className='extended'>
                                <p className='extendedText'>Extended leaderboard</p>
                                <IoArrowForward className='icon' />
                            </div>
                        </div>
                        <div className='leaderBoard'>
                            <TopLeader
                                podPosition='/images/position3.png'
                                name={`${thirdLeader.username}`}
                                point={`${formatNumber(thirdLeader.points ? `${thirdLeader.points}` : 0)} pts`}
                                avatar={thirdLeader.avatar} />

                            <TopLeader
                                podPosition='/images/position1.png'
                                name={`${firstLeader.username}`}
                                point={`${formatNumber(firstLeader.points ? `${firstLeader.points}` : 0)} pts`}
                                avatar={firstLeader.avatar} />
                            <TopLeader
                                podPosition='/images/position2.png'
                                name={`${secondLeader.username}`}
                                point={`${formatNumber(secondLeader.points ? `${secondLeader.points}` : 0)} pts`}
                                avatar={secondLeader.avatar} />
                        </div>
                    </div>
                </>
                :
                <></>
            }
        </>
    )
}

function TopLeader({ avatar, podPosition, name, point }) {
    return (
        <div className='positionContainer'>
            <img
                src={avatar ? `${backendUrl}/${avatar}` : "/images/user-icon.png"}
                className='avatar'
            />
            <p className='leaderName'>{name}</p>
            <img
                className='icon'
                src={podPosition}
            />
            <div className='leaderPoint'>
                <p className='point'>{point}</p>
            </div>
        </div>
    );
}

export default TopPlayers