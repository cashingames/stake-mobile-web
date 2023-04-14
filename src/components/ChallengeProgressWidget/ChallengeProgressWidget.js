import React from 'react'
// import AvailableBoostSession from '../AvailableBoostSession/AvailableBoostSession'
import ChallengeGameWidget from '../ChallengeGameWidget/ChallengeGameWidget';
import './ChallengeProgressWidget.scss'
const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function ChallengeProgressWidget({ onComplete, challengeDetails }) {

    return (
        <div className='gameProgressBoost'>
            <ChallengeGameWidget onComplete={onComplete} />
            {/* <AvailableBoostSession /> */}
            <PlayersInfo challengeDetails={challengeDetails} />
        </div>
    )
}

const PlayersInfo = ({ challengeDetails }) => {
    return (
        <div className='players-container'>
            <UserInfo playerName={challengeDetails.username} playerAvatar={challengeDetails.avatar ? `${backendUrl}/${challengeDetails.avatar}` : "/images/user-icon.png"} />
            <p className='versus'>vs</p>
            <OpponentInfo playerName={challengeDetails.opponent.username} playerAvatar={challengeDetails.opponent.avatar ? `${backendUrl}/${challengeDetails.opponent.avatar}` : "/images/user-icon.png"} />
        </div>
    )
}

const UserInfo = ({ playerAvatar, playerName }) => {
    return (
        <div className='player-container'>
            <p className='user-name'>@{playerName}</p>
            <img src={playerAvatar} alt='user' onError={(e) => e.target.style.display = 'none'} className='player-avatar' />
        </div>
    )
}

const OpponentInfo = ({ playerAvatar, playerName }) => {
    return (
        <div className='player-container'>
            <img src={playerAvatar} alt='user' onError={(e) => e.target.style.display = 'none'} className='player-avatar' />
            <p className='player-name'>@{playerName}</p>
        </div>
    )
}

export default ChallengeProgressWidget