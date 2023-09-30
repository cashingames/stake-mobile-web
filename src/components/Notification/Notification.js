import React, { useState } from 'react'
import './Notification.scss'
import { markNotificationRead } from '../../features/CommonSlice'
import { getUser } from '../../features/Auth/AuthSlice'
import { useDispatch } from 'react-redux'

function Notification({ notification, readAll }) {
    const dispatch = useDispatch();
    const [clicked, setClicked] = useState(false)

    const notificationAction = () => {
        if (notification.data.action_type === "CHALLENGE") {
            dispatch(markNotificationRead(notification.id)).then(() => setClicked(true));
            dispatch(getUser());
        }
        dispatch(markNotificationRead(notification.id)).then(() => setClicked(true));
        dispatch(getUser());
    }

    return (
        <div className={
            `${notification.read_at !== null || clicked || readAll ? 'readContainer' : 'notificationTitleContainer'
            }`
        }
            onClick={notificationAction}>

            <div className='image-avatar'>
                <img
                    src="/images/bell-dynamic-color.png"
                    alt='banner'
                    className='avatar'
                />
            </div>

            <p className='notTitle'>{notification.data.title}</p>
            <p className='notificationTime'>{notification.created_at}</p>
        </div>

    )
}

export default Notification
