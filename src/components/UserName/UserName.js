import React from 'react'
import './UserName.scss'

function UserName({userName}) {
  return (
    <div className='nameCase'>
        <p className='name'>{userName}</p>
    </div>
  )
}

export default UserName