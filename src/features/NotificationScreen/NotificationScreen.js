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
    const notifications = useSelector(state => state.common.userNotifications)
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [readAll, setReadAll] = useState(false)
    const [clicking, setClicking] = useState(false)
    const features = useSelector(state => state.common.featureFlags);


    const navigate = useNavigate()

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
        if (features.length < 1) {
            navigate('/dashboard')
        }
        return
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
            {/* <div className='NotificationHeader'>
                <IoArrowBack className='icon'
                    onClick={
                        () => navigate(-1)
                    } />
                <AuthTitle titleText='Notifications' styleProp='title' />
            </div> */}
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
                            {notifications.map((notification, i) => <Notification key={i} notification={notification}
                                // index={i + 1}
                                moment={moment}
                                readAll={readAll}
                            />)}
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