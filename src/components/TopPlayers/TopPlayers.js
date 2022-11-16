import React from 'react';
import Avatar from '@mui/material/Avatar';
import image from '../../assets/images/position3.png'
import image2 from '../../assets/images/position1.png'
import image3 from '../../assets/images/position2.png'
import { IoArrowForward } from "react-icons/io5";
import { Person } from '@mui/icons-material';
import './TopPlayers.scss'

function TopPlayers() {
  return (
    <>
        <div className='topPlayerContainer'>
            <div className='wrapper'>
            <p className='topPlayer'>Top Players</p>
            <div className='extended'>
            <p className='extendedText'>Extended leaderboard</p>
            <IoArrowForward className='icon'/>
            </div>
            </div>
            <div className='leaderBoard'>
                <div className='positionContainer'>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <p className='leaderName'>Remy</p>
                    <img src={image} alt='third position' />
                </div>
                <div className='positionContainer'>
                    <Avatar>
                        <Person />
                    </Avatar>
                    <p className='leaderName'>James</p>
                    <img src={image2} alt='third position' />
                </div>
                <div className='positionContainer'>
                    <Avatar alt="Sharp" src="/static/images/avatar/1.jpg" />
                    <p className='leaderName'>Sharp</p>
                    <img src={image3} alt='third position' />
                </div>
                </div>
            </div>
    </>

  )
}

export default TopPlayers