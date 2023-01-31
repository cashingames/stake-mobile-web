import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { formatNumber } from '../../utils/stringUtl';
import './UserPoints.scss'

function UserPoints({ user }) {

  var plans = useSelector(state => state.auth.user.activePlans ?? []);
  var boosts = useSelector(state => state.auth.user.boosts ?? []);
  const [boostsString, setBboostsString] = useState('');

  useEffect(() => {   

    var boostResult = ''
    // eslint-disable-next-line
    boosts && boosts.map((boost, i) => {
      boostResult += `${formatNumber(boost.count)} ${boost.name}${i === boosts.length - 1 ? '' : ','} `
    });

    setBboostsString(boostResult?.length > 0 ? boostResult : "You have no boosts");

  }, [boosts, plans]);

  return (
    <div className='userPoints'>
      <div className='pointsNumber'>
        <p>{user.todaysPoints}</p>
        <p>pts</p>
        <p>TODAY</p>
      </div>
      <div className='pointsNumber'>
        <p className={boosts?.length > 0 ? 'text2' : 'emptyRow'}>{boostsString}</p>
      </div>
      <img src='images/point-trophy.png' alt='trophy' className='trophy' />
    </div>
  )
}

export default UserPoints