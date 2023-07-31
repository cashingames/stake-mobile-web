import React, { useEffect, useState } from "react";
import AnonymousRouteHeader from "../../components/AnonymousRouteHeader/AnonymousRouteHeader";
import './WithdrawFunds.scss';
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/stringUtl";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUser } from "../Auth/AuthSlice";
import { fetchUserTransactions, getBankData, withdrawWinnings } from "../CommonSlice";
import { logEvent } from "firebase/analytics";
import firebaseConfig from "../../firebaseConfig";
import Dialogue from '../../components/Dialogue/Dialogue'



const WithdrawFunds = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const analytics = firebaseConfig();
    const [loading, setLoading] = useState(false);

    const [amount, setAmount] = useState('');
    const user = useSelector(state => state.auth.user);
    const [amountErr, setAmountError] = useState(false);
    const minimumWithdrawableAmount = useSelector(state => state.common.minimumWithdrawableAmount);
    const banks = useSelector(state => state.common.banks);
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountNumberErr, setAccountNumberErr] = useState(false);
    const [accountName, setAccountName] = useState(user.firstName + ' ' + user.lastName);
    const [withdraw, setWithdraw] = useState(false);
    const [openDialogue, setOpenDialogue] = useState(false);
    const [alertMessage, setAlert] = useState('');

    const closeAlert = () => {
        setOpenDialogue(false)
    }

    const onChangeAmount = (e) => {
        const amount = e.currentTarget.value;
        const amountEntered = amount.trim().length === 0 ? 0 : Number.parseFloat(amount)
        if (amountEntered < minimumWithdrawableAmount || amount > Number.parseFloat(user.withdrawableBalance)) {
            setAmountError(true)
        } else setAmountError(false)
        setAmount(amount)``
    }

    const onChangeAccountNumber = (e) => {
        const accountNumber = e.currentTarget.value;
        accountNumber.length > 0 && accountNumber.length < 10 ? setAccountNumberErr(true) : setAccountNumberErr(false)
        setAccountNumber(accountNumber)
    }

    const withdrawBalance = () => {
        setLoading(true)
        setWithdraw(true)
        withdrawWinnings({
            account_number: accountNumber,
            bank_name: bankName,
            account_name: accountName,
            amount
        })
            .then(response => {
                logEvent(analytics, 'winnings_withdrawn_successfully', {
                    'product_id': user.username,
                    'phone_number': user.phoneNumber,
                    'email': user.email,
                    'value': user.withdrawableBalance,
                    'currency': 'NGN'
                });
                setLoading(false)
                setWithdraw(false)
                navigate('/withdraw-successful')
                dispatch(getUser())
                dispatch(fetchUserTransactions())
            },
                err => {
                    if (!err || !err.response || err.response === undefined) {
                        setLoading(false)
                        setWithdraw(false)
                        setOpenDialogue(true)
                        setAlert("Your Network is Offline.");
                    }
                    else if (err.response.status === 400) {
                        setLoading(false)
                        setWithdraw(false)
                        setOpenDialogue(true)
                        setAlert(err.response.data.message);

                    }
                }

            )
    }

    const navigateHandler = () => {
        navigate('/wallet');
    }

    useEffect(() => {
        const invalid = accountNumberErr || amountErr || amount === '' || accountNumber === ''
        setWithdraw(!invalid);
    }, [accountNumberErr, amount, accountNumber, amountErr])

    useEffect(() => {
        dispatch(getUser());
        dispatch(getBankData());

    }, [dispatch]);

    return (
        <div className="withdraw-funds-container">
            <AnonymousRouteHeader title='Withdrawal' styleProp='password-header' isClose={true} onClick={navigateHandler} />
            <div className='inputs-container'>
                <div className='input-container'>
                    <div className='label-container'>
                        <label htmlFor='amount' className='input-label'>Enter amount</label>
                        <p className='required-text'>Required</p>
                    </div>
                    <input
                        placeholder={`Minimum of NGN ${minimumWithdrawableAmount}`}
                        type='number'
                        id='amount'
                        value={amount}
                        className={amountErr ? 'input-boxi' : 'input-box'}
                        autoFocus={true}
                        onChange={e => onChangeAmount(e)}
                        required
                    />
                    {amountErr && amount < minimumWithdrawableAmount &&
                        <span className='input-error'>Minimum withdrawable amount is NGN {minimumWithdrawableAmount}</span>
                    }
                    {amountErr && amount > Number.parseFloat(user.withdrawableBalance) &&
                        <span className='input-error'>You cannot withdraw more than your available balance</span>
                    }
                    <p className='available-bal'>Available balance NGN {formatCurrency(user.withdrawableBalance)}</p>

                </div>
                <div className='input-container'>
                    <div className='label-container'>
                        <label htmlFor='bankName' className='input-label'>Choose bank</label>
                        <p className='required-text'>Required</p>
                    </div>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" style={{ fontFamily: 'sansation-regular', color: '#1C453B', fontSize: '0.92rem', }}>Select Bank</InputLabel>
                        <Select
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            label="Select Bank"
                            sx={{
                                height: ' 3.5rem',
                                borderRadius: '14px',
                                fontSize: '0.95rem',
                                background: '#FFF',
                                border: '0.1px solid #D9D9D9',
                                outline: 0,
                                fontFamily: 'sansation-regular',
                                color: '#1C453B'
                            }}>
                            {banks && banks.map((bank, i) => {
                                return (
                                    <MenuItem style={{ color: '#1C453B', fontFamily: 'sansation-regular' }} key={i} value={bank.name}>{bank.name}</MenuItem>
                                )
                            }


                            )}
                        </Select>
                    </FormControl>
                </div>
                <div className='input-container'>
                    <div className='label-container'>
                        <label htmlFor='accountNumber' className='input-label'>Account Number</label>
                        <p className='required-text'>Required</p>
                    </div>

                    <input
                        placeholder="0000xxxx28"
                        type='number'
                        id='accountNumber'
                        value={accountNumber}
                        className={accountNumberErr ? 'input-boxi' : 'input-box'}
                        autoFocus={true}
                        onChange={e => onChangeAccountNumber(e)}
                        maxLength={10}
                        required
                    />
                    {accountNumberErr &&
                        <span className='input-error'>Account number can not be less than 10 digits</span>
                    }
                    <p className='available-bal'>Enter 10 digit number</p>

                </div>
                <div className='input-container'>
                    <div className='label-container'>
                        <label htmlFor='accountName' className='input-label'>Account Name</label>
                        <p className='required-text'>Required</p>
                    </div>

                    <input
                        placeholder="0000xxxx28"
                        type='text'
                        id='accountName'
                        value={accountName}
                        className='input-box'
                        autoFocus={true}
                        onChange={(e) => setAccountName(e.target.value)}
                        readOnly
                        required
                    />
                    <p className='available-bal'>Bank account name must tally with your cashingames first and last name</p>
                </div>
            </div>
            <button className='button-container' onClick={withdrawBalance} disabled={!withdraw || loading}>
                <span className='buttonText'>Request withdrawal</span>
            </button>
            <Dialogue open={openDialogue} handleClose={closeAlert} dialogueMessage={alertMessage} />
        </div>
    )
}
export default WithdrawFunds;