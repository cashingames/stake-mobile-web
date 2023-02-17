import { Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect, useState } from 'react'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import Notification from '../../components/Notification/Notification'
import { getUser } from '../Auth/AuthSlice'
import { getUserNotifications, markNotificationRead } from '../CommonSlice'
import Bell from '../../assets/bell.json'
import './NotificationScreen.scss'
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import moment from "moment";
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader'
import LoaderScreen from '../LoaderScreen/LoaderScreen'
import { useNavigate } from 'react-router-dom'

function NotificationScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const notifications = useSelector(state => state.common.userNotifications)
    const [loading, setLoading] = useState(true);
    const [readAll, setReadAll] = useState(false)
    const [clicking, setClicking] = useState(false)

    const markAll = () => {
        setClicking(true)
        dispatch(markNotificationRead('all')).then(() => {
            setClicking(false)
            setReadAll(true)
        });
    }

    //disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    useEffect(() => {
        dispatch(getUser());
        dispatch(getUserNotifications()).then(() => { setLoading(false) });
    }, [dispatch])

    const navigateHandler = () => {
        navigate('/dashboard')
    }

    if (loading) {
        return <LoaderScreen backgroundColor="notification-background-color" />
    }

    return (
        <>
            <ScreenHeader title='Notifications' styleProp='notificationHeader' onClick={navigateHandler} />

            <div style={
                { backgroundImage: "url(/images/studio-illustration.jpg)" }
            }
                className='notificationContainer'>
                {
                    notifications.length > 0 ?
                        <div>
                            <div className='markAsRead'
                                onClick={markAll}>
                                <div className='markBtn'>
                                    <p className='markText'>Mark all as read</p>
                                    {clicking ?
                                        <Spinner size={10} /> :
                                        <IoCheckmarkCircle className='icon' />}
                                </div>
                            </div>
                            <Player src={Bell}
                                alt='wallet'
                                autoplay
                                loop
                                className='player'
                                style={
                                    { height: '150px' }
                                } />
                            {// eslint-disable-next-line
                                notifications.map((notification, i) => {
                                    notification.data.action_type !== "CHALLENGE" && <Notification key={i} notification={notification}
                                        // index={i + 1}
                                        moment={moment}
                                        readAll={readAll}
                                    />
                                })}
                        </div>
                        :
                        <div className='noNotificationContainer'>
                            <p className='noNotification'>No Notification</p>
                        </div>

                } </div>
        </>
    )
}

export default NotificationScreen