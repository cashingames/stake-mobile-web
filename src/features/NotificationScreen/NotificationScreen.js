import { Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect, useState } from 'react'
import {  IoCheckmarkCircle } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import Notification from '../../components/Notification/Notification'
import { getUser } from '../Auth/AuthSlice'
import { getUserNotifications, markNotificationRead } from '../CommonSlice'
import Bell from '../../assets/bell.json'
import './NotificationScreen.scss'
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader'

function NotificationScreen() {
    const notifications = useSelector(state => state.common.userNotifications)
    // console.log(notifications)
    const dispatch = useDispatch();
    const [isClicked, setIsClicked] = useState(false)
    const [clicking, setClicking] = useState(false)

    const markAll = () => {
        setClicking(true)
        dispatch(markNotificationRead("all")).then(() => {
            setClicking(false)
            setIsClicked(true)
        });
    }

    useEffect(() => {
        dispatch(getUser());
        dispatch(getUserNotifications());
    }, [dispatch])

    return (
        <>
            {/* <div className='NotificationHeader'>
                <IoArrowBack className='icon'
                    onClick={
                        () => navigate(-1)
                    } />
                <AuthTitle titleText='Notifications' styleProp='title' />
            </div> */}
            <ScreenHeader title='Notification' styleProp='notificationHeader' />

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
                                // moment={moment}
                                clicked={isClicked}
                                setIsClicked={setIsClicked}
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