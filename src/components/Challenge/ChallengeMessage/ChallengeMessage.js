
import './ChallengeMessage.scss'

const ChallengeMessage = ({ username, status, challengeDetails }) => {
    return (
        <div className='cmContainer'>
            {status ?
                <>
                    {status === 'WON' &&
                        <>
                            <p className='csTopText'>Congrats {username}</p>
                            <p className='csBottomText'>You won this challenge</p>
                        </>
                    }
                    {status === 'LOST' &&
                        <>
                            <p className='csTopText'>Sorry {username}</p>
                            <p className='csBottomText'>You lost this challenge</p>
                        </>
                    }
                    {status === 'DRAW' &&
                        <>
                            <p className='csTopText'> Draw</p>
                            <p className='csBottomText'>This challenge ended a draw, you can challenge each other again</p>
                        </>
                    }
                </>

                :
                <>
                { challengeDetails === 'invited' &&
                    <p className='cProgress'>You have been invited to a challenge</p>
                }
                { challengeDetails === 'pending' &&
                    <p className='cProgress'>Your opponent has not responded to this challenge</p>
                }
                { challengeDetails === 'inProgress' &&
                    <p className='cProgress'>This challenge is still in progress</p>
                }
                </>
            }
        </div>
    )
}

export default ChallengeMessage