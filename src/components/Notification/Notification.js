import React from 'react'
import {Player} from '@lottiefiles/react-lottie-player'
import Bell from '../../assets/bell.json'
import './Notification.scss'
import {IoCheckmarkCircle, IoNotificationsCircle} from 'react-icons/io5'

function Notification({clicked, setIsClicked}) {
    const readNotification = () => {
        setIsClicked(true)
    }

    return (
        <div className='notification'>
            <Player src={Bell}
                alt='wallet'
                autoplay
                loop
                className='player'
                style={
                    {height: '150px'}
                }/>
            <div className='notifyMessageContainer'>
                {
                clicked ? <div className='bellContainer'>
                    <IoNotificationsCircle className='icon'/>
                </div> : <div className='checkContainer'>
                    <IoCheckmarkCircle className='icon'/>
                </div>
            }
                <div className='notificationMessage'>
                    <div className={
                            `${
                                clicked ? 'readContainer' : 'notificationTitleContainer'
                            }`
                        }
                        onClick={readNotification}>
                        <p className={
                            `${
                                clicked ? 'readText' : 'notTitle'
                            }`
                        }>You have received a challenge from John Paul</p>
                    </div>
                    <div className='timeContainer'>
                        <p className='notificationTime'>From 7 minutes ago</p>
                    </div>
                </div>
            </div>

            <div className='notifyMessageContainer'>
                {
                clicked ? <div className='bellContainer'>
                    <IoNotificationsCircle className='icon'/>
                </div> : <div className='checkContainer'>
                    <IoCheckmarkCircle className='icon'/>
                </div>
            }
                <div className='notificationMessage'>
                    <div className={
                            `${
                                clicked ? 'readContainer' : 'notificationTitleContainer'
                            }`
                        }
                        onClick={readNotification}>
                        <p className={
                            `${
                                clicked ? 'readText' : 'notTitle'
                            }`
                        }>You have received a challenge from John Paul</p>
                    </div>
                    <div className='timeContainer'>
                        <p className='notificationTime'>From an hour ago</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification
