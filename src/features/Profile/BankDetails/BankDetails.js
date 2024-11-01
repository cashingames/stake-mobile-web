import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import Dialogue from '../../../components/Dialogue/Dialogue'
import './BankDetails.scss'
import { useEffect } from 'react';
import { editBankDetails, getUser } from '../../Auth/AuthSlice';
import { getBankData, getCommonData } from '../../CommonSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

function BankDetails() {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(getUser());
        dispatch(getCommonData())

    }, [dispatch]);

    const user = useSelector(state => state.auth.user)
    const banks = useSelector(state => state.common.banks)

    const [canSave, setCanSave] = useState(false);
    const [accountNumber, setAccountNumber] = useState(user.accountNumber);
    const [accountName, setAccountName] = useState(user.accountName);
    const [accountNumberErr, setAccountNumberError] = useState(false);
    const [accountNameErr, setAccountNameError] = useState(false);
    const [bankName, setBankName] = useState(user.bankName ?? '');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState('');

    //dialogue function
    const closeAlert = () => {
        setOpen(false)
    }


    const navigateHandler = () => {
        navigate('/profile')
    }


    //Account name and number validations
    useEffect(() => {
        if (accountNumber && accountNumber.length < 10) {
            setAccountNumberError(true)
        } else {
            setAccountNumberError(false)
        }

        if (accountName && accountName.length < 5) {
            setAccountNameError(true)
        } else {
            setAccountNameError(false)
        }
    }, [accountName, accountNumber])

    useEffect(() => {
        if (!banks || banks.length === 0) {
            dispatch(getBankData());
        }
        else {
            setBankName(user.bankName || '')
        }
    }, [banks, user, dispatch])

    useEffect(() => {
        const invalid = accountNumberErr || accountNameErr || accountName === '' || accountNumber === '';
        setCanSave(!invalid);
    }, [accountNumberErr, accountNameErr, accountName, accountNumber])

    useEffect(() => {
        if (accountName === undefined) {
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

    const onSaveBankDetails = () => {
        setLoading(true);

        dispatch(editBankDetails({
            bankName,
            accountName,
            accountNumber
        }))
            .then(unwrapResult)
            .then(result => {
                setLoading(false);
                setOpen(true)
                setAlertMessage('Bank details updated successfully')
                dispatch(getUser())
                // navigate('/profile')
            })
            .catch((rejectedValueOrSerializedError) => {
                setLoading(false);
                setOpen(true)
                setAlertMessage('Invalid data provided')
            });
    }


    return (
        <>
            <ScreenHeader title='Bank Details' onClick={navigateHandler} styleProp='bankHeader' />
            <div className='bankContainer'>
                <form>
                    <div className='inputCase'>
                        <label htmlFor='accountNumber' className='inputLabel'>Account Number</label>
                        <input
                            className='inputBox2'
                            onChange={(e) => setAccountNumber(e.target.value)}
                            value={accountNumber} />
                    </div>
                    <div className='inputCase'>
                        <label htmlFor='accountName' className='inputLabel'>Name on Account</label>
                        <input
                            className='inputBox2'
                            onChange={(e) => setAccountName(e.target.value)}
                            value={accountName} />
                    </div>

                    <div className='inputCase'>
                        <label htmlFor='selectBank' className='inputLabel'>Select Bank</label>
                        <Select
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            sx={{
                                height: '30px',
                                borderRadius: 0,
                                fontSize: '0.7rem',
                                background: '#ebeff5',
                                border: 0,
                                opacity: 0.6,
                                outline: 0,
                                fontFamily: 'graphik-regular'
                            }}>
                            {banks && banks.map((bank, i) => {
                                return (
                                    <MenuItem key={i} value={bank.name}>{bank.name}</MenuItem>
                                )
                            }
                            )}
                        </Select>
                        <button onClick={onSaveBankDetails} className='bankBtn' disabled={!canSave || loading}>{loading ? 'Saving' : 'Save Changes'}</button>
                    </div>
                </form>
            </div>
            <Dialogue open={open} handleClose={closeAlert} dialogueMessage={alertMessage} />
        </>
    )
}

export default BankDetails