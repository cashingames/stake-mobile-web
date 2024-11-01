import { IoAlarm } from 'react-icons/io5'
import './TriviaParticipant.scss'

const TriviaParticipant = ({position, player}) => {

    return(
        <div className='topParticipants'>
            <div className='participantLeft'>
                <img src='/images/user-icon.png' alt='user' className='triviaPlayerImgs'/>
                <div className='positionName'>
                    <p className='topParticipantUname'>{player.username}</p>
                    <div className='playerDuration'>
                        <IoAlarm />
                        <p className='topParticipantUname'>{player.duration}secs</p>
                    </div>
                </div>
            </div>
            <div className='pointsContainer'>
                <p className='topParticipantsPoint'>{player.points}pts</p>
                <img src='/images/points-coin.png' alt='point'className='pointsIcon'/>
            </div> 
            <div className='topRank'>
            <div className='topRankBottom'>
                <img src='/images/gold-ribbon.png' alt="trophy" className='ribbonImg'/>
                <p className='position'>{position}</p>
            </div>  
            </div> 
        </div>
    )
}

export default TriviaParticipant