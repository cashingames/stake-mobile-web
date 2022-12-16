import React from 'react'
import { IoWarningOutline } from 'react-icons/io5'
import './LiveTriviaEntryFailed.scss'

function LiveTriviaEntryFailed({pointsRequired, userPoints, onClick}) {
  return (
    <div className='triviaBSheet'>
        <IoWarningOutline  size={100} color="#FFEE03" className='triviaBSheetIcon'/>
        <p className='BSheetPoints'>Required Points : {pointsRequired}pts</p>
        <p className='BSheetPoints'>Your points gained today : {userPoints}pts</p>
        <p className='BSheetText'> Play more fun games to qualify to play this live trivia</p>
        <button onClick={onClick} className='BSheetBtn'>close</button>
    </div>
  )
}

export default LiveTriviaEntryFailed