import React, { useState } from 'react'
import './OtherLeaders.scss'

function OtherLeaders({styleProp, userStyleProp}) {
    const [state] = useState(true)
  return (
    <div className={`${styleProp} otherleader-container`}>
        { state ? 
        <>
        <OtherLeader userName='adams2034' position={6} points={33} userStyleProp={userStyleProp}/>
        <OtherLeader userName='adams2034' position={6} points={33} userStyleProp={userStyleProp}/>
        <OtherLeader userName='adams2034' position={6}  points={33} userStyleProp={userStyleProp}/>
        </>
        :
        <p className='no-data'>No Data</p>
}
    </div>
  )
}

function OtherLeader({points, userName, position, userStyleProp}) {
    return(
        <div className='other-container'>
            <div className='avatar-container'>
                <div className='avatar-case'>
                    <img src='images/user-icon.png' alt='user'
                    onError={(e) => e.target.style.display='none'} />
                    </div>
                    <div className='name-points'>
                        <p className={userStyleProp}>{userName}</p>
                        <p className='points'>{points}pts</p>
                    </div>
                </div>
                <div className='position'>
                    <p className='position-text'>{position}</p>
                </div>
            </div>
        )
    }

export default OtherLeaders;
