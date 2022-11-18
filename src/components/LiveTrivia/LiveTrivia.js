import React from 'react';
import { IoTimerOutline } from 'react-icons/io5';
import './LiveTrivia.scss'

function LiveTrivia() {
  return (
    <div className='trivialContainer'
    style={{ backgroundImage: "url(/images/live-trivia-card-background-blue.png)" }}>
        <div className='trivialTopTexts'>
            <p className='topText'> Thurday Live Trivia</p>
            <div className='requiredText'>
            <p>0 pts</p>
            <p>Required</p>
            </div>
        </div>
        <div className='trivialInfo'>
            <p className='triviaTitle'> WIN: &#8358;10,000</p>
            <p className='triviaTime'>Play Tomorrow at 9:00 PM</p>
        </div>
        <div className='trivaImg'>
          <div className='timer'>
            <IoTimerOutline />
            <p>Starts in 1d 8h 30m 51s</p>
          </div>
          <img src='/images/yellow-line-bottom.png' alt='bottom line' />
        </div>
    </div>

  )
}

export default LiveTrivia