import React, {useState} from 'react'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader';
import { changePassword, deleteUserAccount, logoutUser } from '../../Auth/AuthSlice';
import './ChangePassword.scss'
import PasswordInput from '../../../components/PasswordInput/PasswordInput';
import Dialogue from '../../../components/Dialogue/Dialogue'
import {useEffect} from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BottomSheet from '../../../components/BottomSheet/BottomSheet';

function ChangePassword() {
    const [password, setPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [new_password_confirmation, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const [showPassword3, setShowPassword3] = useState(false)
    const [passErr, setPassError] = useState(false);
    const [newPassErr, setNewPassError] = useState(false);
    const [canSave, setCanSave] = useState(false)
    const [saving, setSaving] = useState(false)
    const [open, setOpen] = useState(false)
    const [openSheet, setOpenSheet] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const closeAlert = () => {
        setOpen(false)
    }

   // delete account function
    const deleteAccount = () => {
        dispatch(deleteUserAccount())
        .then(() => {
            setOpenSheet(false)
            dispatch(logoutUser())
        }) 
    }

    
    const openBottomSheet = async () => {
        setOpenSheet(true)
    }

    const closeBottomSheet = async () => {
        setOpenSheet(false)
    }

    
    const navigateHandler = () => {
        navigate('/profile')
    }
    

    //password verification
    useEffect(() => {
        if (password && password.length < 8) {
            setPassError(true)
        } else {
            setPassError(false)
        }
        if (new_password && new_password.length < 8) {
            setNewPassError(true)
        } else {
            setNewPassError(false)
        }

    }, [password, new_password, new_password_confirmation])

    //disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })


    useEffect(() => {
        const invalid = passErr || new_password_confirmation !== new_password || password === '' || new_password === '';
        setCanSave(! invalid);
    }, [passErr, new_password_confirmation, new_password, password])

    const savePassword = async () => {
        setSaving(true);
        setCanSave(false);
        dispatch(changePassword({ password, new_password, new_password_confirmation }))
            .then(unwrapResult)
            .then(result => {
                setOpen(true)
                setAlertMessage('Personal details updated successfully')
                navigate("/profile", {
                    state:{
                        alertMessage: alertMessage,
                        open:true,
                        handleClose:closeAlert
                    }
                })
            })
            .catch((rejectedValueOrSerializedError) => {
                setSaving(false);
                setCanSave(true);
                setOpen(true)
                setAlertMessage('Invalid data provided')
            });
    }

    return (
        <>
            <div className='changePasswordContainer'>
            <ScreenHeader title='Change Password' onClick={navigateHandler} styleProp='changeNavBar'/>
                <form>
                    <PasswordInput value={password}
                        setValue={setPassword}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        placeholder='Enter Password'
                        label='Old Password'
                        errorText={
                            passErr && '*password must not be less than 8 digits'
                        }
                        error={passErr}/>
                    <PasswordInput value={new_password}
                        setValue={setNewPassword}
                        showPassword={showPassword2}
                        setShowPassword={setShowPassword2}
                        placeholder='Enter new Password'
                        label='New Password'
                        errorText={
                            newPassErr && '*password must not be less than 8 digits'
                        }
                        error={passErr}/>
                    <PasswordInput value={new_password_confirmation}
                        setValue={setConfirmPassword}
                        showPassword={showPassword3}
                        setShowPassword={setShowPassword3}
                        placeholder='Confirm Password'
                        label='Confirm new password'
                        errorText={
                            new_password_confirmation !== new_password && '*password confirmation must match password'
                        }/>
                </form>
                <div className='requirementContainer'>
                    <p className='bigText'>Password Requirements</p>
                    <p className='smallText'>Minimum of 8 characters</p>
                </div>
                <button className='deleteBtn' onClick={openBottomSheet}>Delete Account</button>
                <button className='changePasswordBtn'
                    disabled={
                        !canSave
                } onClick={savePassword}>{saving ? 'Saving' : 'Change Password'}</button>
            </div>
            <Dialogue open={open} handleClose={closeAlert} dialogueMessage={alertMessage}/>
            <BottomSheet
                        open={openSheet} closeBottomSheet={closeBottomSheet}
                        BSContent={<DeleteAccountConfirmation
                            onClose={closeBottomSheet}
                        deleteAccount={deleteAccount}
                        />}
                    />
        </>
    )
}

export default ChangePassword

const DeleteAccountConfirmation = ({deleteAccount, onClose}) => {
    return(
        <div className='deleteContainer'>
            <p className='deleteText'>Are you sure you want to delete your account ?</p>
            <div className='btnCase'>
                <button onClick={deleteAccount} className='deleteBtn'>Delete</button>
                <button onClick={onClose} className='deleteBtn'>Cancel</button>
            </div>
        </div>
    )
}