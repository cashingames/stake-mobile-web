import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from '../../components/Notification/Notification'
import { getUser } from '../Auth/AuthSlice'
import { getUserNotifications, markNotificationRead } from '../CommonSlice'
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
            <ScreenHeader title='Notifications' styleProp='notificationHeader' iconProp='backIcon' onClick={navigateHandler} />

            <div style={
                { backgroundImage: "url(/images/game-play-background.png)" }
            }
                className={notifications.length > 0 ? "notificationContainer" : 'noNotificationContainer'}>
                {
                    notifications.length > 0 ?
                        <div>
                            {notifications.map((notification, i) => <Notification key={i} notification={notification}
                                // index={i + 1}
                                moment={moment}
                                readAll={readAll}
                            />)}
                        </div>
                        :
                        <div className='noSubNotificationContainer'>
                            <img
                                src="/images/bell-dynamic-color.png"
                                alt='banner'
                                className='avatar'
                            />
                            <p className='noNotification'>Nothing yet, check back later</p>
                        </div>



                } </div>
            <button className='button-container' onClick={markAll} disabled={clicking}>
                <span className='buttonText'>{clicking ? <Spinner size={20} /> : 'Mark all as read'}</span>
            </button>
        </>
    )
}

export default NotificationScreen