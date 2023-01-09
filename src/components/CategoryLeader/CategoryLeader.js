import React from 'react'
import OtherLeaders from '../OtherLeaders/OtherLeaders'
import './CategoryLeader.scss'

function CategoryLeader({title}) {
  return (
    <div className='category-container'>
        <p className='category-title'>{title}</p>
        <CategoryTopLeaders />
        <OtherLeaders styleProp='category' userStyleProp='category-user'/>
    </div>
  )
}

export default CategoryLeader

function CategoryTopLeaders() {
    return(
        <div className='top-leaders'>
            <CategoryTopLeader
                    position='3'
                    name='wondernation'
                    point={6}
                />
            <CategoryTopLeader
                    position='1'
                    name='John'
                    point={6}
                    topLeaderStyle='firstPosition'
                />
            <CategoryTopLeader
                    position='2'
                    name='John'
                    point={6}
                />
        </div>
    )
}

function CategoryTopLeader({ name, position, point, topLeaderStyle}) {
    return(
        <div className={`categoryLeader-container ${topLeaderStyle}`}>
            <div className='avatar-case'>
                <img src='images/user-icon.png' alt='user' 
                onError={(e) => e.target.style.display='none'} />            
            </div>
            <div className='number-conatiner'>
                <p className='number'>{position}</p>
            </div>
            <p className='name'>{name}</p>
            <div className='leader-point'>
                <p className='point'>{point} pts</p>
            </div>
        </div>
    )
}