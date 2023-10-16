import React, { useState, useEffect } from 'react';
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { getUser, editPersonalDetails } from '../../Auth/AuthSlice';
import Dialogue from '../../../components/Dialogue/Dialogue';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import './EditProfileDetails.scss';
import dayjs from 'dayjs';

import { FormControl } from '@mui/material';


const EditProfileDetails = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    // const isEmailVerified = user.isEmailVerified;

    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState(user.firstName ? user.firstName : '');
    const [lastName, setLastName] = useState(user.lastName ? user.lastName : '');
    const [selectGender, setSelectGender] = useState(user.gender ? user.gender : 'male')
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth ? user.dateOfBirth : '')
    const [phone] = useState(user.phoneNumber);
    const [countryCode] = useState('+234');
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [firstnameError, setFirstnameError] = useState(false);
    const [lastnameError, setLastnameError] = useState(false);
    const [canSave, setCanSave] = useState(true);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlert] = useState('');
    const [loading, setLoading] = useState(false);
    const [onloading, setOnLoading] = useState(true);
    const date = dayjs();
    const ageLimit = date.subtract(18, 'year').format('YYYY-MM-DD');


    // const goToVerifyEmailScreen = () => {
    //     dispatch(sendEmailOTP())
    //     navigate('/email-verification')
    // }


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

    const changeDateOfBirth = (e) => {
        setDateOfBirth(e.target.value)
    }


    const SavePersonalDetails = () => {
        setLoading(true)
        editPersonalDetails({
            firstName,
            lastName,
            username,
            email,
            dateOfBirth,
            gender: selectGender
        })
            .then(response => {
                dispatch(getUser())
                setOpen(true)
                setAlert('Personal details updated successfully');
                setLoading(false);
            },
                err => {
                    if (!err || !err.response || err.response === undefined) {
                        setOpen(true)
                        setAlert('Your Network is Offline.')
                        setLoading(false);
                    }
                    else if (err.response.status === 500) {
                        setOpen(true)
                        setAlert('Service not currently available. Please contact support')
                        setLoading(false);
                    }
                    else {
                        const errors =
                            err.response && err.response.data && err.response.data.errors;
                        const firstError = Object.values(errors, {})[0];
                        setOpen(true)
                        setAlert(firstError[0])
                        setLoading(false);
                    }
                }
            );
    }

    useEffect(() => {
        const emailRule = /^([a-zA-Z0-9_/\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; /* eslint-disable-line */
        const nameRule = /\d/;
        const usernameRule = /\s/;
        const validFirstName = !nameRule.test(firstName);
        const validLastName = !nameRule.test(lastName);
        const validUsername = !usernameRule.test(username);
        const validEmail = emailRule.test(email);
        setEmailError(!validEmail);
        setFirstnameError(!validFirstName);
        setLastnameError(!validLastName);
        setUsernameError(!validUsername);
        const invalid = firstnameError || firstName === '' || lastnameError || lastName === '' || dateOfBirth === ''
            || usernameError || username === "" || emailError || email === ''
        setCanSave(!invalid);
    }, [firstnameError, firstName, lastnameError, lastName, dateOfBirth, usernameError, username, emailError, email]);


    if (onloading) {
        return <LoaderScreen backgroundColor="edit-background-color" />
    }


    return (
        <>
            <div className='formCase'>
                <ScreenHeader title='Bio Data' onClick={navigateHandler} styleProp='editNavBar' />

                <div className='inputsCase'>
                    <div className='inputCase'>
                        <label htmlFor='phone' className='inputLabel' style={{ opacity: 0.6 }}>Phone number</label>
                        <div className='phoneContainer'>
                            <input
                                readOnly
                                placeholder="+234"
                                type='text'
                                value={countryCode}
                                className='countryCode'
                                style={{ opacity: 0.6 }}
                            />
                            <input
                                readOnly
                                placeholder="80xxxxxxxxxx"
                                type='tel'
                                id='phone'
                                value={phone}
                                className='phoneInput'
                                style={{ opacity: 0.6 }}
                            />
                        </div>
                    </div>
                    <div className='inputCase'>
                        <label htmlFor='Username' className='inputLabel'>Username</label>
                        {username === '' &&
                            <span className='input-error'>*required field</span>
                        }
                        {usernameError &&
                            <span className='input-error'>*Username can't have space</span>
                        }
                        <input
                            className='inputBox2'
                            onChange={changeUsername}
                            value={username} />
                    </div>

                    <div className='inputCase'>
                        <label htmlFor='Email' className='inputLabel' style={{ opacity: 0.6 }}>Email</label>
                        {email === '' &&
                            <span className='input-error'>*required field</span>
                        }
                        {emailError &&
                            <span className='input-error'>*invalid email address</span>
                        }
                        {/* {!isEmailVerified &&
                            <p className='warning-text' onClick={goToVerifyEmailScreen}>Your email is not verified. Please, CLICK to verify your email!</p>
                        } */}
                        <input
                            className='inputBox2'
                            onChange={changeEmail}
                            style={{ opacity: 0.6 }}
                            value={email}
                            readOnly={true}
                        />
                        {/* {!isEmailVerified &&
                                <p className='verified-text'>unverified</p>
                            } */}
                    </div>

                    <div className='inputCase'>
                        <label htmlFor='firstName' className='inputLabel' style={{ opacity: 0.6 }}>First Name</label>
                        {firstName === '' &&
                            <span className='input-error'>*required field</span>
                        }
                        {firstnameError &&
                            <span className='input-error'>*First name can't have numbers</span>
                        }
                        <input
                            className='inputBox2'
                            onChange={changeFirstName}
                            value={firstName}
                            style={{ opacity: 0.6 }}
                            required
                            readOnly
                        />
                    </div>
                    <div className='inputCase'>
                        <label htmlFor='lastName' className='inputLabel' style={{ opacity: 0.6 }}>Last Name</label>
                        {lastName === '' &&
                            <span className='input-error'>*required field</span>
                        }
                        {lastnameError &&
                            <span className='input-error'>*Last name can't have numbers</span>
                        }
                        <input
                            className='inputBox2'
                            onChange={changeLastName}
                            value={lastName}
                            style={{ opacity: 0.6 }}
                            readOnly
                        />
                    </div>
                    <div className='inputCase'>
                        <label htmlFor='lastName' className='inputLabel'>Date of Birth</label>
                        {dateOfBirth === '' &&
                            <span className='input-error'>*required field</span>
                        }
                        <input
                            className='inputBox2'
                            type='date'
                            value={dateOfBirth}
                            max={ageLimit}
                            onChange={changeDateOfBirth}
                        />
                    </div>
                    <div className='inputCase'>
                        <label htmlFor='lastName' className='inputLabel'>Select Gender</label>
                        <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label" style={{ fontFamily: 'sansation-regular', color: '#1C453B', fontSize: '0.92rem', }}>Select Gender</InputLabel> */}
                            <Select
                                value={selectGender}
                                onChange={(e) => setSelectGender(e.target.value)}
                                sx={{
                                    height: ' 3.5rem',
                                    borderRadius: '14px',
                                    fontSize: '0.8rem',
                                    background: '#FFF',
                                    border: '0.1px solid #D9D9D9',
                                    outline: 0,
                                    fontFamily: 'sansation-regular',
                                    color: '#1C453B'
                                }}>
                                <MenuItem style={{ color: '#1C453B', fontFamily: 'sansation-regular' }} value='male'>Male</MenuItem>
                                <MenuItem value='female'
                                >Female</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <button type='submit' disabled={!canSave || loading} className='save-button-container'
                        onClick={SavePersonalDetails}
                    >
                        <span className='buttonText'>{loading ? 'Saving' : 'Save Changes'}</span></button>
                </div>
            </div>
            <Dialogue open={open} handleClose={closeAlert} dialogueMessage={alertMessage} />
        </>
    )
}
export default EditProfileDetails;