import React from 'react'
import './ChallengeParticipants.scss'

function ChallengeParticipants({player}) {
    return (
        <div style={{ backgroundImage: "url(/images/challenge-stage.png)" }} className="spImages">
           {player.challengerStatus === "COMPLETED" &&
        player.opponentStatus === "COMPLETED" ?
                <div className='winDetails'>
                    <div className='wlContainer'>
                    {player.challengerPoint > player.opponentPoint &&
                            <img src='/images/first-crown.png' alt='crown' className='winLose' />
                        }
                        <ChallengeDetails challenger={player} />
                    </div>
                    <img src='/images/versus.png' alt='versus' />
                    <div className='wlContainer'>
                    {player.opponentPoint > player.challengerPoint &&
                            <img src='/images/first-crown.png' alt='crown' className='winLose' />
                        }
                        <OpponentDetails opponent={player}  />
                    </div>
                </div>
                :
                <div className='winDetails'>
                        <div className='wlContainer'>
                            <ChallengeDetails challenger={player} />
                        </div>
                        <img src='/images/versus.png' alt='versus' />
                        <div className='wlContainer'>
                            <OpponentDetails opponent={player}  />
                        </div>
                    </div>

            }
        </div>
    )
}

export default ChallengeParticipants

const OpponentDetails = ({ opponent }) => {
    return (
        <div className='opponentAvatarCase'>
            <div className='spAvatar'>
                <img 
                src={opponent.opponentAvatar ? opponent.opponentAvatar : "/images/user-icon.png"}
                alt='user' onError={(e) => e.target.style.display = 'none'} />
            </div>
            <p className='spUsername'>@{opponent.opponentUsername}</p>
        </div>
    )
}

const ChallengeDetails = ({ challenger }) => {
    return (
        <div className='challengerAvatarCase'>
            <div className='spAvatar'>
                <img 
                src={challenger.challengerAvatar ? challenger.challengerAvatar : "/images/user-icon.png"}
                alt='user' onError={(e) => e.target.style.display = 'none'} />
            </div>
            <p className='spUsername'>@{challenger.challengerUsername}</p>
        </div>
    )
}