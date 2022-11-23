import React, { useState } from 'react'
import moment from "moment";
import './Notification.scss'
import {IoCheckmarkCircle, IoNotificationsCircle} from 'react-icons/io5'
import { markNotificationRead } from '../../features/CommonSlice'
import { getUser } from '../../features/Auth/AuthSlice'
import { useDispatch } from 'react-redux'

function Notification({notification}) {
    const dispatch = useDispatch();
    const [clicked, setIsClicked] = useState(false)

    const notificationAction = () => {
        if (notification.data.action_type === "CHALLENGE") {
            dispatch(markNotificationRead(notification.id)).then(() => setIsClicked(true));
            dispatch(getUser());
            // navigation.navigate('MyChallengesScore', { challengeId: notification.data.action_id })
        }
        dispatch(markNotificationRead(notification.id)).then(() => setIsClicked(true));
        dispatch(getUser());
    }

    return (
        <div className='notification'>
            
            <div className='notifyMessageContainer'>
                {
               notification.read_at !== null || clicked ? <div className='checkContainer'>
                    <IoCheckmarkCircle className='icon'/>
                </div> : <div className='bellContainer'>
                    <IoNotificationsCircle className='icon'/>
                   
                </div>
            }
                <div className='notificationMessage'>
                    <div className={
                            `${
                                notification.read_at !== null || clicked ? 'readContainer' : 'notificationTitleContainer'
                            }`
                        }
                        onClick={notificationAction}>
                        <p className={
                            `${
                                notification.read_at !== null || clicked ? 'readText' : 'notTitle'
                            }`
                        }>{notification.data.title}</p>
                    </div>
                    <div className='timeContainer'>
                        <p className='notificationTime'>From {moment(notification.created_at).fromNow()}</p>
                    </div>
                </div>
            </div>        
        </div>
    )
}

export default Notification
