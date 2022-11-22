import React, {useState} from 'react'
import {IoArrowBack, IoCheckmarkCircle} from 'react-icons/io5'
import {useNavigate} from 'react-router-dom'
import AuthTitle from '../../components/AuthTitle/AuthTitle'
import Notification from '../../components/Notification/Notification'
import './NotificationScreen.scss'

function NotificationScreen() {
    const [isClicked, setIsClicked] = useState(false)
    const [isNotification] = useState(true)
    const navigate = useNavigate()
    const markAll = () => {
        setIsClicked(true)
    }
    return (
        <>
            <div className='NotificationHeader'>
                <IoArrowBack className='icon'
                    onClick={
                        () => navigate(-1)
                    }/>
                <AuthTitle titleText='Notifications' styleProp='title'/>
            </div>

            <div style={
                    {backgroundImage: "url(/images/studio-illustration.jpg)"}
                }
                className='notificationContainer'>
                {
                isNotification ? (
                    <div>
                        <div className='markAsRead'
                            onClick={markAll}>
                            <div className='markBtn'>
                                <p className='markText'>Mark all as read</p>
                                <IoCheckmarkCircle className='icon'/>
                            </div>
                        </div>
                        <Notification clicked={isClicked}
                            setIsClicked={setIsClicked}/>
                    </div>
                ) : (
                    <div className='noNotificationContainer'>
                        <p className='noNotification'>No Notification</p>
                    </div>
                )
            } </div>
        </>
    )
}

export default NotificationScreen