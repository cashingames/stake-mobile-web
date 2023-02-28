import React from 'react'
import { useSelector } from 'react-redux';
import { formatNumber } from '../../utils/stringUtl';

import './UserPoints.scss'

function UserPoints() {

  const boosts = useSelector(state => state.auth.user.boosts ?? []);
  const userPoints = useSelector(state => state.auth.user.points ?? 0);

  let boostsString = boosts.map(boost => `${formatNumber(boost.count)} ${boost.name}`).join(', ');

  if (boosts.length <= 0)
    boostsString = "You have no boosts";

  return (
    <div className='userPoints'>
      <div className='user-boosts'>
        <div className='points-number'>
          <p className='points'>{userPoints}</p>
          <p className='points'>pts</p>
          <p className='points'>TOTAL</p>
        </div>
        <p className={boosts?.length > 0 ? 'text2' : 'emptyRow'}>{boostsString}</p>

        {/* <div className='boosts-square'>
          <p className={boosts?.length > 0 ? 'text2' : 'emptyRow'}>{boostsString}</p>
        </div> */}
        {/* <div className="arrow-right"></div> */}
        {/* <p className='boosts-arrow'></p> */}
      </div>
      <img src='images/point-trophy.png' alt='trophy' className='trophy' />
    </div>
  )
}

export default UserPoints