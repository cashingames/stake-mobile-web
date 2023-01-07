import { Player } from '@lottiefiles/react-lottie-player'
import Leaderboard from '../../assets/leaderboard.json'
import React, { useState } from 'react'
import { IoInformationCircleOutline } from 'react-icons/io5'
import './MonthlyLeaderBoard.scss'
import { formatCurrency } from '../../utils/stringUtl'

function MonthlyLeaderBoard() {
    const [isModalOpen, setIsModalOpen] = useState(true)

    const openModal = () => {
        setIsModalOpen(true)
    }
    return (
        <>
            <div className='monthly-challengers-container'>
                <div className='wrapper'>
                    <p className='topChallengeTitle'>Top Players for the week</p>
                    <p className='viewMore-text'>View More</p>
                </div>
                <div className='topChallenge-cover'>
                    <p className='view-text' onClick={openModal}>Prize pool <IoInformationCircleOutline size={16} color='#fff' /> </p>
                    <div className='topChallengerContainer'>
                        <MonthlyChallenger
                            stageImageUrl="/images/month-pod3.png"
                            username='john'
                            avatar=''
                            styleProp='others'
                            avatarProp='otherAvatar'
                            points={4}

                        />
                        <MonthlyChallenger
                            stageImageUrl="/images/month-pod1.png"
                            username='Peter'
                            avatar=''
                            styleProp='winner'
                            avatarProp='avatar'
                            points={4}

                        />
                        <MonthlyChallenger
                            stageImageUrl="/images/month-pod2.png"
                            username='Emeka'
                            avatar=''
                            styleProp='others'
                            avatarProp='otherAvatar'
                            points={4}
                        />
                    </div>
                </div>
            </div>
            <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    )
}

const MonthlyChallenger = ({ username, avatar, stageImageUrl, styleProp, avatarProp, points }) => {

    return (
        <div className='monthly-position-container'>
            <div className={styleProp}>
                <img
                    src={avatar ? `${avatar}` : "/images/user-icon.png"}
                    className={avatarProp} alt='avatar'
                />
                <p className='leaderName'>{username}</p>
                <p className='leader-points'>{points}pts</p>
            </div>
            <img
                src={stageImageUrl}
                className='positionImage'
                alt='stage'
            />
        </div>
    )
}

export default MonthlyLeaderBoard

const Modal = ({ isModalOpen, setIsModalOpen }) => {

    const closeModal = () => {
        setIsModalOpen(false)
    }
    return (
        <>
        {isModalOpen ?
        <div className='modal-container'>
            <div className='modal'>
                <p className='closeModal-btn' onClick={closeModal}>Close x</p>
                <p className='modal-title'>Monthly Leaders Prizes</p>
                <div>
                    <Player src={Leaderboard}
                        alt='leaderboard'
                        autoplay
                        loop
                        className='player'
                        style={
                            { height: '170px' }
                        } />
                </div>
                <div className='modal-text-contentents'>
                    <div className='modal-text-winner'>
                        <p className='winner-text'>Grand Prize</p>
                        <p className='winner-text'>&#8358;{formatCurrency(50000)}</p>
                    </div>
                    <div className='modal-text-others'>
                        <p className='other-text'>2nd Prize</p>
                        <p className='other-text'>&#8358;{formatCurrency(30000)}</p>
                    </div>
                    <div className='modal-text-others'>
                        <p className='other-text'>3rd Prize</p>
                        <p className='other-text'>&#8358;{formatCurrency(20000)}</p>
                    </div>
                </div>
            </div>
        </div>
        :
        <></>
        }
        </>
    )
}
