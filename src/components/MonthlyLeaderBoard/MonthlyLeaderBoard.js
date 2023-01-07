import { Player } from '@lottiefiles/react-lottie-player'
import Leaderboard from '../../assets/leaderboard.json'
import React, { useEffect, useState } from 'react'
import { IoInformationCircleOutline } from 'react-icons/io5'
import './MonthlyLeaderBoard.scss'
import { formatCurrency, formatNumber } from '../../utils/stringUtl'
import { useDispatch, useSelector } from 'react-redux'
import { getWeeklyLeadersByDate } from '../../features/CommonSlice';

const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function MonthlyLeaderBoard() {
    const [isModalOpen, setIsModalOpen] = useState(true)
    const leaders = useSelector(state => state.common.weeklyLeaderboard.leaderboard)
    const topLeaders = leaders?.slice(0, 3) ?? null;
    const firstLeader = topLeaders[0] ?? { username: "..." };
    const secondLeader = topLeaders[1] ?? { username: "..." };
    const thirdLeader = topLeaders[2] ?? { username: "..." };

    const dispatch = useDispatch();

    const today = new Date();
    const startDate = new Date(today.setDate(today.getDate() - today.getDay()));

    const endDate = new Date(today.setDate(today.getDate() - today.getDay() + 6));

    useEffect(() => {
        dispatch(getWeeklyLeadersByDate({
            startDate,
            endDate
        }));
    }, [])

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
                            username={`${thirdLeader.username}`}
                            avatar={thirdLeader.avatar}
                            styleProp='others'
                            avatarProp='otherAvatar'
                            points={`${formatNumber(thirdLeader.points ? `${thirdLeader.points}` : 0)} pts`}

                        />
                        <MonthlyChallenger
                            stageImageUrl="/images/month-pod1.png"
                            username={`${firstLeader.username}`}
                            avatar={firstLeader.avatar}
                            styleProp='winner'
                            avatarProp='avatar'
                            points={`${formatNumber(firstLeader.points ? `${firstLeader.points}` : 0)} pts`}

                        />
                        <MonthlyChallenger
                            stageImageUrl="/images/month-pod2.png"
                            username={`${secondLeader.username}`}
                            avatar={secondLeader.avatar}
                            styleProp='others'
                            avatarProp='otherAvatar'
                            points={`${formatNumber(secondLeader.points ? `${secondLeader.points}` : 0)} pts`}
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
                src={avatar ? `${backendUrl}/${avatar}` : "/images/user-icon.png"}
                className={avatarProp} alt='avatar'
                />
                <p className='leaderName'>{username}</p>
                <p className='leader-points'>{points}</p>
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
