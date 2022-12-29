import React from 'react'
import './ChallengeParticipants.scss'

function ChallengeParticipants({score}) {
    return (
        <div style={{ backgroundImage: "url(/images/challenge-stage.png)" }} className="spImages">
            {score ?
                <div className='winDetails'>
                    <div className='wlContainer'>
                        {score > 10 &&
                            <img src='/images/first-crown.png' alt='crown' className='winLose' />
                        }
                        <ChallengeDetails name='John' />
                    </div>
                    <img src='/images/versus.png' alt='versus' />
                    <div className='wlContainer'>
                        {score < 10 &&
                            <img src='/images/first-crown.png' alt='crown' className='winLose' />
                        }
                        <OpponentDetails name='John' />
                    </div>
                </div>
                :
                <div className='winDetails'>
                        <div className='wlContainer'>
                            <ChallengeDetails name='John' />
                        </div>
                        <img src='/images/versus.png' alt='versus' />
                        <div className='wlContainer'>
                            <OpponentDetails name='John' />
                        </div>
                    </div>

            }
        </div>
    )
}

export default ChallengeParticipants

const OpponentDetails = ({ name }) => {
    return (
        <div className='opponentAvatarCase'>
            <div className='spAvatar'>
                <img src='images/user-icon.png' alt='user' onError={(e) => e.target.style.display = 'none'} />
            </div>
            <p className='spUsername'>@{name}</p>
        </div>
    )
}

const ChallengeDetails = ({ name }) => {
    return (
        <div className='challengerAvatarCase'>
            <div className='spAvatar'>
                <img src='images/user-icon.png' alt='user' onError={(e) => e.target.style.display = 'none'} />
            </div>
            <p className='spUsername'>@{name}</p>
        </div>
    )
}