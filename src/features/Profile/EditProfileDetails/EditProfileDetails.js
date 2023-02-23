import React, { useState, useEffect } from 'react';
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { getUser, editPersonalDetails } from '../../Auth/AuthSlice'
import Dialogue from '../../../components/Dialogue/Dialogue'
import './EditProfileDetails.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import { subYears } from 'date-fns';

const EditProfileDetails = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    const [email, setEmail] = useState(user.email)
    const [username, setUsername] = useState(user.username)
    const [phone] = useState(user.phoneNumber)
    const [countryCode] = useState('+234')
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [selectGender, setSelectGender] = useState(user.gender ? user.gender : 'male')
    const [firstNameErr] = useState(false);
    const [lastNameErr] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth ? user.dateOfBirth : '')
    const [canSave, setCanSave] = useState(true)
    const [open, setOpen] = useState(false)
    const [alertMessage, setAlert] = useState('')
    const [loading, setLoading] = useState(false);
    const [onloading, setOnLoading] = useState(true);
    const calenderAge = subYears(new Date(), 18).toISOString().slice(0, 10);

    useEffect(() => {
        dispatch(getUser()).then(() => { setOnLoading(false) });
    }, [dispatch])

    useEffect(() => {
        if (email === undefined) {
            navigate('/profile')
        }
        return
    })

    //disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })


    const navigateHandler = () => {
        navigate('/profile')
    }


    const closeAlert = () => {
        setOpen(false)
        navigate('/profile')
    }

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const changeLastName = (e) => {
        setLastName(e.target.value)
    }

    useEffect(() => {
        const invalid = firstNameErr || firstName === '' || lastNameErr || lastName === ''
        setCanSave(!invalid);
    }, [firstNameErr, firstName, lastNameErr, lastName])

    const SavePersonalDetails = () => {
        setLoading(true)
        dispatch(editPersonalDetails({
            firstName,
            lastName,
            username,
            email,
            dateOfBirth,
            gender: selectGender
        }))
            // .then(unwrapResult)
            .then(result => {
                if (result.error.message === "Request failed with status code 422") {
                    dispatch(getUser())
                    setOpen(true)
                    setAlert('The username or email has already been taken')
                    setLoading(false);
                }
                else {
                    dispatch(getUser())
                    setOpen(true)
                    setAlert('Personal details updated successfully');
                    setLoading(false);
                }
            })
            .catch((rejectedValueOrSerializedError) => {
                if (rejectedValueOrSerializedError.message === "Request failed with status code 422") {
                    setAlert('The phone number has already been taken')
                }
                else {
                    setAlert("Could not update profile, Please try again later.");
                }
                setLoading(false);
            });
    }

    if (onloading) {
        return <LoaderScreen backgroundColor="edit-background-color" />
    }

    return (
        <>
            <ScreenHeader title='Edit Details' onClick={navigateHandler} styleProp='editNavBar' />
            <div className='formCase'>
                <div className='inputsCase'>
                    <div className='inputCase'>
                        <label htmlFor='phone' className='inputLabel'>Phone number</label>
                        <div className='phoneContainer'>
                            <input
                                readOnly
                                placeholder="+234"
                                type='text'
                                value={countryCode}
                                className='countryCode'
                            />
                            <input
                                readOnly
                                placeholder="80xxxxxxxxxx"
                                type='tel'
                                id='phone'
                                value={phone}
                                className='phoneInput'
                            />
                        </div>
                    </div>
                    <div className='inputCase'>
                        <label htmlFor='Username' className='inputLabel'>Username</label>
                        <input
                            className='inputBox2'
                            onChange={changeUsername}
                            value={username} />
                    </div>

                    <div className='inputCase'>
                        <label htmlFor='Email' className='inputLabel'>Email</label>
                        <input
                            className='inputBox2'
                            onChange={changeEmail}
                            value={email} />
                    </div>

                    <div className='inputCase'>
                        <label htmlFor='firstName' className='inputLabel'>First Name</label>
                        <input
                            className='inputBox2'
                            onChange={changeFirstName}
                            value={firstName} />
                    </div>
                    <div className='inputCase'>
                        <label htmlFor='lastName' className='inputLabel'>Last Name</label>
                        <input
                            className='inputBox2'
                            onChange={changeLastName}
                            value={lastName} />
                    </div>
                    <div className='inputCase'>
                        <label htmlFor='lastName' className='inputLabel'>Date of Birth</label>
                        <input
                            className='inputBox2'
                            type='date'
                            value={dateOfBirth}
                            max={calenderAge}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                        />

                    </div>
                    <div className='inputCase'>
                        <label htmlFor='lastName' className='inputLabel'>Select Gender</label>
                        <Select
                            value={selectGender}
                            onChange={(e) => setSelectGender(e.target.value)}
                            sx={{
                                height: '30px',
                                borderRadius: 0,
                                fontSize: '0.75rem',
                                background: '#ebeff5',
                                border: 0,
                                outline: 0,
                                fontFamily: 'Graphik'
                            }}>
                            <MenuItem value='male'
                                sx={{
                                    fontSize: '0.7rem',
                                }}>Male</MenuItem>
                            <MenuItem value='female'
                                sx={{
                                    fontSize: '0.7rem'
                                }}
                            >Female</MenuItem>
                        </Select>
                    </div>
                    <button type='submit' disabled={!canSave || loading} className='submitBtn'
                        onClick={SavePersonalDetails}
                    >{loading ? 'Saving' : 'Save Changes'}</button>
                </div>
            </div>
            <Dialogue open={open} handleClose={closeAlert} dialogueMessage={alertMessage} />
        </>
    )
}
export default EditProfileDetails;