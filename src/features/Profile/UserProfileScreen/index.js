import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import ProfileLink from '../ProfileLinks/ProfileLink';
import { Spinner } from 'react-activity'
import { IoCameraSharp } from 'react-icons/io5';
import { getUser} from '../../Auth/AuthSlice';
import ScreensHeader from '../../../components/ScreenHeader/ScreenHeader';
import Dialogue from '../../../components/Dialogue/Dialogue'
import axios from 'axios';
import './UserProfileScreen.scss'
import LoaderScreen from '../../LoaderScreen/LoaderScreen';

const backendUrl = process.env.REACT_APP_API_ROOT_URL;

function UserProfileScreen() {
    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [screenLoader, setScreenLoader] = useState(true)
    const navigateHandler = () => {
        navigate('/dashboard')
    }

    const closeAlert = () => {
        setOpen(false)
    }


    //disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    const pickImage = async (e) => {
        const _image = e.target.files[0];
        if (_image.size > 2047000) {
            return;
        }
        if (_image === undefined) {
            return;
        }
        try {
            // Make a request to the server to update the user's profile image
            setLoading(true)
            const data = new FormData();
            data.append('avatar', _image);
            // eslint-disable-next-line
            const response = await axios.post('v3/profile/me/picture', data)
            dispatch(getUser()).then(x => {
                setLoading(false)
                setOpen(true)
                setAlertMessage('Profile picture upadated')
            });

        } catch (error) {
            setLoading(false)
            setOpen(true)
            setAlertMessage('Could not update Profile Picture, Please try again later.')
        }

    }

    const triggerClick = (e) => {
        e.preventDefault();
        const uploadElement = document.getElementById("imageUpload");
        uploadElement.click();
    };


    useEffect(() => {
        dispatch(getUser()).then(() => { setScreenLoader(false) });
    }, [dispatch])

    if (screenLoader) {
        return <LoaderScreen backgroundColor="loader" />
    }

    return (
        <>
            <ScreensHeader title='Profile' onClick={navigateHandler} />
            <div className='userProfileContainer'>
                <form className='userImgContainer'>
                    <div className='avatar-case'>
                        <img
                            src={user.avatar ? `${backendUrl}/${user.avatar}` : "/images/user-icon.png"}
                            alt='user'
                            className='userAvater'
                            onError={(e) => e.target.style.display = 'none'} />
                    </div>
                    <input type='file'
                        accept="image/*"
                        onChange={pickImage}
                        hidden={true}
                        id='imageUpload'
                        value={''} />
                    {loading ?
                        <Spinner
                            size={20}
                            style={{ marginTop: '0.5rem' }}
                        />
                        :
                        <div className='cameraCase'>
                            <IoCameraSharp className='icon'
                                onClick={triggerClick}
                            />
                        </div>

                    }

                </form>                   
                <ProfileLink />
            </div>
            <Dialogue open={open} handleClose={closeAlert} dialogueMessage={alertMessage} />

        </>
    )
}

export default UserProfileScreen
