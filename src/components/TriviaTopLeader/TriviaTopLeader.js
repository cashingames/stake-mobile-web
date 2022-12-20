import { IoAlarm } from 'react-icons/io5'
import './TriviaTopLeader.scss'

const TriviaTopLeader = ({position, username, duration, point}) => {

    let backgroundColor = "";
    let trophyImageUrl = {};
    let fontColor = "";

    if (position === 1) {
        backgroundColor = "#FFD700";
        trophyImageUrl = '/images/first-crown.png';
        fontColor = "#000000";
    }
    else if (position === 2) {
        backgroundColor = "#2D9CDB";
        trophyImageUrl = '/images/second-crown.png';
        fontColor = "#FFFF";
    }
    else if (position === 3) {
        backgroundColor = "#9C3DB8";
        trophyImageUrl = '/images/third-crown.png';
        fontColor = "#FFFF";
    }

    return(
        <div className='topParticipant' style={{backgroundColor: backgroundColor}}>
            <div className='participantLeft'>
                <img src='/images/user-icon.png' alt='user' className='triviaPlayerImg'/>
                <div className='positionName'>
                    <p className='topParticipantUname' style={{color:fontColor}}>{username}</p>
                    <div className='playerDuration'>
                        <IoAlarm size={18} color={fontColor}/>
                        <p className='topParticipantUname' style={{color:fontColor}}>{duration}secs</p>
                    </div>
                </div>
            </div>
            <div className='pointsContainer'>
                <p className='topParticipantsPoint' style={{color:fontColor}}>{point}pts</p>
                <img src='/images/points-coin.png' alt='point'className='pointsIcon'/>
            </div> 
            <div className='topRank'>
            <div className='topRankBottom'>
                <img src={trophyImageUrl} alt="trophy" className='topTrophyImg'/>
                <p className='position'>{position}</p>
            </div>  
            </div> 
        </div>
    )
}

export default TriviaTopLeader