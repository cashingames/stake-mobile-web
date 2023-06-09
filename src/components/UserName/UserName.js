import React from 'react'
import './UserName.scss'

function UserName({userName}) {
  return (
    <div className='nameCase'>
        <span className='name'>Hello {userName}</span>
    </div>
  )
}

export default UserName