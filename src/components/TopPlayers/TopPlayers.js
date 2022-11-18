import React from 'react';
import Avatar from '@mui/material/Avatar';
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
                    <div className='leaderProfile'>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" 
                    />
                    <p className='leaderName'>Remy</p>
                    </div>
                    <img src='/images/position3.png'   alt='third position' />
                    <div className='leaderPoints'>
                        <p className='point'>77 pts</p>
                    </div>
                </div>
                <div className='positionContainer'>
                <div className='leaderProfile'>
                    <Avatar>
                        <Person />
                    </Avatar>
                    <p className='leaderName'>James</p>
                    </div>
                    <img src='/images/position1.png' alt='third position' />
                    <div className='leaderPoints'>
                        <p className='point'>22.4 pts</p>
                    </div>
                </div>
                <div className='positionContainer'>
                <div className='leaderProfile'>
                    <Avatar alt="Sharp" src="/static/images/avatar/1.jpg" />
                    <p className='leaderName'>Sharp</p>
                    </div>
                    <img src='/images/position2.png' alt='third position' />
                    <div className='leaderPoints'>
                        <p className='point'>63.5 pts</p>
                    </div>
                </div>
                </div>
            </div>
    </>

  )
}

export default TopPlayers