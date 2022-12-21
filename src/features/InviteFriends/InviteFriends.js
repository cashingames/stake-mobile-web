import { Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect, useState } from 'react'
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader'
import Dialogue from '../../components/Dialogue/Dialogue'
import Friends from '../../assets/friends.json'
import './InviteFriends.scss'
import { IoCopy, IoShareSocial } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../Auth/AuthSlice'
import LoaderScreen from '../LoaderScreen/LoaderScreen'

const InviteFriend = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    const navigateHandler = () => {
        navigate('/dashboard')
    }

    useEffect(() => {
        dispatch(getUser()).then(() => { setLoading(false) });
    }, [dispatch]);

    if (loading) {
        return <LoaderScreen backgroundColor="store-background-color" />
      }

    return (
        <>
            <ScreenHeader title='Invite Friends' styleProp='inviteHeader' onClick={navigateHandler} />
            <div className='inviteContainer'>
                <Player src={Friends}
                    alt='Friends'
                    autoplay
                    loop
                    className='player'
                    style={
                        {
                            height: '150px',
                            width: '100%'
                        }
                    } />
                <Heading />
                <Instruction />
                <InviteLink />
            </div>
        </>
    )
}

export default InviteFriend


const Heading = () => {
    return (
        <div className='headerCase'>
            <p className='headerValue'>We value friendship</p>
            <p className='headerText'>with your referrals</p>
        </div>
    )
}

const Instruction = () => {
    return (
        <>
            <p className='instructions'>Refer your friends to us and get 2 bonus games for each friend referred, and has played at least 1 game,
                and also stand a chance of winning exciting prizes.</p>
        </>
    )
}

const InviteLink = () => {

    const [open, setOpen] = useState(false)
    const [alertMessage, setAlert] = useState('')

    const user = useSelector(state => state.auth.user);

    const userRefCode = (user.referralCode)

    const closeDialogue = () => {
        setOpen(false)
    }

    //browser clip copy api function
    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }


    const shareRef = () => {
        if (navigator.share) {
            navigator.share({
                text: userRefCode
            }).then(() => {
            }).catch(err => {

                // Handle errors, if occured
                console.log(
                    "Error while using Web share API:");
                console.log(err);
            });
        } else {
            setOpen(true)
            alertMessage("Browser doesn't support this API !");
        }
    }

    const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(userRefCode)
            .then(() => {
                // If successful, open a dialogue box
                setOpen(true)
                setAlert('Copied to clipboard')
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <p className='inviteLink'>Your Referral Code</p>
            <div className='linkCase'>
                <p className='link'>{userRefCode}</p>
                <div className='shareCase'>
                    <div className='iconCase' onClick={handleCopyClick}>
                        <IoCopy size={20} color="#EB5757" />
                        <p className='iconText'>Copy</p>
                    </div>
                    <div className='iconCase' onClick={shareRef}>
                        <IoShareSocial size={20} color="#EB5757" />
                        <p className='iconText'>Share</p>
                    </div>
                </div>
            </div>
            <Dialogue open={open} handleClose={closeDialogue} dialogueMessage={alertMessage} />
        </>
    )
}