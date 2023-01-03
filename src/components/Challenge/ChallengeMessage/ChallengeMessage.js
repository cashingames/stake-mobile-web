
import './ChallengeMessage.scss'

const ChallengeMessage = ({ playerPoint, user, challengeDetails, showText, amountWon }) => {
    const challengerwins = playerPoint.challengerPoint > playerPoint.opponentPoint;
    const challengerlose = playerPoint.opponentPoint > playerPoint.challengerPoint;
    const opponentwins = playerPoint.opponentPoint > playerPoint.challengerPoint
    const opponentlose = playerPoint.challengerPoint > playerPoint.opponentPoint
    const draw = playerPoint.opponentPoint === playerPoint.challengerPoint
    return (
        <div className='cmContainer'>
            {playerPoint.challengerStatus === "COMPLETED" &&
                playerPoint.opponentStatus === "COMPLETED" ?
                <>
                    {challengerwins && user.username === challengeDetails.playerUsername &&
                        <>
                            <p className='csTopText'>Congrats {playerPoint.challengerUsername}</p>
                            <p className='csBottomText'>You won this challenge</p>
                        </>
                    }
                    {opponentwins && user.username === challengeDetails.opponentUsername &&
                        <>
                            <p className='csTopText'>Congrats {playerPoint.challengerUsername}</p>
                            <p className='csBottomText'>You won this challenge</p>
                        </>
                    }
                    {opponentlose && user.username === challengeDetails.opponentUsername &&
                        <>
                            <p className='csTopText'>Sorry {playerPoint.opponentUsername}</p>
                            <p className='csBottomText'>You lost this challenge</p>
                        </>
                    }
                    {challengerlose && user.username === challengeDetails.playerUsername &&
                        <>
                            <p className='csTopText'>Sorry {playerPoint.challengerUsername}</p>
                            <p className='csBottomText'>You lost this challenge</p>
                        </>
                    }
                    {draw &&
                        <>
                            <p className='csTopText'> Draw</p>
                            <p className='csBottomText'>This challenge ended a draw, you can challenge each other again</p>
                        </>
                    }
                </>

                :
                <>
                    {user.username === challengeDetails.opponentUsername &&
                        challengeDetails.status === "PENDING" &&
                        <p className='cProgress'>You have been invited to a challenge</p>
                    }
                    {user.username === challengeDetails.playerUsername &&
                        challengeDetails.status === "PENDING" &&
                        <p className='cProgress'>Your opponent has not responded to this challenge</p>
                    }
                    {challengeDetails.status === "ACCEPTED" &&
                        <p className='cProgress'>This challenge is still in progress</p>
                    }
                </>
            }
        </div>
    )
}

export default ChallengeMessage