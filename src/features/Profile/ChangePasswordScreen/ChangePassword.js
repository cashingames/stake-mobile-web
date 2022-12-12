import React, {useState} from 'react'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader';
import { changePassword } from '../../Auth/AuthSlice';
import './ChangePassword.scss'
import PasswordInput from '../../../components/PasswordInput/PasswordInput';
import Dialogue from '../../../components/Dialogue/Dialogue'
import {useEffect} from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    const [alertMessage, setAlertMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const closeAlert = () => {
        setOpen(false)
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
                setAlertMessage('Password changed successfully')
                navigate("/profile'", {
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
            <ScreenHeader title='Change Password'/>
            <div className='changePasswordContainer'>
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
                        placeholder='Enter Password'
                        label='Confirm new password'
                        errorText={
                            new_password_confirmation !== new_password && '*password confirmation must match password'
                        }/>
                </form>
                <div className='requirementContainer'>
                    <p className='bigText'>Password Requirements</p>
                    <p className='smallText'>Minimum of 8 characters</p>
                </div>
                <button className='changePasswordBtn'
                    disabled={
                        !canSave
                } onClick={savePassword}>{saving ? 'Saving' : 'Change Password'}</button>
            </div>
            <Dialogue open={open} handleClose={closeAlert} dialogueMessage={alertMessage}/>
        </>
    )
}

export default ChangePassword
