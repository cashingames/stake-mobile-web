import { Player } from '@lottiefiles/react-lottie-player'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import Challenge from '../../../assets/challenge.json'
import ChallengeEnd from '../../../assets/challenge-end.json'
import { formatCurrency } from '../../../utils/stringUtl'
import ChallengeMessage from '../../../components/Challenge/ChallengeMessage/ChallengeMessage'
import ChallengeParticipants from '../../../components/Challenge/ChallengeParticipants/ChallengeParticipants'
import ResultContainer from '../../../components/Challenge/ResultContainer/ResultContainer'
import ChallengeGameInstruction from '../ChallengeGameInstruction/ChallengeGameInstruction'
import Dialogue from '../../../components/Dialogue/Dialogue'
import './MyChallengeScore.scss'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'

function MyChallengeScore() {

    const [challengeEnd] = useState(false)
    const [challengeStatus] = useState('WON')
    const [challengeDetails] = useState('')
    const [staking] = useState(true)
    const [score] = useState(12)
    const [openSheet, setOpenSheet] = useState(false)
    const [alertMessage, setAlertMessage] = useState(false)

    const navigate = useNavigate()

    const handleNavigation = () => {
        navigate('/')
    }

    const closeBS = () => {
        setOpenSheet(false)
    }

    
    const closeAlert = () => {
        setAlertMessage(false)
    }

    return (
        <>
            <ScreenHeader title='Score' styleProp='mcsScore' onClick={handleNavigation} />
            <div style={
                { backgroundImage: "url(/images/quiz-stage.jpg)" }
            }
                className='mcsContainer'>
                <div className='mcsCase'>
                    {challengeEnd ?
                        <Player src={ChallengeEnd}
                            alt='challenge-end'
                            autoplay
                            loop
                            className='player'
                            style={
                                { height: '110px' }} />
                        :
                        <Player src={Challenge}
                            alt='challenge'
                            autoplay
                            loop
                            className='player'
                            style={
                                { height: '110px' }} />
                    }
                </div>
            <ChallengeMessage username='johndoe' status={challengeStatus} challengeDetails={challengeDetails}/>
            <ChallengeParticipants score={score} />
            {staking && challengeDetails &&
            <div className='mcsStakedContainer'>
                <p className='mcsStake'>Accept challenge to stake <span className='amount'>&#8358;{formatCurrency(100)}</span> and stand a chance of winning double of this amount</p>
            </div>
            }
            {staking && challengeDetails !== 'pending' && challengeDetails !== 'invited' &&
            <div className='mscStakeContainer'>
                <p className='mcsStaked'>Amount Staked : &#8358;{formatCurrency(100)}</p>
            </div>
            }
            { challengeDetails === 'pending' && !challengeStatus &&
                <div className='termsCase'>
                    <p className='termsText'>Click to view terms and conditions</p>
                </div>
            }
            <ResultContainer playerScore={5} opponentScore={4}  status={challengeStatus}/>
            {challengeDetails === 'invited' && !challengeStatus &&
            <div className='mcsButtonContainer'>
                <button className='declineBtn'>Decline</button>
                <button className='acceptBtn'>Accept and Play</button>
            </div>
            }
            </div>
            <BottomSheet open={openSheet} closeBottomSheet={closeBS} BSContent={<ChallengeGameInstruction
             staking={staking}/>} />
            <Dialogue handleClose={closeAlert} open={alertMessage} dialogueMessage={alertMessage}/>
        </>
    )
}

export default MyChallengeScore
