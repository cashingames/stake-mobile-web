import React, { useState } from 'react'
import './Notification.scss'
import { IoCheckmarkCircle, IoNotificationsCircle } from 'react-icons/io5'
import { markNotificationRead } from '../../features/CommonSlice'
import { getUser } from '../../features/Auth/AuthSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Notification({ notification, readAll, moment }) {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [clicked, setClicked] = useState(false)

    const notificationAction = () => {
        if (notification.data.action_type === "CHALLENGE") {
            dispatch(markNotificationRead(notification.id)).then(() => setClicked(true));
            dispatch(getUser());
            navigate('/challenge-score/' + notification.data.action_id)
        }
        dispatch(markNotificationRead(notification.id)).then(() => setClicked(true));
        dispatch(getUser());
    }

    return (
        <div className='notification'>

            <div className='notifyMessageContainer'>
                {notification.read_at !== null || clicked || readAll ?
                    <div className='checkContainer'>
                        <IoCheckmarkCircle className='icon' />
                    </div> : <div className='bellContainer'>
                        <IoNotificationsCircle className='icon' />
                    </div>
                }
                <div className='notificationMessage'>
                    <div className={
                        `${notification.read_at !== null || clicked || readAll ?  'readContainer' : 'notificationTitleContainer'
                        }`
                    }
                        onClick={notificationAction}>
                        <p className={
                            `${notification.read_at !== null || clicked || readAll ?  'readText' : 'notTitle'
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
