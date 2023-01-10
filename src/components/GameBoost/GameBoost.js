import { unwrapResult } from '@reduxjs/toolkit'
import React from 'react'
import { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../features/Auth/AuthSlice'
import { buyBoostFromWallet } from '../../features/Store/StoreSlice'
import { formatCurrency, formatNumber } from '../../utils/stringUtl'
import BottomSheet from '../BottomSheet/BottomSheet'
import UserWalletBalance from '../UserWalletBalance/UserWalletBalance'
import './GameBoost.scss'
const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function GameBoost({boosts, user}) {
    return (
        <div className='storeItem'>
            <p className='storeTitle'>Buy Boosts</p>
            <p className='storeText'>Boost gives you super powers when you are playing quizes. Buy boosts to let you win more games</p>
            <div className='storeCard'>
            {boosts.map((boost, i) => <BoostCard key={i} boost={boost} user={user} />)}
            </div>
        </div>
    )
}

export default GameBoost


const BoostCard = ({boost}) => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const openBottomSheet = () => {
        setOpen(true)
    }

    const closeBottomSheet = () => {
        setOpen(false)
    }

    const buyBoostWallet = () => {
        setLoading(true);
        dispatch(buyBoostFromWallet(boost.id))
            .then(unwrapResult)
            .then(result => {
                dispatch(getUser())
                closeBottomSheet()
                navigate("/boost-purchase-successful")
            })

            .catch(async rejectedValueOrSerializedError => {
                setLoading(false);           
                navigate("/purchase-failed")
            });
    }

    return (
        <>
            <div className='storeItemContainer' onClick={openBottomSheet}>
                <BoostCardDetails boost={boost}/>
            </div>
            <BottomSheet open={open} closeBottomSheet={closeBottomSheet}
            BSContent={<BuyBoost onClick={closeBottomSheet} 
            boost={boost} loading={loading} buyBoost={buyBoostWallet} />}
            />
        </>
    )
}


const BuyBoost = ({onClick, boost, loading, buyBoost}) => {
    const userBalance = useSelector(state => state.auth.user.walletBalance);
    const canPay = Number(userBalance) >= Number(boost.currency_value);
    return(
        <div className='buyBoost'>
            <div className='buyItemHeader'>
                <p className='buyItemTitle'>Buy Boost</p>
                <IoCloseOutline size={20} color='#292D32' onClick={onClick} style={{cursor:'pointer'}}/>
            </div>
            <div className='buyItemCard'>
            <BoostCardDetails boost ={boost} />
            </div>
            <UserWalletBalance />
            <button className='boostBtn' onClick={buyBoost} disabled={!canPay || loading}>
            {loading ? 'Buying...' : 'Confirm'} 
            </button>
        </div>
    )
}

const BoostCardDetails = ({boost}) => {
    return (
        <>
            <img src={`${backendUrl}/${boost.icon}`} className="boost-icon" alt='boost' />
            <div className='boostDetailsContainer'>
                <div className='boostNameCount'>
                    <p className='storeItemName'>{boost.name}</p>
                    <p className='boostCount'>x{formatNumber(boost.pack_count)}</p>
                </div>
                <p className='boostDescription'>{boost.description}</p>
            </div>
            <p className='cashPrice'>&#8358;{formatCurrency(boost.currency_value)}</p>
        </>
    )
}
