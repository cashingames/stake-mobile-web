import React, { useState, useEffect } from 'react';
import AuthBanner from '../../../components/AuthBanner/AuthBanner';
import AuthTitle from '../../../components/AuthTitle/AuthTitle';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser} from '../AuthSlice';
import { useNavigate } from "react-router-dom";

import './SignupProfile.scss'

const SignupProfile = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const userCredentials = useSelector(state => state.auth.createAccount);
    console.log(userCredentials)


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [referrer, setReferrer] = useState('');
    const [firstnameError, setFirstnameError] = useState(false);
    const [lastnameError, setLastnameError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [canSend, setCanSend] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);



    const onChangeFirstname = (e) => {
        const firstName = e.currentTarget.value;
        setFirstName(firstName)
    }
    const onChangeLastname = (e) => {
        const lastName = e.currentTarget.value;
        setLastName(lastName)
    }
    const onChangeUsername = (e) => {
        const username = e.currentTarget.value;
        setUsername(username)
    }
    const onChangeReferrer = (e) => {
        const referrer = e.currentTarget.value;
        setReferrer(referrer)
    }

    useEffect(() => {
        const nameRule = /\d/;
        const usernameRule = /\s/;
        const validFirstName = !nameRule.test(firstName)
        const validLastName = !nameRule.test(lastName)
        const validUsername = !usernameRule.test(username)
        setFirstnameError(!validFirstName);
        setLastnameError(!validLastName);
        setUsernameError(!validUsername);

        const invalid = firstnameError || firstName === "" || lastnameError || lastName === ""
            || usernameError || username === ""
        setCanSend(!invalid);

    }, [firstName, lastName, username, firstnameError, lastnameError, usernameError])

    const onSend = () => {
        setLoading(true);

        registerUser({
            first_name: firstName,
            last_name: lastName,
            referrer: referrer,
            username: username,
            ...userCredentials
        }).then(response => {
            console.log(response.data.data, 'all good')
            // saveToken(response.data.data)
            // dispatch(setToken(response.data.data))
            navigate('/verify-phone-number', {state:{
                phone_number: userCredentials.phone_number,
                username: username, next_resend_minutes: response.data.data.next_resend_minutes
            }})

        }, err => {
            if (!err || !err.response || err.response === undefined) {
                setError("Your Network is Offline.");
            }
            else if (err.response.status === 500) {
                setError("Service not currently available. Please contact support");
            }
            else {
                const errors =
                    err.response && err.response.data && err.response.data.errors;
                const firstError = Object.values(errors, {})[0];
                setError(firstError[0])
            }
            setLoading(false);
        });
    }

    return (
        <div className='signupProfile'>
            <AuthBanner />
            <AuthTitle titleText="Let's get to know you" styleProp='headerTitle' />
            <p className='inputDetailsHeader'>Input your details below</p>
            <div className='formContainer'>
                <div className='inputsContainer'>
                    {error.length > 0 &&
                        <p className='errorBox'>{error}</p>
                    }
                    <div className='inputContainer'>
                        <label htmlFor='firstname' className='inputLabel'>First name</label>
                        <input
                            placeholder="John"
                            type='text'
                            id='firstname'
                            value={firstName}
                            className='inputBox'
                            autoFocus={true}
                            onChange={e => onChangeFirstname(e)}
                            required
                        />
                        {firstnameError &&
                            <span className='inputError'>*First name can't have numbers</span>
                        }
                    </div>
                    <div className='inputContainer'>
                        <label htmlFor='lastname' className='inputLabel'>Last name</label>
                        <input
                            placeholder="Doe"
                            type='text'
                            id='lastname'
                            value={lastName}
                            className='inputBox'
                            onChange={e => onChangeLastname(e)}
                            required
                        />
                        {lastnameError &&
                            <span className='inputError'>*lLast name can't have numbers</span>
                        }
                    </div>
                    <div className='inputContainer'>
                        <label htmlFor='username' className='inputLabel'>Username</label>
                        <input
                            placeholder="JonDoe234"
                            type='text'
                            id='username'
                            value={username}
                            className='inputBox'
                            onChange={e => onChangeUsername(e)}
                            required
                        />
                        {usernameError &&
                            <span className='inputError'>*Username can't have space or can't be empty</span>
                        }
                    </div>
                    <div className='inputContainer'>
                        <label htmlFor='referrer' className='inputLabel'>Referral Code</label>
                        <input
                            placeholder="optional"
                            type='text'
                            id='referrer'
                            value={referrer}
                            className='inputBox'
                            onChange={e => onChangeReferrer(e)}
                            required
                        />
                    </div>
                    <div className='appButtonContainer'>
                        <button className='buttonContainer'
                            type="submit" disabled={!canSend || loading} onClick={onSend}>
                            <span className='buttonText'>{loading ? "Creating" : "Create Account"}</span>

                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignupProfile;