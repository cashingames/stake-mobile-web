import React, { useEffect, useState } from 'react';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import Dialogue from '../../components/Dialogue/Dialogue';
import './InviteFriends.scss';
import { IoCopy, IoShareSocial } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../Auth/AuthSlice';
import firebaseConfig from '../../firebaseConfig';
import { logEvent } from 'firebase/analytics';

const InviteFriend = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [alertMessage, setAlert] = useState('')

    const closeDialogue = () => {
        setOpen(false)
    }



    const navigateHandler = () => {
        navigate('/profile')
    }

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <div className='inviteContainer' style={{ backgroundImage: "url(/images/success-background.png)" }}>
            <div>
                <ScreenHeader title='Invite Friends' styleProp='inviteHeader' onClick={navigateHandler} />
                <Heading />
                <Instruction />
                <InviteLink />
            </div>
            <div>
                <ShareButtons setAlert={setAlert} setOpen={setOpen} />
                <Dialogue open={open} handleClose={closeDialogue} dialogueMessage={alertMessage} />

            </div>

        </div>
    )
}

export default InviteFriend


const Heading = () => {
    return (
        <div className='headerCase'>
            <p className='headerValue'>We value friendship with your referrals</p>
        </div>
    )
}

const Instruction = () => {
    return (
        <>
            <p className='instructions'>Share the fun! Refer your friends to us so they can participate in our exciting games..</p>
        </>
    )
}

const InviteLink = () => {
    const user = useSelector(state => state.auth.user);
    const userRefCode = (user.referralCode)

    return (
        <div>
            <p className='inviteLink'>Your Referral Code</p>
            <div className='linkCase'>
                <img
                    src="/images/bonus-confetti.png"
                    alt='bio'
                    className='bio-icon'
                />
                <div>
                    <p className='share-text'>Share the great news of our interesting trivia games</p>
                    <p className='link'>{userRefCode}</p>
                </div>
            </div>
        </div>
    )
}

const ShareButtons = ({ setOpen, setAlert }) => {
    const analytics = firebaseConfig();
    const user = useSelector(state => state.auth.user);
    const userRefCode = (user.referralCode);
    const referralMsg = `Play exciting games with me on Cashingames and stand a chance to earn great rewards! Create an account with my referral code - ${userRefCode}`;

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
                title: 'Share Referral Code',
                text: referralMsg
            })
                .then(() => logEvent(analytics, "share_referral", {
                    'id': user.username,
                }))
                .catch((error) => {
                    setOpen(true)
                    setAlert('Error:', error)
                })
        } else {
            setOpen(true)
            setAlert("Web Share API not supported in this browser");
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
            });
    }
    return (
        <div className='buttons-container'>
            <button className='button-containerw' type='submit' onClick={shareRef}>
                <span className='buttonText'>Share to friends</span>
                <IoShareSocial size={20} color="#FFF" />
            </button>
            <button className='button-containeri' onClick={handleCopyClick}>
                <span className='buttonText'>Copy link</span>
                <IoCopy size={20} color="#1C453B" />
            </button>
        </div>
    )
}

